import "./app/utils/rxjs-extensions";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {HttpModule} from "@angular/http";
import {AppRoutes} from "./app.routes";
import {DashboardComponent} from "./app/dashboard/component/dashboard.component";
import {PatientContainerComponent} from "./app/patient/component/patient-container.component";
import {PatientFormComponent} from "./app/patient/component/patient-form.component";
import {DataTableModule} from "angular2-datatable";
import {PatientDatatableComponent} from "./app/patient/component/patient-datatable.component";
import {DataFilterPipe} from "./app/utils/pipe/data-filter.pipe";
import {CommonModule} from "@angular/common";
import {PatientService} from "./app/patient/service/patient.service";
import {LoginComponent} from "./app/login/component/login.component";
import {AuthenticationService} from "./app/login/service/authentication.service";
import {AppGuard} from "./app/login/service/app-guard.service";
import {BedContainerComponent} from "./app/bed/component/bed-container.component";
import {BedFormComponent} from "./app/bed/component/bed-form.component";
import {HttpService} from "./app/patient/service/http.service";
import {BedDatatableComponent} from "./app/bed/component/bed-datatable.component";
import {BedDataFilterPipe} from "./app/utils/pipe/bed-data-filter.pipe";
import {DoctorContainerComponent} from "./app/doctor/component/doctor-container.component";
import {DoctorDatatableComponent} from "./app/doctor/component/doctor-datatable.component";
import {DoctorFormComponent} from "./app/doctor/component/doctor-form.component";
import {VisitContainerComponent} from "./app/visit/component/visit-container.component";
import {VisitFormComponent} from "./app/visit/component/visit-form.component";
import {VisitDatatableComponent} from "./app/visit/component/visit-datatable.component";
import {VisitDataFilterPipe} from "./app/utils/pipe/visit-data-filter.pipe";
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpModule,
        DataTableModule,
        AppRoutes

    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        PatientContainerComponent,
        PatientFormComponent,
        PatientDatatableComponent,
        DataFilterPipe,
        BedDataFilterPipe,
        LoginComponent,
        BedContainerComponent,
        BedFormComponent,
        BedDatatableComponent,
        DoctorContainerComponent,
        DoctorDatatableComponent,
        DoctorFormComponent,
        VisitContainerComponent,
        VisitFormComponent,
        VisitDatatableComponent,
        VisitDataFilterPipe
       // UpperCasePipe
    ],
    providers:[
        PatientService, AuthenticationService, AppGuard, HttpService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }