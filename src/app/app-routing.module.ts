import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RulesComponent } from './rules/rules.component';
import { InputComponent } from './input/input.component';

const routes: Routes = [
  { path: '', redirectTo: '/rules', pathMatch: 'full' },
  { path: 'rules', component: RulesComponent, data: { page: 'one' } },
  { path: 'input', component: InputComponent, data: { page: 'two' } }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],

  exports: [ RouterModule ]
})
export class AppRoutingModule {}
