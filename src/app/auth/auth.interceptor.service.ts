import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor( private userService: UsersService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){

    // console.log(req.headers.get('noauth'));
    if(req.headers.get('noauth')){
      return next.handle(req.clone());
    }else{
      const clonereq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.userService.getTokenItem()
        }
      })
      return next.handle(clonereq);
    }
  }
  
}
