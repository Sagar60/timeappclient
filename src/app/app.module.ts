import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AboutComponent } from './workpath/about/about.component';
import { About2Component } from './workpath/home/about2/about2.component';
import { ClientComponent } from './workpath/home/client/client.component';
import { ContactComponent } from './workpath/home/contact/contact.component';
import { HomeComponent } from './workpath/home/home.component';
import { ServiceComponent } from './workpath/home/service/service.component';
import { WorkComponent } from './workpath/work/work.component';
import { WorkpathComponent } from './workpath/workpath.component';
import { LoginComponent } from './userlogin/login/login.component';
import { SignupComponent } from './userlogin/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ProfileComponent } from './userprofile/profile/profile.component';
import { UserhomeComponent } from './userprofile/userhome/userhome.component';
import { UsersService } from './shared/users.service';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthidComponent } from './changepassword/authid/authid.component';
import { PasswordComponent } from './changepassword/password/password.component';
import { SetnewpasswordComponent } from './changepassword/setnewpassword/setnewpassword.component';
import { Changepassword2Component } from './userprofile/changepassword2/changepassword2.component';
import { UserverifyComponent } from './userverify/userverify.component';
import { EmailComponent } from './userverify/email/email.component';
import { AuthappComponent } from './userverify/authapp/authapp.component';
import { OptComponent } from './userverify/opt/opt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent,
    ClientComponent,
    ServiceComponent,
    About2Component,
    UserloginComponent,
    WorkpathComponent,
    LoginComponent,
    SignupComponent,
    UserprofileComponent,
    ProfileComponent,
    UserhomeComponent,
    ChangepasswordComponent,
    AuthidComponent,
    PasswordComponent,
    SetnewpasswordComponent,
    Changepassword2Component,
    UserverifyComponent,
    EmailComponent,
    AuthappComponent,
    OptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
