import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupUserData = {};
  constructor(private _jwtService: JwtService) { }

  ngOnInit() {
  }

  registerUser() {
    this._jwtService.register(this.signupUserData)
                    .subscribe(
                      res => console.log(res),
                      err => console.log(err)
                    );
  }

}
