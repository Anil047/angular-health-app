import {Component} from "@angular/core";
import {AuthenticationService} from "../../login/service/authentication.service";
import {Router} from "@angular/router";
/**
 * Created by anil on 3/8/17.
 */

@Component({
    selector: 'dashboard',
    templateUrl: '../../../../resources/pages/dashboard/dashboard.html',
    styleUrls:['../../../../resources/css/dashboard/dashboard.css']
})
export class DashboardComponent{
    constructor(private authService:AuthenticationService, private router:Router){}
    onLogout():void{
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
