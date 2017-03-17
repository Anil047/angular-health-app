/**
 * Created by anil on 3/8/17.
 */
import './app/utils/rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import {AppRoutes} from "./app.routes";
import {DashboardComponent} from "./app/dashboard/component/dashboard.component";
import {PatientContainerComponent} from "./app/patient/component/patient-container.component";
import {PatientFormComponent} from "./app/patient/component/patient-form.component";
import {DataTableModule} from "angular2-datatable";
import {PatientDatatableComponent} from "./app/patient/component/patient-datatable.component";
import {DataFilterPipe} from "./app/utils/pipe/data-filter.pipe";
import {UpperCasePipe, CommonModule} from "@angular/common";
import {PatientService} from "./app/patient/service/patient.service";
import {LoginComponent} from "./app/login/component/login.component";
import {AuthenticationService} from "./app/login/service/authentication.service";
import {AppGuard} from "./app/login/service/app-guard.service";
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
        LoginComponent
       // UpperCasePipe
    ],
    providers:[
        PatientService,AuthenticationService,AppGuard
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }