import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  @ViewChild("mysidenav") mysidenav: ElementRef;

  ngOnInit(){
    
  }
  closeNav(){
    this.mysidenav.nativeElement.style.width = "0";
    this.mysidenav.nativeElement.style.display = "none";

  }
  openNav(){
    this.mysidenav.nativeElement.style.width = "250px";
    this.mysidenav.nativeElement.style.display = "block";

    console.log(this.mysidenav.nativeElement.style.width);

  }

}
