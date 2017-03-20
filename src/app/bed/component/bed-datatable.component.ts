import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Response} from "@angular/http";
import {Bed} from "../model/bed.model";
import {HttpService} from "../../patient/service/http.service";
/**
 * Created by anil on 3/13/17.
 */

@Component({
    selector: 'Bed-form',
    templateUrl: 'resources/pages/bed/bed-datatable.html',
})
export class BedDatatableComponent implements OnInit {
    public data: Bed[] = [];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "bedName";
    public sortOrder = "asc";
    private url = HealthAppConstants.ROOT_URL + "bed/";

    constructor(private httpService: HttpService, private router: Router) {
    }

    getBedList(): void {
        this.httpService.getAllRows(this.url + "list").subscribe(
            response => this.data = response
        );
    }

    ngOnInit(): void {
        this.httpService.clearFields();
        this.getBedList();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public removeBed(bed: Bed, rowNum) {
        this.httpService.deleteRow(this.url + `${bed.id}`)
            .subscribe(
                (res: Response) => {
                    if (res.statusText.toString().toLowerCase() == "ok") {
                        let index1 = this.data.indexOf(bed);
                        this.data.splice(index1, 1);
                    }

                    // console.log("Delete Response: "+res.statusText)
                });
    }

    public editBed(bed: Bed) {
        this.httpService.model = bed;
        this.httpService.otherSettings = {
            buttonName: 'Update',
            showMsg: false,
            infoMsg: 'Record Updated Successfully',
            onSubmitUrl: 'update'
        };
        this.router.navigateByUrl("dashboard/(dashboard-menu:bed/(bed-container:add))")
    }


}
