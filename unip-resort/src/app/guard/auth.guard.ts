import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ){}

  canActivate(): Observable<boolean> | boolean {
    if(this.authService.token) {
      return true;
    }

    this.toastrService.error('Para acessar esta tela é necessário estar logado.');
    this.router.navigate([''], {relativeTo: this.route.root});
    return false;
  }
}
