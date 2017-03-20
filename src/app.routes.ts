import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./app/dashboard/component/dashboard.component";
import {NgModule} from "@angular/core";
import {PatientContainerComponent} from "./app/patient/component/patient-container.component";
import {PatientFormComponent} from "./app/patient/component/patient-form.component";
import {PatientDatatableComponent} from "./app/patient/component/patient-datatable.component";
import {LoginComponent} from "./app/login/component/login.component";
import {AppGuard} from "./app/login/service/app-guard.service";
import {BedContainerComponent} from "./app/Bed/component/bed-container.component";
import {BedFormComponent} from "./app/Bed/component/bed-form.component";
import {BedDatatableComponent} from "./app/Bed/component/bed-datatable.component";
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
    ]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutes{}
