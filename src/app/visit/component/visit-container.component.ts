/**
 * Created by anil on 3/19/17.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'visit-component',
    templateUrl: 'resources/pages/visit/visit-container.html'
})

export class VisitContainerComponent {
    constructor(private router: Router) {
    }

    buttonClick(event, buttonType): void {
        event.preventDefault();
        if (buttonType == 'add') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:visit/(visit-container:add))")
        } else if (buttonType == 'list') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:visit/(visit-container:list))")
        }
    }
}