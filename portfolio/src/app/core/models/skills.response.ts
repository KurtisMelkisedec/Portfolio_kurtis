import { SkillsType } from "./enums.model";

export interface SkillResponse{
    id:number,
    libelle:string,
    image?:string,
}

export interface SkillResponseHome{
    id:number,
    libelle:string,
    image:string,
    type:SkillsType
}