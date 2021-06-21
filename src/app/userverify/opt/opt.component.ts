import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-opt',
  templateUrl: './opt.component.html',
  styleUrls: ['./opt.component.css']
})
export class OptComponent implements OnInit {
  @ViewChild("optForm") private optForm: ElementRef;
  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    // console.log(event.key);

    if(event.key === 'Enter')
    {
      // this.onSubmit(this.optForm)
      // remove something...
    }
  }

  model = {
    verifyoption: 'email',
    email: '',
    id: '',
    for: 'verify your account',
    name: '' 
  }
  progressBarDisplay: String = 'meter red meterprogressoff';
  successOrError: String = '';
  successOrErrorMsg: String = '';
  isNextdisabled: Boolean = false;

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(){
    this.model.email = this.extractemail();
    this.model.id = this.extracteid();
    this.model.name = this.extractename();
    
  }
  onSubmit(form: NgForm){
    // console.log(form.value);
    this.successOrError = '';
    this.successOrErrorMsg = '';
    try{
        this.isNextdisabled = true;
        form.value.for = this.model.for;
        form.value.id = this.model.id;

        // for email verification
        this.progressBarDisplay = 'meter red meterprogresson';
        if(form.value.verifyoption == 'email'){
          this.userService.userAccountverifyOption(form.value).subscribe( res=>{
            this.progressBarDisplay = 'meter red meterprogressoff';
            this.successOrError = 'alert-success';
            this.successOrErrorMsg = res['message'];
            setTimeout(() => {            
              this.isNextdisabled = false;
              this.router.navigate(['/verifyuser/email'])
            }, 1800);
            // console.log(res);
          },err=>{
            this.isNextdisabled = false;
            this.progressBarDisplay = 'meter red meterprogressoff';
            this.successOrError = 'alert-danger';
            this.successOrErrorMsg = err.error['message'];
            // console.log(err);
          });
        }else if(form.value.verifyoption === 'app'){
          // for auth app verification
          console.log('app');
          this.progressBarDisplay = 'meter red meterprogressoff';
          alert('this services will come soon');
        }else{
          // for mobile or other verification
          this.progressBarDisplay = 'meter red meterprogressoff';
          console.log('mobile');
          alert('this services will come soon')

        }
    }catch(e){
      console.log(e)
    }finally{
      
      // console.clear();
    }
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
      // console.log(atob(token));
      return atob(token);
    }
    return null;
  }
  extractename(){
    var token = localStorage.getItem('verifyUser').split('.')[2];
    if(token){
      // console.log(atob(token));
      return atob(token);
    }
    return null;
  }
}
