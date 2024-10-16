import { NgClass } from '@angular/common';
import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectServiceImpl } from '../../../core/services/impl/project.service.impl';
import { RestResponse } from '../../../core/models/rest.response';
import { projectDetailsModel } from '../../../core/models/project.request';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgClass,RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectComponent implements OnInit{

  /**
   *
   */
  constructor(private router:Router,private route:ActivatedRoute,private projectService:ProjectServiceImpl) {
   
    
  }
  ngOnInit(): void {
    this.findCurrentProject();
    
  }
  projectResponse?:RestResponse<projectDetailsModel>

  isTabImage:boolean=true;
  isDataHere:boolean=false;
  isImageAndVideoRegister:boolean=true
  @ViewChild("bloc-project ")divContainer?:HTMLDivElement;

  showVideo(){
    this.isTabImage=false;
  }
  showSlider(){
    this.isTabImage=true;
  }
  onDataLoaded() {
    this.isDataHere = true; 
  }

  findCurrentProject(){
    const projectName = this.route.snapshot.paramMap.get("projectName");
    this.projectService.findProjectByName(projectName!).subscribe(data=>
      {
       
        
        if (data.status==200) {
          this.projectResponse = data;
          if (this.projectResponse.results.images?.length ==0 && this.projectResponse.results.video ==undefined && this.projectResponse.results.url==undefined) {
            this.isImageAndVideoRegister=false;
     
          }
          this.onDataLoaded()     
        }
        if (data.status==404) {
          this.router.navigateByUrl("not-found");    
        }

      }
    )
    

  }
  redirectToUrl(url: string|undefined) {
    if (url) {
        window.open(url, '_blank'); 
    }
}
goHomePage(){
  this.router.navigateByUrl(``).then(() => {
    if (window.innerWidth>800) {
      window.scrollTo(0,2200); 
    }
    else{
      window.scrollTo(0,3000); 

    }
   
  });
}

}
