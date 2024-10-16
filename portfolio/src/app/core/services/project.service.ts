import { Observable } from "rxjs";
import { projectDetailsModel, ProjectHomeModel, ProjectRequest2, ProjectResponseList } from "../models/project.request";
import { RestResponse } from "../models/rest.response";

export interface ProjectService{
    findAll(page:number,keyword:string):Observable<RestResponse<ProjectResponseList[]>>
    findAllProjects():Observable<RestResponse<ProjectHomeModel[]>>
    findProjectByName(name:string):Observable<RestResponse<projectDetailsModel>>
    save(project:ProjectRequest2):Observable<RestResponse<any>>;
    setFavoriteProject(id:number):Observable<RestResponse<any>>;
    setStatusProject(project:ProjectResponseList):Observable<RestResponse<any>>;
}