import { Observable } from "rxjs";
import { projectDetailsModel, ProjectHomeModel, ProjectRequest2, ProjectResponseList } from "../../models/project.request";
import { RestResponse } from "../../models/rest.response";
import { ProjectService } from "../project.service";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { AuthServiceImpl } from "../auth/impl/auth.service.impl";

@Injectable(
    {
        providedIn:"root"
    }
)

export class ProjectServiceImpl implements ProjectService{
    private path:string= `${environment.API_URL}/admin/projects`;
    private guestPath:string= `${environment.API_URL}/guest/projects`;
    
    constructor(private http:HttpClient,private authService:AuthServiceImpl) {
        
    }
    findProjectByName(name: string): Observable<RestResponse<projectDetailsModel>> {
        return this.http.get<RestResponse<projectDetailsModel>>(`${this.guestPath}/${name}`); 
       }
    findAllProjects(): Observable<RestResponse<ProjectHomeModel[]>> {
        return this.http.get<RestResponse<ProjectHomeModel[]>>(`${environment.API_URL}/guest/projects`);    }
    setStatusProject(project:ProjectResponseList): Observable<RestResponse<any>> {
       return this.http.put<RestResponse<any>>(`${this.path}/setStatus`,project,{
        headers:this.authService.createAuthorizationHeader()
       });
    }
    setFavoriteProject(id: number): Observable<RestResponse<any>> {
        return this.http.get<RestResponse<any>>(`${this.path}/setFavorite/${id}`,{
            headers:this.authService.createAuthorizationHeader()
           });

    }
    findAll(page: number, keyword: string): Observable<RestResponse<ProjectResponseList[]>> {
        return this.http.get<RestResponse<ProjectResponseList[]>>(`${this.path}?page=${page}&title=${keyword}`,{
            headers:this.authService.createAuthorizationHeader()
           })
    }
    save(project: ProjectRequest2): Observable<RestResponse<any>> {
       return this.http.post<RestResponse<any>>(`${this.path}`,project,{
        headers:this.authService.createAuthorizationHeader()
       });
    }

}