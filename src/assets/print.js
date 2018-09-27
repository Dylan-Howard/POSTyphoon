const {remote} = require('electron');
const {BrowserWindow, dialog, shell} = remote;
const fs = require('fs');

let print_win;
let save_pdf_path;

function print() {
  if(print_win) { print_win.webContents.print() };
}

document.addEventListener('DOMContentLoaded', function() {
  var styles = `
    <style>
      table { border-collapse: collapse; border-style: hidden; font-family: 'Helvetica Neue', Arial, sans-serif; page-break-before: always; width: 100%; }
      thead { text-align: left; }
      th { background: #f2f2f2; }
      th, td { border: 1px solid #222222 !important; padding: .5rem; }
      td.cell-center { text-align: center; }
    </style>`;
  var styles2 = `
      table { border-collapse: collapse; border-style: hidden; font-family: 'Helvetica Neue', Arial, sans-serif; page-break-before: always; width: 100%; }
      thead { text-align: left; }
      th { background: #f2f2f2; }
      th, td { border: 1px solid #222222 !important; padding: .5rem; }
      td.cell-center { text-align: center; }`;

  var printBtn = document.getElementById('printBtn');

  printBtn.addEventListener('click', function() {
    print_win = new BrowserWindow({'auto-hide-menu-bar':true});
    print_win.loadURL(`data:text/html,${document.getElementById('data').innerHTML}`);
    // print_win.webContents.openDevTools();

    print_win.webContents.on('did-finish-load', function() {
      // print_win.webContents.insertCSS(styles2);
      // document.getElementById('print_button').addEventListener('click', print)
      print();
    });

    print_win.on('closed', function() {
      print_win = null;
    });
  });
});
