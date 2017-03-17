import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {AppUser} from "../../patient/model/app-user.model";
import {Observable} from "rxjs/Observable";
/**
 * Created by anil on 3/17/17.
 */
@Injectable()
export class AuthenticationService{
    private loginUrl = "http://localhost:8080/home/";
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(private http:Http){}
    storeToken(token:any){
        localStorage.setItem(HealthAppConstants.AUTH_HEADER,token);
    }


    getToken(){
        return localStorage.getItem(HealthAppConstants.AUTH_HEADER);
    }

    removeToken(){
        localStorage.removeItem(HealthAppConstants.AUTH_HEADER);
    }
    
    isLoggedIn(){
        return  this.getToken();
    }

    authenticate(appUser:AppUser):Observable<any>{
        return this.http.post(this.loginUrl+'authenticate', JSON.stringify(appUser), {headers: this.headers})
            .map((res:Response)=>res.json())
            .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }

    logout(){
        this.removeToken();
    }
}