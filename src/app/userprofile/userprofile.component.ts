import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor( private userService: UsersService, private router: Router ) { }
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 56) {
       let element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      let element = document.getElementById('navbar');
        element.classList.remove('sticky'); 
     }
  }
  model: {
    firstname: '',
    lastname: '',
    email: '',
    date: '',
    picprofilePicName: ''
  }

  ngOnInit() {
    let id = this.userService.getUserId()._id;
    this.userService.getUserDetails(id).subscribe(
      res =>{
        this.model = res['userData'];
        // console.log(this.model);
      }, err=>{
        //console.log(err, err.error.message);
        if(err.error.message === 'user not found'){
          alert('You are banned\ncontact to Admin')
          setTimeout( ()=>{
            this.logout();
          },1500)
        }
      }
    )
  }

  logout(){
    this.userService.deleteToken();
    setTimeout( ()=>{
      this.router.navigate(['/login'])
    },2000 )
  }
}
