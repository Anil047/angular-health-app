import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Response} from "@angular/http";
import {Doctor} from "../model/doctor.model";
import {HttpService} from "../../patient/service/http.service";
/**
 * Created by anil on 3/13/17.
 */

@Component({
    selector: 'Doctor-dataTable',
    templateUrl: 'resources/pages/doctor/doctor-datatable.html',
})
export class DoctorDatatableComponent implements OnInit {
    public data: Doctor[] = [];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
    private url = HealthAppConstants.ROOT_URL + "Doctor/";

    constructor(private httpService: HttpService, private router: Router) {
    }

    getDoctorList(): void {
        this.httpService.getAllRows(this.url + "list").subscribe(
            response => this.data = response
        );
    }

    ngOnInit(): void {
        this.httpService.clearFields();
        this.getDoctorList();
    }

    public removeDoctor(doctor: Doctor, rowNum) {
        this.httpService.deleteRow(this.url + `${doctor.id}`)
            .subscribe(
                (res: Response) => {
                    if (res.statusText.toString().toLowerCase() == "ok") {
                        let index1 = this.data.indexOf(doctor);
                        this.data.splice(index1, 1);
                    }

                    // console.log("Delete Response: "+res.statusText)
                });
    }

    public editDoctor(doctor: Doctor) {
        this.httpService.model = doctor;
        this.httpService.otherSettings = {
            buttonName: 'Update',
            showMsg: false,
            infoMsg: 'Record Updated Successfully',
            onSubmitUrl: 'update'
        };
        this.router.navigateByUrl("dashboard/(dashboard-menu:doctor/(doctor-container:add))")
    }


}
