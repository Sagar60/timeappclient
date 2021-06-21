import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-changepassword2',
  templateUrl: './changepassword2.component.html',
  styleUrls: ['./changepassword2.component.css']
})
export class Changepassword2Component implements OnInit {

  constructor(private userService: UsersService, private router: Router) { }
  passwordValidity: Boolean = false;
  passwordSet: Boolean = false;
  errorMessage: String = '';

  model = {
    req: 'update password',
    email: '',
    password: '',
    confirmpassword: ''
  }

  ngOnInit(){
    let id = this.userService.getUserId()._id;
    this.userService.getUserDetails(id).subscribe(
      res=>{
        this.model.email = res['userData'].email;
      },err=>{

      })
  }
  onSubmit(form: NgForm){
    console.log(form.value);
    this.userService.forgotUserPassword(form.value).subscribe( res =>{
      //console.log(res);
      this.passwordValidity = false;
      this.errorMessage = ''
      this.passwordSet = true;
      setTimeout( ()=>{
        this.router.navigate(['/userprofile']);
      },1000 );

    }, err=>{
      //console.log(err);
      this.passwordValidity = true;
      this.errorMessage = err.error.message;
      if(err.error.message ==='You are not registered with us. Please sign up.'){
        this.router.navigate(['/login']);
      }
    })
  }

}
