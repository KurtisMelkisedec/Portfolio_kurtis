import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"home",
        component:HomeAdminComponent
      },
      {
        path:"projects/form-add",
        component:FormComponent
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
