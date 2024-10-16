import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import Swiper from 'swiper';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelect, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    
  ],
  imports: [
    
    CommonModule,
    SecureRoutingModule,
    BrowserModule,
    NgMultiSelectDropDownModule.forRoot(),
    
    
    
  ]
})
export class SecureModule { }
