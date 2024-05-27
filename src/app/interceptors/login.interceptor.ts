import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Register.model';
import { Loginservice } from '../services/Login.service';

export function demoInterceptorFactory(Loginservice: Loginservice, login: Login): HttpInterceptor {
  return {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const authToken = Loginservice.loing(login);
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq);
    }
  };
}
