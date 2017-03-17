import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Patient} from "../model/patient.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {AuthenticationService} from "../../login/service/authentication.service";
//import {Patient} from "../model/patient.model";
//import { Observable } from 'rxjs/Observable';

/**
 * Created by anil on 3/10/17.
 */
@Injectable()
export class PatientService {
    get patient(): Patient {
        return this._patient;
    }

    set patient(value: Patient) {
        this._patient = value;
    }

    private patientUrl = "http://localhost:8080/Patient/";
    private _patient: Patient = new Patient();

    getHeaders(){
       let headers = new Headers();
        headers.append('Content-Type','application/json');
        headers.append(HealthAppConstants.AUTH_HEADER,this.authService.getToken());
        return headers;
    }

    getAuthHeader(){
        let headers = new Headers();
        headers.append(HealthAppConstants.AUTH_HEADER,this.authService.getToken());
        return headers;
    }
    constructor(private http: Http, private authService:AuthenticationService) {
    }

    public create(url: string, formData: any): Promise<any> {
        return this.http
            .post(url, JSON.stringify(formData), {headers: this.getHeaders()})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error("An error occured", error);
        return Promise.reject(error.message || error);
    }

    getPatientList(): Observable<Patient[]> {
        let options = new RequestOptions({ headers: this.getAuthHeader()});
        return this.http.get(this.patientUrl + "list",options)
            .map((res: Response) => res.json() as Patient[])
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    delete(id:number):Observable<any>{
        console.log("Delete Url: "+ this.patientUrl+id);
        return this.http.delete(this.patientUrl+id)
            .map((res:Response)=>res)
            .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
    }

}