import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginEmail = '';
  loginPassword = '';
  constructor(private _jwtService: JwtService, 
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._jwtService.login(this.loginEmail, this.loginPassword)
                    .subscribe(
                      res => {
                        this._router.navigate(['main']);
                      },
                      err => console.log(err)
                    );
  }

  logoutUser() {
    this._jwtService.logout()
  }

}
