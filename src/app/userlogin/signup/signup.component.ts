import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/;

  constructor(private router: Router, private userService: UsersService) { }
  @ViewChild("logincard") private logincard: ElementRef;
  @ViewChild("innerview") private innerview: ElementRef;
  @ViewChild("password") private password: ElementRef;
 
  mousePosX;
  mousePosY;

  public lowercase:boolean = true ;
  public uppercase:boolean = true;
  public specialcase:boolean = true;
  public number:boolean = true;
  public length:boolean = true;
  public serverErrorMessage: String;
  public serverMessageBoxColor: String = 'alert alert-danger';
  emailInvalid  = ""

  model ={
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
  // when you include ngForm in html then include must FormsModule in app.routing 
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {      // to get any type of mouse event position
      // console.log(event);l
      this.mousePosX = event.clientX;
      this.mousePosY = event.clientY
  }
  
  ngOnInit() {

  }
  Loginpage(){
    this.router.navigate(['/login'])
  }
  
  formOpen(){
    // console.log('open')
    this.innerview.nativeElement.style.display = 'flex'
    this.logincard.nativeElement.style.transition = "1s";
		this.logincard.nativeElement.style.background = "#ffffff";
		this.logincard.nativeElement.style.boxShadow="0 10px 30px 0 rgb(172 168 168 / 43%)";
  }
  // startFormWidthPoint: number;
  // endFormWidthPoint : number;
  // topFormHightPoint : number;
  // endFormHightPoint : number;
  formClose(){
    // this.startFormWidthPoint = Math.floor((window.innerWidth - (this.innerview.nativeElement as HTMLElement).offsetWidth)/2) + 5 ;
    // this.endFormWidthPoint = (this.logincard.nativeElement as HTMLElement).offsetWidth + Math.floor((window.innerWidth - (this.innerview.nativeElement as HTMLElement).offsetWidth)/2) - 10;
    // this.topFormHightPoint = Math.floor( (window.innerHeight - (this.innerview.nativeElement as HTMLElement).offsetHeight) /2) + 5;
    // this.endFormHightPoint =  (this.logincard.nativeElement as HTMLElement).offsetHeight + Math.floor((window.innerHeight - (this.innerview.nativeElement as HTMLElement).offsetHeight)/2) - 10;
    // console.log('close', this.mousePosX,this.mousePosY, this.startFormWidthPoint,this.endFormWidthPoint,
    // this.topFormHightPoint, this.endFormHightPoint  );
    // console.log(this.startFormWidthPoint,this.endFormWidthPoint,this.topFormHightPoint,this.endFormHightPoint );
    // console.log( this.mousePosX < this.startFormWidthPoint || this.mousePosX > this.endFormWidthPoint || 
    //   this.mousePosY < this.topFormHightPoint || this.mousePosY > this.endFormHightPoint );

    // if( this.mousePosX < this.startFormWidthPoint || this.mousePosX > this.endFormWidthPoint || 
    //    this.mousePosY < this.topFormHightPoint || this.mousePosY > this.endFormHightPoint ){
      if( this.mousePosX < 100 || this.mousePosY < 100 || this.mousePosX > 1000 || this.mousePosY > 600 ){
        this.innerview.nativeElement.style.display = 'none';
        this.logincard.nativeElement.style.transition = "0.4s";
        this.logincard.nativeElement.style.background = "none";
        this.logincard.nativeElement.style.boxShadow="none";
      }
    // }
  }
  // save = setInterval( ()=>{
  //   this.startFormWidthPoint = Math.floor((window.innerWidth - (this.innerview.nativeElement as HTMLElement).offsetWidth)/2) + 5 ;
  //   this.endFormWidthPoint = (this.logincard.nativeElement as HTMLElement).offsetWidth + Math.floor((window.innerWidth - (this.innerview.nativeElement as HTMLElement).offsetWidth)/2) - 10;
  //   this.topFormHightPoint = Math.floor( (window.innerHeight - (this.innerview.nativeElement as HTMLElement).offsetHeight) /2) + 5;
  //   this.endFormHightPoint =  (this.logincard.nativeElement as HTMLElement).offsetHeight + Math.floor((window.innerHeight - (this.innerview.nativeElement as HTMLElement).offsetHeight)/2) - 10;
  //   console.log('close', this.mousePosX < this.startFormWidthPoint || this.mousePosX > this.endFormWidthPoint || 
  //   this.mousePosY < this.topFormHightPoint || this.mousePosY > this.endFormHightPoint );
  //   if( this.mousePosX < this.startFormWidthPoint || this.mousePosX > this.endFormWidthPoint || 
  //     this.mousePosY < this.topFormHightPoint || this.mousePosY > this.endFormHightPoint ){
  //      this.innerview.nativeElement.style.display = 'none';
  //      this.logincard.nativeElement.style.transition = "0.4s";
  //      this.logincard.nativeElement.style.background = "none";
  //      this.logincard.nativeElement.style.boxShadow="none";
  //  }else{
  //   this.innerview.nativeElement.style.display = 'flex'
  //   this.logincard.nativeElement.style.transition = "1s";
	// 	this.logincard.nativeElement.style.background = "#ffffff";
	// 	this.logincard.nativeElement.style.boxShadow="0 10px 30px 0 rgb(172 168 168 / 43%)";
  //  }
   
  // },500 )

  passwordMatch(){
    let password = this.model.password;
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    // lowercase check
    if(password.match(/[a-z]/g)){
      this.lowercase = false;
    }else{
      this.lowercase = true;
    }
    // uppercase check
    if(password.match(/[A-Z]/g)){
      this.uppercase = false;
    }else{
      this.uppercase = true;
    }
    // number check
    if(password.match(/[0-9]/g)){
      this.number = false;
    }else{
      this.number = true;
    }
    // special check
    if(password.match(/[$@$!%*?&]/g)){
      this.specialcase = false;
    }else{
      this.specialcase = true;
    }
    // lenght check
    if(password.length >=8 ){
      this.length = false;
    }else{
      this.length = true;
    }
    // console.log( this.model.password );
  }

  onSubmit(form: NgForm){
    // console.log(form.value);
    this.userService.postUser(form.value).subscribe(
      res =>{
        // console.log(res);
        this.setUsermailtoverify(this.model.email,res['user_id'],this.model.firstname);
        this.serverMessageBoxColor = 'success'
        this.serverErrorMessage = 'Your account has created';
        this.emailInvalid = 'Now you need to verify'
        setTimeout(() => {
          this.router.navigate(['/verifyuser']);
        }, 3000);
      }, err=>{
        // console.log(err);
        this.emailInvalid = '' 
        this.serverErrorMessage = err.error.message;
        this.serverMessageBoxColor = 'alert alert-danger';
        if(err.statusText === 'Unknown Error'){
          this.serverErrorMessage = 'There has a problem in Server try again later.'
        }
      }
    )
  }

  setUsermailtoverify(email,id,name){
    // console.log(id);
    localStorage.removeItem('verifyUser');
    localStorage.setItem('verifyUser',btoa(email) +'.'+ btoa(id)+'.'+ btoa(name)); // btoa ->  to encode a string
  }
}