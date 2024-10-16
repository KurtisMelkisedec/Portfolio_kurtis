import { imageResponse } from "./image.response";
import { SkillResponse, SkillResponseHome } from "./skills.response";
import { StatusResponse } from "./status.response";

export interface ProjectRequest{
    id:number|null,
    title:string,
    description:string,
    story:string,
    url:string|null,
    github:string|null,
    techno:SkillResponse[],
    video:File|null,
    images:File[] 
       

}

export class ProjectRequest2{
    id:number|null
    title:string
    description:string
    story:string
    url:string|null
    github:string|null
    techno:SkillResponse[]
    mainImage:string
    video:Blob|null
    images:string[]|null   

    constructor(id:number|null,title:string,desc:string,sto:string,url:string|null,github:string|null,techno:SkillResponse[],mainImage:string,video:Blob|null,images:string[]|null){
        this.id = id;
        this.title = title;
        this.description = desc;
        this.story = sto;
        this.url = url;
        this.github = github;
        this.techno = techno;
        this.mainImage = mainImage;
        this.video = video;
        this.images = images;
        
    }

}


export interface ProjectResponseList{
    id:number
    title:string,
    github:string,
    url:string,
    status:StatusResponse
    isFavorite:boolean
}

export interface ProjectHomeModel{
    id:number,
    title:string,
    description:string,
    image:string,
    technologies:SkillResponseHome[]
}
export interface projectDetailsModel{
    id:number,
    name:string,
    story:string,
    video?:string,
    images?:string[],
    url?:string
    github?:string
    technologies:SkillResponse[]
}
