import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _jwtService: JwtService,
              private _router: Router) { }

  canActivate(): boolean {
    if (this._jwtService.loggedIn) {
      return true;
    }
    else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
