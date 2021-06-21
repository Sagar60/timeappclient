import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthidComponent } from './changepassword/authid/authid.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { PasswordComponent } from './changepassword/password/password.component';
import { SetnewpasswordComponent } from './changepassword/setnewpassword/setnewpassword.component';
import { LoginComponent } from './userlogin/login/login.component';
import { SignupComponent } from './userlogin/signup/signup.component';

import { UserloginComponent } from './userlogin/userlogin.component';
import { Changepassword2Component } from './userprofile/changepassword2/changepassword2.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { UserhomeComponent } from './userprofile/userhome/userhome.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthappComponent } from './userverify/authapp/authapp.component';
import { EmailComponent } from './userverify/email/email.component';
import { OptComponent } from './userverify/opt/opt.component';
import { UserverifyComponent } from './userverify/userverify.component';
import { AboutComponent } from './workpath/about/about.component';
import { About2Component } from './workpath/home/about2/about2.component';
import { ClientComponent } from './workpath/home/client/client.component';
import { ContactComponent } from './workpath/home/contact/contact.component';
import { HomeComponent } from './workpath/home/home.component';
import { ServiceComponent } from './workpath/home/service/service.component';
import { WorkComponent } from './workpath/work/work.component';
import { WorkpathComponent } from './workpath/workpath.component';

const routes: Routes = [
  { path: 'verifyuser',component: UserverifyComponent,
    children: [
      { path: 'email', component: EmailComponent },
      { path: 'app', component: AuthappComponent },
      { path: '', component: OptComponent },

    ]
  },
  { path: 'workpath',component:WorkpathComponent,
    children: [
        { path: 'home', component:HomeComponent,
          children: [
            { path:'',component: About2Component},
            { path:'about',component:About2Component },
            { path:'contact',component:ContactComponent },
            { path:'service',component:ServiceComponent  },
            { path:'client', component:ClientComponent  }
        ]
      },
      { path: 'work', component:WorkComponent },
      { path: 'about', component:AboutComponent } 
    ]
  },
  {
    path: 'login', component:UserloginComponent,
    children: [
      {  path: '', component: LoginComponent }
    ]
  },
  {
    path: 'signup', component:UserloginComponent,
    children: [
      {  path: '', component: SignupComponent }
    ]
  },
  { path: 'userprofile', component: UserprofileComponent, canActivate: [AuthGuard],
    children: [
      { path: '',component: UserhomeComponent },
      { path: 'home',component: UserhomeComponent },
      { path: 'changepassword',component: Changepassword2Component },
      { path: 'profile',component: ProfileComponent }
    ]
  },
  { path: 'ap', component: ChangepasswordComponent,
    children: [
      { path: 'email', component: AuthidComponent },
      { path: 'password', component: PasswordComponent },
      { path: 'setnewpassword', component: SetnewpasswordComponent },
      { path: '', component: AuthidComponent },
    ]
  },
  { path: '', redirectTo: 'workpath/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
