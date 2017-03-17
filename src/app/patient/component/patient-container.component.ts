import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {PatientService} from "../service/patient.service";
import {Patient} from "../model/patient.model";
/**
 * Created by anil on 3/8/17.
 */
@Component({
    selector:'patient-cotainer',
    templateUrl:'../../../../resources/pages/Patient/patient-container.html'
})
export class PatientContainerComponent{
    constructor(
        private router:Router, private patientService:PatientService ){}
    buttonClick(event,buttonType):void {
        event.preventDefault();
        if(buttonType=='add'){
            this.patientService.patient=new Patient();
            this.router.navigateByUrl("dashboard/(dashboard-menu:patient/(patient-body:add))")
        }else if(buttonType=='list'){
            this.router.navigateByUrl("dashboard/(dashboard-menu:patient/(patient-body:list))")
        }
    }
}