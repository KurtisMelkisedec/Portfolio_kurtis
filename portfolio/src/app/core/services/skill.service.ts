import { Observable } from "rxjs";
import { RestResponse } from "../models/rest.response";
import { SkillResponse, SkillResponseHome } from "../models/skills.response";

export interface SkillService{
    findSkillsByType(type:string):Observable<RestResponse<SkillResponse[]>>

    findAll():Observable<RestResponse<SkillResponseHome[]>>
}