import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Response} from "@angular/http";
import {Visit} from "../model/visit.model";
import {HttpService} from "../../patient/service/http.service";
/**
 * Created by anil on 3/13/17.
 */

@Component({
    selector: 'Visit-form',
    templateUrl: 'resources/pages/visit/visit-datatable.html',
})
export class VisitDatatableComponent implements OnInit {
    public data: Visit[] = [];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "patientName";
    public sortOrder = "asc";
    private url = HealthAppConstants.ROOT_URL + "Visit/";

    constructor(private httpService: HttpService, private router: Router) {
    }

    getVisitList(): void {
        this.httpService.getAllRows(this.url + "list").subscribe(
            response => this.data = response
        );
    }

    ngOnInit(): void {
        this.httpService.clearFields();
        this.getVisitList();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public removeVisit(visit: Visit, rowNum) {
        this.httpService.deleteRow(this.url + `${visit.id}`)
            .subscribe(
                (res: Response) => {
                    if (res.statusText.toString().toLowerCase() == "ok") {
                        let index1 = this.data.indexOf(visit);
                        this.data.splice(index1, 1);
                    }

                    // console.log("Delete Response: "+res.statusText)
                });
    }

    public editVisit(visit: Visit) {
        this.httpService.model = visit;
        this.httpService.otherSettings = {
            buttonName: 'Update',
            showMsg: false,
            infoMsg: 'Record Updated Successfully',
            onSubmitUrl: 'update'
        };
        this.router.navigateByUrl("dashboard/(dashboard-menu:visit/(visit-container:add))")
    }


}
