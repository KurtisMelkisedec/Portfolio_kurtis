import { CanActivateFn } from "@angular/router";
import { AuthServiceImpl } from "./auth.service.impl";


// class AuthGuard implements canMa{
//     constructor(private authService: AuthServiceImpl, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated) {
//       return true;
//     } else {
//       this.router.navigate(['/kurtis/guest/login']); // Redirige vers la page de connexion
//       return false;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceImpl, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     
    if (this.authService.isAuthenticated ) {
      return true;
    } else {
        this.router.navigateByUrl("/guest/login");
        return false;
    }
  }
}
