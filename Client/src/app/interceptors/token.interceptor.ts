import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogApiService } from '../services/blog-api.service';
import { AuthService } from '../services/auth.service';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private service: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();
    if (token) {
      // const clonedReq = req.clone({
        // headers: req.headers.set('Authorization', `Bearer ${token}`)

        // modifying request
        request = request.clone({
            setHeaders: {Authorization: `xyz`}
        })
    }
    
    // sending back
    return next.handle(request);
  }
}

// sends the token to the backend through header
// helps to modify request & response url