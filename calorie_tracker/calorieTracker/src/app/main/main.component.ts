import { Component, OnInit, OnDestroy } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  newMealData = {};
  myMealData = [];

  constructor(private _jwtService: JwtService,
              private _router: Router) { }

  ngOnInit() {
    this.getMeals();
    this._jwtService.isUserLoggedIn.subscribe( value => {
        this.isLoggedIn = value;
    });
  }

  ngOnDestroy() {
    this._jwtService.isUserLoggedIn.unsubscribe();
    this._jwtService.isUserLoggedIn.complete();
  }

  addMeal() {
    this._jwtService.addMeal(this.newMealData)
                    .subscribe(
                      res => {
                        this.ngOnInit();
                      },
                      err => console.log(err)
                    );
  }

  getMeals() {
    this._jwtService.getMeals()
                    .subscribe(
                      res => {
                        this.myMealData = [];
                        res.forEach((mealItem) => {
                          console.log('found a meal item:' + mealItem);
                          this.myMealData.push(mealItem);      
                        });
                        //return this.myMealData;
                        //this._router.navigate(['main']);
                      },
                      err => console.log(err)
                    );
  }

}
