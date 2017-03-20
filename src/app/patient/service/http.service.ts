import {Injectable} from "@angular/core";
import {AuthenticationService} from "../../login/service/authentication.service";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {HealthAppConstants} from "../../utils/HealthAppConstants";

/**
 * Created by anil on 3/19/17.
 */

@Injectable()
export class HttpService {
    public model: any;
    public otherSettings: any;

    constructor(private http: Http, private authService: AuthenticationService) {
    }

    public clearFields() {
        this.model = {};
        this.otherSettings = {};
    }

    private requestOptions = new RequestOptions({headers: this.geAuthtHeader()});

    geAuthtHeader(): Headers {
        let headers = new Headers();
        headers.append(HealthAppConstants.AUTH_HEADER, this.authService.getToken());
        return headers;
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append(HealthAppConstants.AUTH_HEADER, this.authService.getToken());
        return headers;
    }

    addRow(data: any, url: string): Observable<any> {
        let requestOptions = new RequestOptions({headers: this.getHeaders()}); // Create a request option
        return this.http.post(url, data, requestOptions)
            .map((res: Response) => res)
            .catch((error: any) => this.handleError(error));
    }

    private handleError(error: any): Observable<any> {
        console.error("An error occured", error);
        return Observable.throw(error.json().error || 'Server error');
    }

    updateRow(data: any, url: string): Observable<any> {
        return this.http.put(url, data, {headers: this.getHeaders()})
            .map((res: Response) => res)
            .catch((error: any) => this.handleError(error));
    }

    deleteRow(url: string): Observable<any> {
        return this.http.delete(url, this.requestOptions)
            .map((res: Response) => res)
            .catch((error: any) => this.handleError(error));
    }

    getAllRows(url: string): Observable<any> {
        return this.http.get(url, this.requestOptions)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

    getRowById(url: string): Observable<any> {
        return this.http.get(url, this.requestOptions)
            .map((res: Response) => res.json())
            .catch((error: any) => this.handleError(error));
    }

}