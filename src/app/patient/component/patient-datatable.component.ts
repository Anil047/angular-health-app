import {Component, OnInit} from "@angular/core";
import {Patient} from "../model/patient.model";
import {Router} from "@angular/router";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Response} from "@angular/http";
import {HttpService} from "../service/http.service";
/**
 * Created by anil on 3/13/17.
 */

@Component({
    selector: 'patient-form',
    templateUrl: '../../../../resources/pages/Patient/patient-datatable.html',
})
export class PatientDatatableComponent implements OnInit {

    public data: Patient[] = [];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
    private url = HealthAppConstants.ROOT_URL + "Patient/";
    public filePath = HealthAppConstants.FILE_PATH;

    constructor(private httpService: HttpService, private router: Router) {
    }

    getPatientList(): void {
        this.httpService.getAllRows(this.url + "list").subscribe(
            response => this.data = response
        );
    }

    ngOnInit(): void {
        this.httpService.clearFields();
        this.getPatientList();
    }

    public removePatient(patient: Patient, rowNum) {
        this.httpService.deleteRow(this.url + `${patient.id}`)
            .subscribe(
                (res: Response) => {
                    if (res.statusText.toString().toLowerCase() == "ok") {
                        let index1 = this.data.indexOf(patient);
                        this.data.splice(index1, 1);
                    }

                });
    }

    public editPatient(patient: Patient) {
        this.httpService.model = patient;
        this.httpService.otherSettings = {
            buttonName: 'Update',
            showMsg: false,
            infoMsg: 'Record Updated Successfully',
            onSubmitUrl: 'update'
        };
        this.router.navigateByUrl("dashboard/(dashboard-menu:patient/(patient-body:add))")
    }

}
