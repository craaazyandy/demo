import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { JwtService } from './jwt.service';
/* note: manually use injector instead of injecting JwtService in constructor because of Angular issues */

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _injector: Injector) { }

  intercept(req, next) {
    const jwtService = this._injector.get(JwtService); // see comment above
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtService.bearerToken}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
