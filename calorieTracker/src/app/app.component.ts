import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtService } from './jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo';
  isLoggedIn: boolean;

  constructor(private _jwtService: JwtService) { }

  ngOnInit() {
    this._jwtService.isUserLoggedIn.subscribe( value => {
        this.isLoggedIn = value;
    });
  }

  ngOnDestroy() {
    this._jwtService.isUserLoggedIn.unsubscribe();
    this._jwtService.isUserLoggedIn.complete();
  }

  logout() {
    this._jwtService.logout();
  }

}
