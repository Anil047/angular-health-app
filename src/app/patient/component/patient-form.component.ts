import {Component, OnInit} from "@angular/core";
import {Patient} from "../model/patient.model";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {HttpService} from "../service/http.service";
import {Observable} from "rxjs";

/**
 * Created by anil on 3/8/17.
 */
@Component({
    selector:'patient-form',
    templateUrl:'../../../../resources/pages/Patient/patient-form.html',
})
export class PatientFormComponent implements OnInit{

    patient: Patient = new Patient();
    buttonName: string = "Submit";
    showMsg: boolean = false;
    infoMsg: string = "New patient Record Has been added Successfully";
    styleClass: string = "alert-success";
    private url = HealthAppConstants.ROOT_URL + "Patient/";
    onSubmitUrl = 'add';
    file: any = {};
    showFileInput = true;

    constructor(private httpService: HttpService) {
    }

    onSubmit(event): void {
        event.preventDefault();
        let patientOperation: Observable<any>;
        if (this.buttonName.toLowerCase() == 'submit') {
            this.patient.encodedFileInString = this.file.base64;
            this.patient.extensionOfFile = this.file.fileExtention;
            patientOperation = this.httpService.addRow(this.patient, this.url + this.onSubmitUrl);
        } else {
            patientOperation = this.httpService.updateRow(this.patient, this.url + this.onSubmitUrl);
        }
        patientOperation
            .subscribe(res => {
                this.patient = new Patient();
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
                    this.patient = this.httpService.model;
                    this.showFileInput = false;
                }
            }
        }
    }

    files: FileList;

    onFileChange(event): void {
        this._onChange(event).then(
            res => this.file = res[0]
        );
    }


    private _onChange(event): any {

        // var response = [];

        return new Promise(function (resolve, reject) {

            //Retrieve all the files from the FileList object
            var files = event.target.files;
            var response = [];

            if (files) {

                for (var i = 0, f; f = files[i]; i++) {

                    var r = new FileReader();
                    r.onload = (function (currentFile) {
                        var fileName = currentFile.name;
                        return function (e) {
                            let contents = e.target['result'];
                            let file = {
                                fileExtention: '.' + fileName.substr(fileName.lastIndexOf('.') + 1),
                                base64: btoa(contents)
                            };

                            response.push(file);
                            if (response.length == files.length) {
                                // Everything is done. Resolve the promise.
                                resolve(response);
                            }
                        };
                    })(f);

                    // Moved here to be able to access r and f variables
                    r.readAsBinaryString(f);
                }
            }
        });
    }



}
