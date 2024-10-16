import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, Renderer2, ViewChild, } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { url } from 'node:inspector';
import { ProjectRequest2 } from '../../../core/models/project.request';
import { imageResponse } from '../../../core/models/image.response';
import { SkillResponse } from '../../../core/models/skills.response';
import { SkillServiceImpl } from '../../../core/services/impl/skill.service.impl';
import { RestResponse } from '../../../core/models/rest.response';
import { ProjectServiceImpl } from '../../../core/services/impl/project.service.impl';
import { MultiSelect, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MultiSelectModule,
    NgClass,
    MatFormFieldModule, MatSelectModule,
     FormsModule, ReactiveFormsModule,
     RouterLink
     
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FormComponent implements OnInit {
  
 
  constructor(private projectService:ProjectServiceImpl, private router:Router,private fb:FormBuilder,private renderer:Renderer2,private skillService:SkillServiceImpl ) {
   
  }
 

  ngOnInit(): void {
    
  this.findSkills();
  }
  
  @ViewChild("videoSrc")videoSrc?:ElementRef;
  @ViewChild("videoPlayer")videoPlayer?:ElementRef;
  @ViewChild("multiSelect")divSelect?:HTMLDivElement;
    toppings = new FormControl('');
  isImage = true;
  multiSelectValue:any=[];
  blobVideo:any;
  swipperImage:any=[]
  images:imageResponse[]=[];
  skillResponse?:RestResponse<SkillResponse[]>;
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  formProject = this.fb.group(
    {
      id:[],
      title:[,Validators.required],
      description:[,Validators.required],
      story:[,Validators.required],
      url:[],
      github:[],
      techno:this.fb.array([],Validators.minLength(1)),
      mainImage:new FormControl("",Validators.required),
      video:new FormControl(),
      images:this.fb.array([])

    },
    {
  validator:this.validateForm()
    }
  )
  
  public get getTitle()   {
    return this.formProject.controls["title"] as FormControl;
  }
  public get getDescription()   {
    return this.formProject.controls["description"] as FormControl;
  }
  public get getStory()   {
    return this.formProject.controls["story"] as FormControl;
  }
  public get getUrl()   {
    return this.formProject.controls["url"] as FormControl;
  }
  
  public get getGithub()   {
    return this.formProject.controls["github"] as FormControl;
  }
  public get getTechno()   {
    return this.formProject.controls["techno"] as FormArray;
  }
  public get getVideo()   {
    return this.formProject.controls["video"] as FormControl;
  }
  public get getImages()   {
    return this.formProject.controls["images"] as FormArray;
  }
  public get getMainImage()   {
    return this.formProject.controls["mainImage"] as FormControl;
  }

  

  onSubmit(){
     this.multiSelectValue.forEach((value:any)=>{
       this.getTechno.push(
         this.fb.group({
           id:[],
           libelle:[value]
         })
       )
     })
     
    
     const projectRequest= new ProjectRequest2(
       null,
       this.getTitle.value,
       this.getDescription.value,
       this.getStory.value,
       this.getUrl.value,
       this.getGithub.value,
       this.getTechno.value,
       this.getMainImage.value,
       this.blobVideo,
       this.getImages.value
     )
     this.getTechno.reset;
     this.multiSelectValue = []

    
       this.projectService.save(projectRequest).subscribe(data=>{
         if(data.status==200){
           this.goHomePage()
         }
      });
      

       
    

  }

  validateForm():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
      if(control.get("techno")?.value.length==0 ){
        return {"isMissTechno":true};
      }
      if(control.get("mainImage")?.value == ""){
        return {"required":true};
  
      }
      return null;

    }
    
  }

  tabImage(){
   this.isImage = true;
  }
  tabVideo(){
   this.isImage=false;
  }

  setVideo(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      const file = input.files[0];
      const blob = new Blob([file],{type:file.type});
      const reader = new FileReader();
      reader.onloadend = ()=>{
        this.blobVideo = (reader.result as string).split(",")[1];
        
        //this.getVideo.patchValue(base64String);
      }
      const urlFile = URL.createObjectURL(blob);
      reader.readAsDataURL(file);
      if(this.videoSrc){

        
        this.videoSrc.nativeElement.src = urlFile;
        if(this.videoPlayer){
          this.videoPlayer.nativeElement.load()
        }
      }

    }
    
    
  }
  deleteVideo(inputVideo:any){
    if(this.videoSrc){
      this.videoSrc.nativeElement.src = ""
      if(this.videoPlayer){
        this.videoPlayer.nativeElement.load();
      }
      inputVideo.value = ""

    }
  }
 
  addImage(event:Event){
   
    const input = event.target as HTMLInputElement;
    
    if(input.files && input.files.length>0){
      const file = input.files[0];
     const blob = new Blob([file],{type:file.type});
      const urlFile = URL.createObjectURL(blob)
      this.swipperImage.push(urlFile);
     
     const reader = new FileReader();
     reader.onloadend=()=>{
      const base64String =(reader
        .result as string).split(",")[1];
        this.getImages.push(new FormControl(base64String));

     }
     reader.readAsDataURL(file);


     //après cette ligne je veux avoir la valeur en base64 de l'image 
    }
  }
  deleteImage(event:Event,index:number){
    const element = event.target as HTMLElement;
    this.renderer.removeChild(element.parentNode,element);
    this.swipperImage.splice(index,1)
  }

  
  
  findSkills(){
    this.skillService.findSkillsByType("technologie").subscribe(data=>{

      if(data.status==200){
    
        this.skillResponse = data;
      }
    })
  }

  setImage(event:Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      const file = input.files[0];
    
     
     const reader = new FileReader();
     reader.onloadend=()=>{
      const base64String =(reader
        .result as string).split(",")[1];
        this.getMainImage.patchValue(base64String);

     }
     reader.readAsDataURL(file);
  }}

  showMultiSelect(event:Event,select:any){
   event.stopPropagation();
    const div = select as HTMLDivElement;
    div.classList.remove("hidden");
  }
  hideMultiSelect(selct:HTMLDivElement){
  
    if(!selct.classList.contains("hidden")){
      selct.classList.add("hidden");
    }
   
  }
  toggleOption(event:any){

    event.stopPropagation();
    let object:any = null;
    if (event.target instanceof HTMLInputElement ||event.target instanceof HTMLOptionElement) {
     
      
      object = event.target.parentNode;

    }
    else{
      object = event.target;
      

    }
    object.children[0].checked = true;
    const value = object.children[1].value;

    
    
    if(this.multiSelectValue.includes(value)){
      
      object.children[0].checked = false;
      this.multiSelectValue.splice(this.multiSelectValue.indexOf(value),1)
    }
    else{
      object.children[0].checked = true;
      this.multiSelectValue.push(value)  
    }



    
  }
  goHomePage(){
    this.router.navigateByUrl("/admin/home")
    
  }

}
