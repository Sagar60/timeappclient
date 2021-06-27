import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor( private http: HttpClient ) { }

  baseUrl = 'https://timeappbysagar.herokuapp.com/user/';

  noAuthHeader = {headers: new HttpHeaders({ 'Noauth': 'True' }) }

  postUser( user: User){
    return this.http.post(this.baseUrl + 'signup', user, this.noAuthHeader );
  }

  loginForm(authencationUser){
    return this.http.post(this.baseUrl + 'login', authencationUser, this.noAuthHeader )
  }

  getUserDetails(id){
    return this.http.get(this.baseUrl + ''  + id);
  }

  userDetailsUpdate(user){
    return this.http.patch(this.baseUrl + `${user._id}`, user);
  }
  //profile pic Update
  picUpdate(fd){
    return this.http.patch( 'http://localhost:4000/' + 'pics/',fd);
  }

  // forgot passpassword email check and get otp
  forgotUserPassword(emailBody){
    return this.http.post(this.baseUrl + 'forgotpassword',emailBody, this.noAuthHeader);
  }
  userAccountverifyOption(form){
    return this.http.post(this.baseUrl + 'sendmail', form, this.noAuthHeader)
  }
  userAccountverify(form){
    return this.http.post(this.baseUrl + 'verifymail', form, this.noAuthHeader)
  }

  // token works 
  setToken(token: string){
    localStorage.setItem('token',token);
  }
  getTokenItem(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('verifed');    
    return localStorage.removeItem('token');
  }

  getUserId(){
    var token = this.getTokenItem();
    if(token){
        var decodeItem = atob(token.split('.')[1]);
        return JSON.parse(decodeItem);
    }else{
      return null;
    }
  }

  isLoggedIn(){
    var userDetails = this.getUserId();
    var userVeried = atob(localStorage.getItem('verifed'))
    if(!userDetails  || userVeried== 'no' || userVeried!='ée' ){
      return false;
    }else{
      return userDetails.exp > Date.now() /1000 ; 
    }
  }

  // http error handler
  handleError(error: HttpErrorResponse){
    console.log('error error error ');
    return throwError(error);
  }
  
}
