import { Component, ElementRef, OnInit, QueryList, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { ProjectServiceImpl } from '../../../core/services/impl/project.service.impl';
import { ProjectResponseList } from '../../../core/models/project.request';
import { RestResponse } from '../../../core/models/rest.response';
import { PaginationComponent } from "../../component/pagination/pagination.component";
import { dataPaginationModel } from '../../../core/models/data.pagination.model';
import { NgClass } from '@angular/common';
import e from 'express';
import { StatusResponse } from '../../../core/models/status.response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [PaginationComponent,NgClass,RouterLink],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  constructor(private projectService:ProjectServiceImpl) {
    
  }
  ngOnInit(): void {
   
    this.refresh();
    
  }
  projectResponse?:RestResponse< ProjectResponseList[]>;
  dataPagination:dataPaginationModel={
    pages:[],
    currentPage:0
  }
  @ViewChildren('divModal') divModals!: QueryList<ElementRef>;

  refresh(page:number=0,keyword:string=""){
    this.projectService.findAll(page,keyword).subscribe(data=>{
      if(data.status==200){
        this.projectResponse = data;
        this.dataPagination.pages = data.pages!;
        this.dataPagination.currentPage = data.currentPage;


      }
    });
  }

  paginate(page:number){
    this.refresh(page);
  }
  searchProjectByTitle(title:string){
    if(title.length>=3 ||title.length==0){
      this.refresh(0,title)
    }

 
  }

  showModal(event:Event,div:HTMLDivElement){
    event.stopPropagation();
    this.toggleModal(event);
    div.classList.remove("hidden");
  }
  toggleModal(event:Event){
    this.divModals.forEach(d=>{
     if(!d.nativeElement.classList.contains("hidden")){
      d.nativeElement.classList.add("hidden")       
     }
    })   
  }

  setFavoriteProject(id:any){    
    this.projectService.setFavoriteProject(id).subscribe(data=>{
      if(data.status == 200){
        this.refresh(this.dataPagination.currentPage);
      }
    })
  }
  setStatusProject(status:string,id:number){
    let project:any = null;
    this.projectResponse!.results.forEach(p=>{
      if(p.id == id ){
        project = p;
      }
    })
    if(project!=null){
      if(status=="archive"){
        project.status= StatusResponse.Archive;
      }
      else if(status=="visible"){
        project.status = StatusResponse.Visible;
      }
      else{
        project.status = StatusResponse.Deleted;
      } 
    this.projectService.setStatusProject(project).subscribe(data=>{
      if(data.status==200){
        this.refresh(this.dataPagination.currentPage);
      }
    })
    }
  }

  checkStatus(value:any){
   
    if(value == "Archive"){
      return true
    }
    return false;
  }








}
