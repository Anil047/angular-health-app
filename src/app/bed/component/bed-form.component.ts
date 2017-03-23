import {HttpService} from "../../patient/service/http.service";
import {Bed} from "../model/bed.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {FormGroup, FormControl, Validators} from "@angular/forms";
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
    onSubmitUrl = 'add';

    //Model Driven Form Validation

    bedForm: FormGroup;
    id: FormControl;
    bedName: FormControl;
    ratePerDay: FormControl;
    bedType: FormControl;

    createFormControls() {
        this.id = new FormControl(this.bed.id);
        this.bedName = new FormControl(this.bed.bedName, [
            Validators.required,
            Validators.minLength(4)
        ]);
        this.ratePerDay = new FormControl(this.bed.ratePerDay, [
            Validators.required,
            Validators.pattern("(?:\\d*\\.)?\\d+")
        ]);
        this.bedType = new FormControl(this.bed.bedType, Validators.required);
    }

    createForm() {
        this.bedForm = new FormGroup({
            id: this.id,
            bedName: this.bedName,
            ratePerDay: this.ratePerDay,
            bedType: this.bedType
        });
    }

    constructor(private httpService: HttpService) {
    }

    onSubmit(event): void {
        event.preventDefault();
        this.bed = this.bedForm.value;
        let bedOperation: Observable<any>;
        if (this.buttonName.toLowerCase() == 'submit') {
            bedOperation = this.httpService.addRow(this.bed, this.url + this.onSubmitUrl);
        } else {
            bedOperation = this.httpService.updateRow(this.bed, this.url + this.onSubmitUrl);
        }
        bedOperation
            .subscribe(res => {
                this.bedForm.reset();
                this.bed = new Bed();
                this.httpService.otherSettings = {};
                this.httpService.model = {};
                this.showMsg = true;
            });

    }

    ngOnInit(): void {
        this.checkEditEvent();
        this.createFormControls();
        this.createForm();
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
