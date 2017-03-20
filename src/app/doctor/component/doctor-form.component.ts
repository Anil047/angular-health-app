import {HttpService} from "../../patient/service/http.service";
import {Doctor} from "../model/doctor.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
/**
 * Created by anil on 3/19/17.
 */

@Component({
    selector: 'doctor-form',
    templateUrl: 'resources/pages/doctor/doctor-form.html',
})

export class DoctorFormComponent implements OnInit {
    doctor: Doctor = new Doctor();
    buttonName: string = "Submit";
    showMsg: boolean = false;
    infoMsg: string = "New doctor Record Has been added Successfully";
    styleClass: string = "alert-success";
    private url = HealthAppConstants.ROOT_URL + "Doctor/";
    onSubmitUrl = "add";

    constructor(private httpService: HttpService) {
    }

    onSubmit(event): void {
        event.preventDefault();
        let doctorOperation: Observable<any>;
        if (this.buttonName.toLowerCase() == 'submit') {
            console.log("Add Url: " + this.url + this.onSubmitUrl);
            doctorOperation = this.httpService.addRow(this.doctor, this.url + this.onSubmitUrl);
        } else {
            doctorOperation = this.httpService.updateRow(this.doctor, this.url + this.onSubmitUrl);
        }
        doctorOperation
            .subscribe(res => {
                console.log("doctor Added: " + JSON.stringify(res));
                this.doctor = new Doctor();
                this.httpService.otherSettings = {};
                this.httpService.model = {};
                this.showMsg = true;
            });

    }

    ngOnInit(): void {
        this.checkEditEvent();
    }

    private checkEditEvent() {
        if (typeof this.httpService.otherSettings != 'undefined') {
            if (typeof this.httpService.otherSettings.buttonName != 'undefined') {
                let otherSettings = this.httpService.otherSettings;
                if (otherSettings.buttonName.toLowerCase() == 'update') {
                    this.buttonName = otherSettings.buttonName;
                    this.showMsg = otherSettings.showMsg;
                    this.infoMsg = otherSettings.infoMsg;
                    this.onSubmitUrl = otherSettings.onSubmitUrl;
                    this.doctor = this.httpService.model;
                }
            }
        }
    }


}
