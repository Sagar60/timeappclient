import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-authid',
  templateUrl: './authid.component.html',
  styleUrls: ['./authid.component.css']
})
export class AuthidComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private router: Router, private userService: UsersService) { }

  emailValidity: Boolean = false;
  otpSend: Boolean = false;
  errorMessage: String = "";
  OTPTiming: Number = null;
  otpBtnName: String = 'Request OTP'

  model = {
    email: '',
    req: 'req OTP'
  }

  ngOnInit(){

  }
  onSubmit(form: NgForm){
    const getOtpBtn = document.getElementById('getOtpBtn');
    // console.log(form.value);
    this.userService.forgotUserPassword(form.value).subscribe( res =>{
      // to show otp
      console.log(res);
      this.emailValidity = false;
      this.otpSend = true;
      this.errorMessage = '';
      setTimeout(() => {
        this.router.navigate(['/ap/password', { arb: btoa(form.value.email) } ] )
      }, 1500);
      getOtpBtn['disabled'] = true;
    }, err =>{
      // console.log(err);
      this.errorMessage = err.error.message;
      if(err.error.message === 'You have recently receive an otp'){
        getOtpBtn['disabled'] = true;
        this.otpBtnName = 'Get a new OTP';
        // this.OTPTiming = 10;
        const nowTime = Math.floor(Date.now()/1000) + 1*60;
        setInterval( ()=>{
          this.OTPTiming = nowTime - Math.floor(Date.now()/1000) >= 0 ?
           nowTime - Math.floor(Date.now()/1000) : null ;

        }, (nowTime - Math.floor(Date.now()/1000) >=0 ? 1000 : null )  );

        setTimeout(() => {
          getOtpBtn['disabled'] = false;
        }, 60*1000);

      }else if(err.statusText === 'Unknown Error'){
        this.errorMessage = 'There has a problem in Server try again later.'
      }
      this.otpSend = false;
      this.emailValidity = true;
    } )
  }

}
