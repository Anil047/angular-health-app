/**
 * Created by anil on 3/19/17.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'bed-component',
    templateUrl: 'resources/pages/bed/bed-container.html'
})

export class BedContainerComponent {
    constructor(private router: Router) {
    }

    buttonClick(event, buttonType): void {
        event.preventDefault();
        if (buttonType == 'add') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:bed/(bed-container:add))")
        } else if (buttonType == 'list') {
            this.router.navigateByUrl("dashboard/(dashboard-menu:bed/(bed-container:list))")
        }
    }
}