import { Observable } from "rxjs";
import { UserConnected, UserConnexion, userModel } from "../../models/user.response";
import { RestResponse } from "../../models/rest.response";
import { mailModel } from "../../models/mail.model";

export interface AuthService{
   login(user:UserConnexion ):Observable<RestResponse<UserConnected>>
   logout():Observable<RestResponse<any>>
   findAdmin():Observable<RestResponse<userModel>>
   sendMail(mail:mailModel):Observable<RestResponse<any>>

   createAuthorizationHeader():any

}