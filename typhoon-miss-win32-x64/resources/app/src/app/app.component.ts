import { Component } from '@angular/core';
// import * from './assets/sheets.js';
import * as $ from 'jquery';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateY(9rem) rotate(-10deg)'
              }),
              animate(
                '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
                style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
              ),
              animateChild()
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [animate('0.35s', style({ opacity: 0 })), animateChild()],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'one';
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.nav-link').click(function() {
        var e1 = $(this);
        $('.nav-link').each(function() {
          var e2 = $(this);
          if(e2 != e1 && $(e2).hasClass('selected')) {
            // If exists transitions previous selection
            $(e2).removeClass('selected').addClass('selected-out');
            setTimeout(function() { $(e2).removeClass('selected-out') }, 600);
          } else {
            $(e1).addClass('selected');  // If a new selection, add class
          }
        });
      });
    });
  }
}
