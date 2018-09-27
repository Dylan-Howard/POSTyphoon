import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RULES } from '../rules';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      var aniQueue = [];
      $('.rule-item').each(function(){ aniQueue.push( $(this) ) })
      setInterval(function() {
        if(aniQueue.length) { aniQueue.shift().addClass('show') }
      },200);
    })
  }

  rules = RULES;

}
