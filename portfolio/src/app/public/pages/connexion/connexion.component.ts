import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceImpl } from '../../../core/services/auth/impl/auth.service.impl';
import { UserConnexion } from '../../../core/models/user.response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  errors:any;
  user:UserConnexion={
    email:"",
    password:""
  }
  constructor(private router:Router,private authService:AuthServiceImpl){}

  onSubmit(){

     this.authService.login(this.user).subscribe(data=>{
       if(data.status == 200){
        this.authService.setAuthUser =data.results;
        localStorage.setItem("token",data.results.token);
        localStorage.setItem("isAuthenticated","true");
        this.authService.isAuthenticated = true;
        this.router.navigateByUrl("/admin/home");
        

       }
       else{
         this.errors = "L'email et/ou le mot de passe sont incorrecte ";
       }

     })

  }

  




}
