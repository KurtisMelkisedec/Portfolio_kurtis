import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:"login",
    component:ConnexionComponent
  },
  
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"projects/:projectName",
        component:ProjectComponent
      },
     
      
    ]
     
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
