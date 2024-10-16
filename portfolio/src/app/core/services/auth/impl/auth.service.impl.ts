import { Observable } from "rxjs";
import { RestResponse } from "../../../models/rest.response";
import { UserConnexion, UserConnected, userModel } from "../../../models/user.response";
import { AuthService } from "../auth.service";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders,HttpClientModule } from "@angular/common/http";
import { environment } from "../../../../../environments/environment.development";
import { isPlatformBrowser } from "@angular/common";
import { mailModel } from "../../../models/mail.model";
@Injectable({
    providedIn: 'root'
  })
export class AuthServiceImpl implements AuthService{
    private path:string = `${environment.API_URL}`;
    private isBrowser:boolean=false;
    private authUser?:UserConnected;
     isAuthenticated!:boolean;
    constructor(private http:HttpClient, @Inject(PLATFORM_ID)private platformID:any) {
        this.isBrowser = isPlatformBrowser(platformID);
        this.isAuthenticated = this.checkStorage();

        
    }
    checkStorage(){

        if (this.isBrowser) {
           
            return localStorage.getItem("token")!=null?true:false;

        }
        return false;
    }
    sendMail(mail: mailModel): Observable<RestResponse<any>> {
        return this.http.post<RestResponse<any>>(`${this.path}/guest/users/send-mail`,mail);
    }
    findAdmin(): Observable<RestResponse<userModel>> {
        return this.http.get<RestResponse<userModel>>(`${this.path}/guest/users/admin`);    }
    logout(): Observable<RestResponse<any>> {
        if(this.isBrowser){
            let head = this.createAuthorizationHeader()
            localStorage.removeItem("token");
            this.isAuthenticated = false;

            return this.http.post<RestResponse<UserConnected>>(`${this.path}/admin/expiredToken`,this.authUser,{
                headers:head
            });


        }
        return this.http.post<RestResponse<UserConnected>>(`${this.path}/login`,this.authUser);
    }
    createAuthorizationHeader(): any {
       if(this.isBrowser){
        const jwtToken = localStorage.getItem("token");
        return jwtToken!=null? new HttpHeaders().set("Authorization",`Bearer ${jwtToken}`):null 
       }
       return null;
    }
     login(user: UserConnexion): Observable<RestResponse<UserConnected>> {
        return this.http.post<RestResponse<UserConnected>>(`${this.path}/login`,user);
     }


     
     public get getAuthUser() : any {
        return this.authUser;     }

        
        public set setAuthUser(user : any) {
            this.authUser = user;
        }
        
     

    

}