import { Injectable } from "@angular/core";
import { SkillService } from "../skill.service";
import { Observable } from "rxjs";
import { RestResponse } from "../../models/rest.response";
import { SkillResponse, SkillResponseHome } from "../../models/skills.response";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { AuthServiceImpl } from "../auth/impl/auth.service.impl";

@Injectable({
    providedIn: 'root'
  })
export class SkillServiceImpl implements SkillService{
    private path:string = `${environment.API_URL}/guest/skills`;

    constructor(private http:HttpClient,private authService:AuthServiceImpl) {
        
    }
  findAll(): Observable<RestResponse<SkillResponseHome[]>> {
    return this.http.get<RestResponse<SkillResponseHome[]>>(`${this.path}`)
    }

    findSkillsByType(type: string): Observable<RestResponse<SkillResponse[]>> {
       return this.http.get<RestResponse<SkillResponse[]>>(`${this.path}/type/${type}`,
        {headers:this.authService.createAuthorizationHeader()}
       );
    }

}