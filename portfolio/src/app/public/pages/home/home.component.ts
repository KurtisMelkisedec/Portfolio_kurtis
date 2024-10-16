import { isPlatformBrowser, NgClass, NgFor, NgForOf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';

import Aos from 'aos';
import { RestResponse } from '../../../core/models/rest.response';
import { SkillResponseHome } from '../../../core/models/skills.response';
import { SkillServiceImpl } from '../../../core/services/impl/skill.service.impl';
import { ProjectHomeModel } from '../../../core/models/project.request';
import { ProjectServiceImpl } from '../../../core/services/impl/project.service.impl';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceImpl } from '../../../core/services/auth/impl/auth.service.impl';
import { mailModel } from '../../../core/models/mail.model';
import { userModel } from '../../../core/models/user.response';
import Swiper from 'swiper';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgForOf,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  private isBrowser: boolean = false;
  constructor(private routeEncre: ActivatedRoute,@Inject(PLATFORM_ID) private platformID: any, private authService:AuthServiceImpl, private fb:FormBuilder, private router:Router, private skillService:SkillServiceImpl,private projectService:ProjectServiceImpl) {
    this.isBrowser = isPlatformBrowser(platformID);
  }

  ngOnInit(): void {
    if (this.isBrowser) {

      Aos.init({
        once:true
      });
      

    }
    this.findAllSkill();
    this.findAllProjects();
    this.findUser()

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
        this.findAllSkill();
    });
    this.routeEncre.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  skillsResponse?:RestResponse<SkillResponseHome[]>
  projectsResponse?:RestResponse<ProjectHomeModel[]>
  formMail=this.fb.group(
    {
      username:['',Validators.required],
      mail:['',Validators.required],
      content:['',Validators.required],
    }
  )
  isSuccessEmail:boolean=false;
  userModelResponse?:RestResponse<userModel> 
  indexCurrentProject:number=0;



  findAllSkill(){
    this.skillService.findAll().subscribe(data=>{
      if(data.status==200){
        this.skillsResponse  =data;
      }
    })

  }
  findAllProjects(){
    this.projectService.findAllProjects().subscribe(data=>{
     
      if(data.status==200){
       
        this.projectsResponse  = data;

      }
    })
   
  }
  findUser(){
    this.authService.findAdmin().subscribe(data=>{
      if(data.status==200){
         this.userModelResponse  =data;
         


      }
    })
  }
  isTechnologieInProject(techno:string){
   for(let i=0;i<this.skillsResponse!.results.length;i++){
     if (this.skillsResponse!.results[i].libelle == techno) {

      return true;
     }
   }
   return false;
  }

  checkStatus(value:any){
   
    if(value == "Technologie"){
      return 0;
    }
    if(value == "Language"){
      return 1;
    }
    return 2;
  }
  navigateToPage2(title:string) {
    this.router.navigate([`/projects/${title}`]).then(() => {
      window.scrollTo(0, 200); 
    });
  }

  sendMail(){
    let mail:mailModel = new mailModel(this.formMail.value.username!,this.formMail.value.mail!,this.formMail.value.content!)
    this.formMail.reset()

    this.authService.sendMail(mail).subscribe(
      data=>{
        if (data.status==200) {
          this.isSuccessEmail = true;

          // Cachez le message après 4 secondes
          setTimeout(() => {
            this.isSuccessEmail = false;
          }, 2000);
        
        }
      }
    )
  }
 
  
  
  
}
