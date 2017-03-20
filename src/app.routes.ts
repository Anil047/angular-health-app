import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./app/dashboard/component/dashboard.component";
import {NgModule} from "@angular/core";
import {PatientContainerComponent} from "./app/patient/component/patient-container.component";
import {PatientFormComponent} from "./app/patient/component/patient-form.component";
import {PatientDatatableComponent} from "./app/patient/component/patient-datatable.component";
import {LoginComponent} from "./app/login/component/login.component";
import {AppGuard} from "./app/login/service/app-guard.service";
import {BedContainerComponent} from "./app/bed/component/bed-container.component";
import {BedFormComponent} from "./app/bed/component/bed-form.component";
import {BedDatatableComponent} from "./app/bed/component/bed-datatable.component";
import {DoctorContainerComponent} from "./app/doctor/component/doctor-container.component";
import {DoctorFormComponent} from "./app/doctor/component/doctor-form.component";
import {DoctorDatatableComponent} from "./app/doctor/component/doctor-datatable.component";
import {VisitContainerComponent} from "./app/visit/component/visit-container.component";
import {VisitFormComponent} from "./app/visit/component/visit-form.component";
import {VisitDatatableComponent} from "./app/visit/component/visit-datatable.component";
/**
 * Created by anil on 3/8/17.
 */

const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent, canActivate: [AppGuard], children:[
        {path:'patient',component:PatientContainerComponent,outlet:'dashboard-menu',children:[
            {path:'add',component:PatientFormComponent, outlet:'patient-body'},
            {path:'list',component:PatientDatatableComponent, outlet:'patient-body'}
        ]},
        {
            path: 'bed', component: BedContainerComponent, outlet: 'dashboard-menu', children: [
            {path: 'add', component: BedFormComponent, outlet: 'bed-container'},
            {path: 'list', component: BedDatatableComponent, outlet: 'bed-container'}
        ]
        },
        {
            path: 'doctor', component: DoctorContainerComponent, outlet: 'dashboard-menu', children: [
            {path: 'add', component: DoctorFormComponent, outlet: 'doctor-container'},
            {path: 'list', component: DoctorDatatableComponent, outlet: 'doctor-container'}
        ]
        },
        {
            path: 'visit', component: VisitContainerComponent, outlet: 'dashboard-menu', children: [
            {path: 'add', component: VisitFormComponent, outlet: 'visit-container'},
            {path: 'list', component: VisitDatatableComponent, outlet: 'visit-container'}
        ]
        },
    ]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutes{}
