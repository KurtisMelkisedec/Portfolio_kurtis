import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import { inject } from '@angular/core';
import { AuthServiceImpl } from './core/services/auth/impl/auth.service.impl';
import { AuthGuard } from './core/services/auth/impl/auth.guard';

export const routes: Routes = [
    {
        path:"admin",
        loadChildren:()=>import("./secure/secure-routing.module").then(mod=>mod.SecureRoutingModule),
        canMatch:[()=>inject(AuthServiceImpl).isAuthenticated],
        canActivate:[AuthGuard]
    },
    {
        path:"",
        loadChildren:()=>import("./public/public-routing.module").then(mod=>mod.PublicRoutingModule)
    },
    
    {
        path:"**",
        component:PageNotFoundComponent
    },
    
];
