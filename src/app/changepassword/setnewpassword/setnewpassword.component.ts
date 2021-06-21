import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {

  passwordValidity: Boolean = false;
  passwordSet: Boolean = false;
  emailOrMobile: String = '';
  emailOrMobileName: String = '';
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/;
  userMaxTimeLimit: Number = null;
  errorMessage: String = ''

  constructor(private router: Router, private userService: UsersService, private route: ActivatedRoute ) { }

  model = {
    req: 'update password',
    email: '',
    password: '',
    confirmpassword: ''
  }

  ngOnInit() {
    if(this.getUserDetails() == null){
      this.router.navigate(['/ap']);
    }else{
      
      this.passwordValidity = false;
      try{
        this.emailOrMobileName = atob(String(this.getUserDetails()['arb'] ));
      }catch(e){
        console.log(e);
        this.router.navigate(['/ap']);
      }
      this.emailOrMobile = (this.emailOrMobileName.match(/[@]/g)  ? 'email' : 'mobile number');
      this.model.email = this.emailOrMobileName as string ;
      this.userMaxTimeLimit =  Number(atob(String(this.getUserDetails()['valid'])))
      
      this.checkPageValidorNot(this.emailOrMobileName.trim());
      this.checkUserMaxTime(this.userMaxTimeLimit);
    }

  }
  onSubmit(form: NgForm){
    this.userService.forgotUserPassword(form.value).subscribe( res =>{
      //console.log(res);
      this.passwordValidity = false;
      this.errorMessage = ''
      this.passwordSet = true;
      this.deleteTokenUserDetail();
      setTimeout( ()=>{
        this.router.navigate(['/login']);
      },1000 );

    }, err=>{
      //console.log(err);
      this.passwordValidity = true;
      this.errorMessage = err.error.message;
      if(err.error.message ==='You are not registered with us. Please sign up.'){
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
  checkUserMaxTime(time){
    if(time == null || time === undefined || time < Math.floor(Date.now()/1000) ){
      this.passwordValidity = true;
      this.errorMessage = 'Your update password time limit exceed, Please try again.'
      setTimeout( ()=>{
        this.router.navigate(['/ap']);
      },1000 );
    }
  }

  //token workings
  getUserDetails(){
    var token =localStorage.getItem('setNewPassword');
    if(token){
      return JSON.parse(token);
    }else{
      return null;
    }
  }
  deleteTokenUserDetail(){
    localStorage.removeItem('setNewPassword');
  }
}
