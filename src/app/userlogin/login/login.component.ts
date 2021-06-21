import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router: Router, private userService: UsersService ) { }
  @ViewChild("logincard") private logincard: ElementRef;
  @ViewChild("innerview") private innerview: ElementRef;

  mousePosX;
  mousePosY;
  serverErrorMessage: String;
  emailInvalid: String;
  serverError: Boolean = false;
  verifyErrorMsg: String = ''

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {      // to get any type of mouse event position
      // console.log(event);l
      this.mousePosX = event.clientX;
      this.mousePosY = event.clientY
  }
  model = {
    email: '',
    password: ''
  }
  
  ngOnInit(){
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/userprofile']);
    }
    localStorage.removeItem('verifyUser');

  }
  registerpage(){
    this.router.navigate(['/signup'])
  }

  formOpen(){
    //console.log('open')
    this.innerview.nativeElement.style.display = 'flex'
    this.logincard.nativeElement.style.transition = "1s";
		this.logincard.nativeElement.style.background = "#ffffff";
		this.logincard.nativeElement.style.boxShadow="0 10px 30px 0 rgb(172 168 168 / 43%)";
    
  }
  formClose(){
    // console.log('close',this.logincard.nativeElement.style,this.innerview.nativeElement.style );
    if( this.mousePosX < 100 || this.mousePosY < 100 || this.mousePosX > 800 || this.mousePosY > 600 ){
      this.innerview.nativeElement.style.display = 'none';
      this.logincard.nativeElement.style.transition = "0.4s";
      this.logincard.nativeElement.style.background = "none";
      this.logincard.nativeElement.style.boxShadow="none";
    }
  }
  
  // getProductfromApi(){
  //   this.userService.getProduct().subscribe(
  //     res =>{
  //       console.log('Respose get',res);
  //     },
  //     err =>{
  //       console.log('Error getting',err);
  //     })
  // }


  onSubmit(form: NgForm){
    //console.log(form.value);
    this.userService.loginForm(form.value).subscribe(
      res =>{
        //console.log(res);
        this.userService.setToken(res['token']);    // set token from backend to store in local storage
        this.serverErrorMessage = "";
        this.emailInvalid = "";
        if(res['verified'] == 'no'){
          this.verifyErrorMsg = 'Your account not verified';
          this.verifiedOrnot(res['verified']);
          this.router.navigate(['/verifyuser']);
          this.setUsermailtoverify(this.model.email,res['id'],res['name']);
        }else{
          this.router.navigate(['/userprofile']);
          this.verifyErrorMsg = ''
        }
      }, err =>{
        this.serverError = true;
        this.serverErrorMessage = err.error.message ;
        if(err.error.message === "Auth failed"){
          this.emailInvalid = "Invalid email/password";
        }else if(err.statusText === 'Unknown Error'){
          this.serverErrorMessage = 'There has a problem in Server try again later.'
        }
        // console.log(err);
      }
    )
  }
  
  
  setUsermailtoverify(email,id,name){
    // console.log(id);
    localStorage.removeItem('verifyUser');
    localStorage.setItem('verifyUser',btoa(email) +'.'+ btoa(id)+'.'+ btoa(name)); // btoa ->  to encode a string
  }

  verifiedOrnot(ans){
    localStorage.setItem('verifed',btoa(ans));
  }

}
