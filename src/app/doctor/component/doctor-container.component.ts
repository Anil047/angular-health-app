/**
 * Created by anil on 3/19/17.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'doctor-component',
    templateUrl: 'resources/pages/doctor/doctor-container.html'
})

export class DoctorContainerComponent {
    constructor(private router: Router) {
    }

    buttonClick(event, buttonType): void {
        event.preventDefault();
        if (buttonType == 'add') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:doctor/(doctor-container:add))")
        } else if (buttonType == 'list') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:doctor/(doctor-container:list))")
        }
    }
}