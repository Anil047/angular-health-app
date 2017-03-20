import {HttpService} from "../../patient/service/http.service";
import {Bed} from "../model/bed.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
/**
 * Created by anil on 3/19/17.
 */

@Component({
    selector: 'bed-form',
    templateUrl: 'resources/pages/bed/bed-form.html',
})

export class BedFormComponent implements OnInit {
    bed: Bed = new Bed();
    buttonName: string = "Submit";
    showMsg: boolean = false;
    infoMsg: string = "New bed Record Has been added Successfully";
    styleClass: string = "alert-success";
    private url = HealthAppConstants.ROOT_URL + "Bed/";
    onSubmitUrl: 'add';

    constructor(private httpService: HttpService) {
    }

    onSubmit(event): void {
        event.preventDefault();
        let bedOperation: Observable<any>;
        if (this.buttonName.toLowerCase() == 'submit') {
            bedOperation = this.httpService.addRow(this.bed, this.url + this.onSubmitUrl);
        } else {
            bedOperation = this.httpService.updateRow(this.bed, this.url + this.onSubmitUrl);
        }
        bedOperation
            .subscribe(res => {
                console.log("bed Added: " + JSON.stringify(res));
                this.bed = new Bed();
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
                    this.bed = this.httpService.model;
                }
            }
        }
    }


}
