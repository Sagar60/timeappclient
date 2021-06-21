import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    // console.log(event.key);
    if(event.key === 'Enter')
    {
      event.preventDefault();
      // remove something...
    }
  }
  constructor(private userService: UsersService, private router: Router) { }
  successOrError: String = '';
  successOrErrorMsg: String = '';
  isNextdisabled: Boolean = false;

  model = {
    id: '',
    email: '',
    OTP: '',
    name: ''
  }

  ngOnInit(){
    this.model.email = this.extractemail();
    this.model.id = this.extracteid();
  }

  onSubmit(form: NgForm){
      this.userService.userAccountverify(form.value).subscribe( res =>{
        // console.log(res);
        this.successOrError = 'alert-success';
        this.successOrErrorMsg = res['message'];
        localStorage.removeItem('verifyUser');
        setTimeout( ()=>{
          if(this.isItloggedin()){
            this.router.navigate(['/userprofile']);
          }else{
            this.router.navigate(['/login']);
          }
        },1000 )
      },err =>{
        // console.log(err);
        this.successOrError = 'alert-danger';
        this.successOrErrorMsg = err.error['message'];

      })
  }

  gotoprev(){
    window.history.go(-1);
  }
  extractemail(){
    var token = localStorage.getItem('verifyUser').split('.')[0];
    if(token){
      return atob(token);
    }
    return null;
  }
  extracteid(){
    var token = localStorage.getItem('verifyUser').split('.')[1];
    if(token){
      return atob(token);
    }
    return null;
  }
  
  isItloggedin(){
    localStorage.removeItem('verifed');
    let token = localStorage.getItem('token');
    if(!token){
      return false;
    }else{
      return true;
    }
  }
  
}
