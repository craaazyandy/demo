import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class JwtService {

  private _loginUrl = 'http://10.211.55.21:3000/login';
  private _registerUrl = 'http://10.211.55.21:3000/signup';
  private _addMealUrl = 'http://10.211.55.21:3000/meal/';
  private _getMealUrl = 'http://10.211.55.21:3000/meals/';
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(this._loginUrl, { email : email, password : password})
               .pipe( tap(res => {
                      localStorage.setItem('accessToken', res.accessToken);
                      localStorage.setItem('userEmail', res.userEmail);
                      this.isUserLoggedIn.next(true);
                    })
                );
  }

  register(user) {
    return this.http.post<any>(this._registerUrl, user)
               //.pipe( tap(res => {
               //   console.log('register return:' + res);
               //   this.login(email, password)
               //})
               //);
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userEmail');
    this.isUserLoggedIn.next(false);
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('accessToken') !==  null;
  }

  public get loggedInUser(): string {
    return localStorage.getItem('userEmail');
  }

  public get bearerToken(): string {
    return localStorage.getItem('accessToken');
  }

  addMeal(meal) {
    const newUrl = this._addMealUrl.concat(this.loggedInUser);
    return this.http.post<any>(newUrl, meal);
/*                .pipe( tap(res => {
                      localStorage.setItem('accessToken', res.accessToken);
                      this.isUserLoggedIn.next(true);
                    })
                ); */
  }

  getMeals() {
    const newUrl = this._getMealUrl.concat(this.loggedInUser);
    return this.http.get<any>(newUrl);
/*                .pipe( tap(res => {
                      localStorage.setItem('accessToken', res.accessToken);
                      this.isUserLoggedIn.next(true);
                    })
                ); */
  }

}
