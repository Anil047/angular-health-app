/**
 * Created by anil on 3/17/17.
 */

import {Component} from "@angular/core";
import {AppUser} from "../../patient/model/app-user.model";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
@Component({
    selector:'login-form',
    templateUrl:'resources/pages/login/login.html',
    styleUrls:['resources/css/login/login.css']
})

export class LoginComponent{
     public errMsg:string="Username or Password Invalid!";
     public showErr:boolean=false;
     public appUser:AppUser = new AppUser();
     constructor(private router:Router,private authService: AuthenticationService){}
     onSubmit():void{
            this.authService.authenticate(this.appUser).subscribe(res=>{
                if(res.responseStatus){
                    this.authService.storeToken(res.responseData);
                    this.showErr=false;
                    this.router.navigate(['/dashboard']);
                }else {
                    this.showErr=true;
                }
            });

     }

     onKeyPress():void{
         this.showErr=false;
     }
}