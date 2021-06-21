import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private _elementRef: ElementRef, private userService: UsersService, private sanitizer: DomSanitizer ) { }

  public btnText = 'update photo';
  selectFile: File = null;
  picURL  = 'http://localhost:4000/upload/userProfilePics/'

  model= {
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    date: '',
    profileImageName: ''
  }

  ngOnInit() {
    let id = this.userService.getUserId()._id;
    this.userService.getUserDetails(id).subscribe(
      res =>{
        this.model = res['userData'];
        //console.log(this.model);
      }, err=>{
            alert('Something went wrong\nTry again later');
            console.log(err);
      }
    )
  }
  
  updatePic(){
    if( this.btnText === 'update photo' ){
      this.btnText = 'Save photo';
      document.getElementById('cancelOpt').hidden = false;
      document.getElementById('file').hidden = false;
      document.getElementById('blank').hidden = true;
    }else{
      console.log(this.selectFile);
      if(this.selectFile != null ){
        let newSetImgName = Math.floor(Math.random()*10000) + this.selectFile.name; 
        const fd = new FormData();
        fd.append('uploadImage',this.selectFile,newSetImgName);
        this.userService.picUpdate(fd).subscribe(
          res =>{
            
            this.btnText = 'update photo' ;
            document.getElementById('cancelOpt').hidden = true;
            document.getElementById('file').hidden = true;
            document.getElementById('blank').hidden = false;
            
            //console.log(res );

          },err=>{
            alert('Something went wrong\nContact to admin');
            //console.log(err)
          })
     
          this.model['profileImageName'] = newSetImgName;
         // console.log(this.model);
          this.userService.userDetailsUpdate(this.model).subscribe( res=> {
            if(confirm('Profile update successful') === true){
              window.location.reload()
            }
          //   console.log(res);
          // }, err=>{
          //     console.log(err);
          })
      }else{
        alert('image not selected');
      }
      
    }
  }
  cancelpic(){
    if( this.btnText === 'update photo' ){
      this.btnText = 'Save photo';
      document.getElementById('cancelOpt').hidden = false;
      document.getElementById('file').hidden = false;
      document.getElementById('blank').hidden = true;
    }else{
      this.btnText = 'update photo' ;
      document.getElementById('cancelOpt').hidden = true;
      document.getElementById('file').hidden = true;
      document.getElementById('blank').hidden = false;
    }
  }
  onSelectFile(event){
    this.selectFile =<File>event.target.files[0];
    //console.log(this.selectFile );
  }

  getPic(profilePic){
    return this.sanitizer.bypassSecurityTrustUrl(this.picURL + profilePic);
  }

//   get(url: string): Observable {
//     return new Observable((observer: Subscriber) => {
//         let objectUrl: string = null;

//         this.http
//             .get(url, {
//                 headers: this.getHeaders(),
//                 responseType: 'blob'
//             })
//             .subscribe(m => {
//                 objectUrl = URL.createObjectURL(m);
//                 observer.next(objectUrl);
//             });

//         return () => {
//             if (objectUrl) {
//                 URL.revokeObjectURL(objectUrl);
//                 objectUrl = null;
//             }
//         };
//     });
// }
  
}
