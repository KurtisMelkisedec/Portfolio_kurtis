import { Component, EventEmitter, Input, Output } from '@angular/core';
import { dataPaginationModel } from '../../../core/models/data.pagination.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input({required:true})data!:dataPaginationModel;
  @Output() onGetNumberPage:EventEmitter<number> = new EventEmitter<number>();

  paginate(page:number,value:number){
   
    this.onGetNumberPage.emit(page);

  }
}
