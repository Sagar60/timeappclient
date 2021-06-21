import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workpath',
  templateUrl: './workpath.component.html',
  styleUrls: ['./workpath.component.css']
})
export class WorkpathComponent implements OnInit {

  constructor(private router: Router){}


  ngOnInit(){
  }
  loginpage(){
    this.router.navigate(['/login'])
  }

}
