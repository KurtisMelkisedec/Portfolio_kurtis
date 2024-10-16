import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceImpl } from '../../core/services/auth/impl/auth.service.impl';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
  standalone: true,
  imports: [RouterOutlet,NgMultiSelectDropDownModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  constructor(private authService:AuthServiceImpl,private router:Router) {
    
  }

 logout(){
  this.authService.logout().subscribe( data=>{
   if(data.status==201){
     this.router.navigateByUrl("/login");
   }
  })
 }
}
