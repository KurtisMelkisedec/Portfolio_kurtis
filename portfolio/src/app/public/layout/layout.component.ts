import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import Aos from 'aos';
import { AuthServiceImpl } from '../../core/services/auth/impl/auth.service.impl';
import { userModel } from '../../core/models/user.response';
import { RestResponse } from '../../core/models/rest.response';
import { SkillResponse, SkillResponseHome } from '../../core/models/skills.response';
import { SkillServiceImpl } from '../../core/services/impl/skill.service.impl';
import { environment } from '../../../environments/environment.development';

@Component({
  standalone:true,
  imports:[RouterModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  
  constructor(@Inject(PLATFORM_ID) private platformID: any,private authService:AuthServiceImpl,private skillService:SkillServiceImpl) {
    this.isBrowser = isPlatformBrowser(platformID);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      Aos.init({
        once:true
      });

    }
    this.findUser();
    this.findAllSkill();
  }
  private isBrowser: boolean = false;
  userModelResponse?:RestResponse<userModel> 
  skillsResponse?:RestResponse<SkillResponse[]>
  mail:string=environment.AUTH_MAIL
  linkedin:string=environment.AUTH_LINKEDIN

  findAllSkill(){
    this.skillService.findSkillsByType("language").subscribe(data=>{
      if(data.status==200){
        this.skillsResponse  =data;
       
      }
    })

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

  findUser(){
    this.authService.findAdmin().subscribe(data=>{
      if(data.status==200){
         this.userModelResponse  =data;
         


      }
    })
  }
}
