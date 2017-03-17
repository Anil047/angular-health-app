import {Component, OnInit} from "@angular/core";
import {PatientService} from "../service/patient.service";
import {Patient} from "../model/patient.model";
import {Router} from "@angular/router";
import {HealthAppConstants} from "../../utils/HealthAppConstants";
import {Response} from "@angular/http";
import {error} from "util";
/**
 * Created by anil on 3/13/17.
 */

@Component({
    selector: 'patient-form',
    templateUrl: '../../../../resources/pages/Patient/patient-datatable.html',
})
export class PatientDatatableComponent implements OnInit {
    public data:Patient[] = [];
    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "name";
    public sortOrder = "asc";
    public filePath = HealthAppConstants.FILE_PATH;

    constructor(private patientService: PatientService, private router:Router) {
    }

    getPatientList(): void {
        this.patientService.getPatientList().subscribe(
            response => this.data = response
        );
    }

    ngOnInit(): void {
        this.getPatientList();
    }

    public toInt(num: string) {
        return +num;
    }

    public sortByWordLength = (a: any) => {
        return a.city.length;
    }

    public removePatient(patient:Patient,rowNum){
         this.patientService.delete(patient.id)
             .subscribe(
                 (res:Response)=>{
                     if(res.statusText.toString().toLowerCase()=="ok"){
                         let index1= this.data.indexOf(patient);
                         this.data.splice(index1,1);
                     }

                    // console.log("Delete Response: "+res.statusText)
         });
    }

    public editPatient(patient:Patient){
        this.patientService.patient=patient;
        this.router.navigateByUrl("dashboard/(dashboard-menu:patient/(patient-body:add))");
    }


}
