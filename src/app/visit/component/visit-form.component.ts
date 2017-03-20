import {HttpService} from "../../patient/service/http.service";
import {Visit} from "../model/visit.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Patient} from "../../patient/model/patient.model";
import {Bed} from "../../bed/model/bed.model";
import {Doctor} from "../../doctor/model/doctor.model";
/**
 * Created by anil on 3/19/17.
 */

@Component({
    selector: 'visit-form',
    templateUrl: 'resources/pages/visit/visit-form.html',
})

export class VisitFormComponent implements OnInit {
    visit: Visit = new Visit();
    buttonName: string = "Submit";
    showMsg: boolean = false;
    infoMsg: string = "New visit Record Has been added Successfully";
    styleClass: string = "alert-success";
    private url = HealthAppConstants.ROOT_URL + "Visit/";
    onSubmitUrl = 'add';
    patientList: Patient[] = [];
    bedList: Bed[] = [];
    doctorList: Doctor[] = [];
    patientTypeList = [{id: 0, name: 'In Paitent'}, {id: 1, name: 'Out Patient'}];

    constructor(private httpService: HttpService) {
    }

    onSubmit(event): void {
        event.preventDefault();
        let visitOperation: Observable<any>;
        if (this.buttonName.toLowerCase() == 'submit') {
            visitOperation = this.httpService.addRow(this.visit, this.url + this.onSubmitUrl);
        } else {
            visitOperation = this.httpService.updateRow(this.visit, this.url + this.onSubmitUrl);
        }
        visitOperation
            .subscribe(res => {
                console.log("visit Added: " + JSON.stringify(res));
                this.visit = new Visit();
                this.httpService.otherSettings = {};
                this.httpService.model = {};
                this.showMsg = true;
            });

    }

    ngOnInit(): void {
        this.checkEditEvent();
        this.getBedList();
        this.getDoctorList();
        this.getPatientList();
    }

    getDoctorList() {
        this.httpService.getAllRows(HealthAppConstants.ROOT_URL + "Doctor/list")
            .subscribe(res => this.doctorList = res);
    }

    getBedList() {
        this.httpService.getAllRows(HealthAppConstants.ROOT_URL + "Bed/list")
            .subscribe(res => this.bedList = res);
    }

    getPatientList() {
        this.httpService.getAllRows(HealthAppConstants.ROOT_URL + "Patient/list")
            .subscribe(res => this.patientList = res);
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
                    this.visit = this.httpService.model;
                }
            }
        }
    }


}
