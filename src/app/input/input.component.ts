import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Receipt } from '../receipt';
import { Item } from '../item';

import { Rule } from '../rule';
import { ComplexRule } from '../complexRule';
import { ComplexRangeRule } from '../complexRangeRule';
import { ContainsRule } from '../containsRule';
import { RangeRule } from '../rangeRule';

import { RULES } from '../rules';

type AOA = any[][];

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  data: AOA = [];
  head: AOA = [];
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
	fileName: string = 'SheetJS.xlsx';
  rules: Rule[] = [];

  ngOnInit() {
    if(document.getElementById('printBtn')) {
      document.getElementById('printBtn').classList.add('show');
    }

    // Builds Rules list
    for(var i = 0; i < RULES.length; i++) {
      var tRule;
      switch(RULES[i].type) {
        case "contains":
          tRule = new ContainsRule(RULES[i].containsString,RULES[i].color);
          break;
        case "complex":
          tRule = new ComplexRule(RULES[i].containsNumber,RULES[i].containsString,RULES[i].color);
          break;
        case "complexrange":
          tRule = new ComplexRangeRule(RULES[i].lowerCondition,RULES[i].upperCondition,RULES[i].lowerEquality,RULES[i].upperEquality,RULES[i].containsString,RULES[i].color);
          break;
        case "range":
          tRule = new RangeRule(RULES[i].lowerCondition,RULES[i].upperCondition,RULES[i].lowerEquality,RULES[i].upperEquality,RULES[i].color);
          break;
        default:
          console.log("Error");
          break;
      }
      this.rules.push(tRule);
    }
  }

  onDrop(evt: any) {
    var el = evt.target;
    if(el.classList.contains('drag-over')) {
      el.classList.add('file-loading');
      el.classList.remove('drag-over');
    }
  }
  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var el = evt.target;
    if(! el.classList.contains('drag-over')) { el.classList.add('drag-over') }
  }
  onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    var el = evt.target;
    if(el.classList.contains('drag-over')) { el.classList.remove('drag-over') }
  }

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

			/* grab first sheet */
			const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
			this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));

      for(var i = 0; i < 2; i++) { this.data.shift() }

      /* Builds Recipts */
      let receipts: Array<Receipt> = [];
      let color: string = "";
      let customer: string = "";
      let route: string = "";

      for(var i = 0; i < this.data.length; i++) {
        if(typeof this.data[i][0] === 'string') {
          if(this.data[i][0].indexOf('Main driver:') === 0) {
            route = this.data[i][0];
          }
        } else if(typeof this.data[i][1] === 'string') {         // Creates new Receipt
          console.log(this.data[i][1]);
          console.log(this.data[i][1].indexOf('For customer:'));
          if(this.data[i][1].indexOf('For customer:') === 0) {
            console.log('Verified');
            customer = this.data[i][1];
            color = "#efefef";

            console.log('Checking Rules');
            for(var j = 0; j < this.rules.length; j++) {
              console.log(this.data[i][1]);
              if(this.rules[j].match(route)) {                 // Checks Route for rule match
                console.log('Matched rule!');
                color = this.rules[j].getColor();              // Gets Color if matched
              } else if(this.rules[j].match(customer)) {       // Checks Customer for rule match
                console.log('Matched rule!');
                color = this.rules[j].getColor();              // Gets Color if matched
              }
            }
            console.log('Done Checking Rules');

            receipts.push(
              new Receipt(customer.substr(14),route.substr(13),color)
            );
          }
        } else if(typeof this.data[i][2] === 'string') {  // Creates new Item
          if(this.data[i][2].indexOf('POS Item:') === 0) {
            console.log(this.data[i][2]);
            color = "#f2f2f2";
            for(var j = 0; j < this.rules.length; j++) {
              if(this.rules[j].match(this.data[i][2])) { // Checks Item for rule match
                console.log('Matched rule!');
                color = this.rules[j].getColor();        // Gets Color if matched
              }
            }
            i++;
            receipts[receipts.length-1].addItem(
              new Item(this.data[i][3], this.data[i][4], this.data[i][5], color)
            );
          }
        } else if(this.data[i].length === 0) {
          break;
        }
      }

      /* Generates HTML Table */
      for(var r in receipts) {
        if(document.getElementById('data')) {
          document.getElementById('data').innerHTML += receipts[r].toTable();
        }
      }

      /* Show Print Button */
      evt.target.classList.add('print-ready');
		};
		reader.readAsBinaryString(target.files[0]);
	}
}
