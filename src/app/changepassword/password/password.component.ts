import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  OTPValidity: Boolean = false;
  otpVerify: Boolean = false;
  OTPTiming: Number = null;
  otpBtnName: String = 'Submit OTP'
  newOtp: String = ''

  constructor(private route: ActivatedRoute, private userService: UsersService, 
    private router: Router ) { }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailOrMobile: String = '';
  emailOrMobileName: String = '';
  minLength = /[0-9]{6,}/;
  errorMessage: String = ''

  model = {
    email: '',
    otp: '',
    req: 'match OTP' 
  }

  ngOnInit() {
    try{
      this.emailOrMobileName = atob(String(this.route.snapshot.paramMap.get('arb')));
    }catch(e){
      console.log(e);
      this.router.navigate(['/ap']);
    }
    this.emailOrMobile = (this.emailOrMobileName.match(/[@]/g)  ? 'email' : 'mobile number');
    this.model.email = this.emailOrMobileName as string ;
    this.checkPageValidorNot(this.emailOrMobileName.trim());
  }

  onSubmit(form: NgForm){
    const getOtpBtn = document.getElementById('submitOtpBtn');
    this.newOtp = '';
    if(this.otpBtnName === 'Get a new OTP'){
      form.value.req = 'req OTP';
      this.newOtp = this.emailOrMobileName;
    }else{
      form.value.req = 'match OTP';
      this.newOtp = '';
    }
    //console.log(form.value);
    this.userService.forgotUserPassword(form.value).subscribe( res =>{
      //console.log(res);
      this.errorMessage = '';
      this.otpBtnName = 'Submit OTP';
      if(res['gotoSetpassword'] != undefined ){
        const id = {arb: btoa(String(this.emailOrMobileName)),
           valid: btoa(res['time']) }
        this.setUserDetails( JSON.stringify({arb: btoa(String(this.emailOrMobileName)),
          valid: btoa(res['time']) } ))
        this.router.navigate(['ap/setnewpassword'])
      }

    }, err=>{
      // console.log(err);
      this.errorMessage = err.error.message;
      this.otpBtnName = 'Submit OTP'
      if(err.error.message === 'This OTP has expired'){
        this.otpBtnName = 'Get a new OTP';
        
      }else if(err.error.message === 'You have recently receive an otp'){
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

      }else if(err.error.message ==='You are not registered with us. Please sign up.'){
        this.router.navigate(['/ap']);
      }
    })
  }

  checkPageValidorNot(id){
    if(id === 'ée' || id === undefined || id == null || id === ''  ){
      this.router.navigate(['/ap']);
    }else if(this.emailOrMobile === 'mobile number' && id.match(/[a-zA-Z]/g) ){
      this.router.navigate(['/ap']);
    }else if(this.emailOrMobile === 'email' && !id.match(this.emailRegex) ){
      this.router.navigate(['/ap']);
    }
  }

  setUserDetails(id){
    localStorage.setItem('setNewPassword',id);
  }

}
