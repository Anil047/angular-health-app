import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";
import {Injectable} from "@angular/core";
/**
 * Created by anil on 3/17/17.
 */
@Injectable()
export class AppGuard implements CanActivate{
    constructor(private router: Router, private authService:AuthenticationService) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            // if logged in return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }

}