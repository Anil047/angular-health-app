import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./app/dashboard/component/dashboard.component";
import {NgModule} from "@angular/core";
import {PatientContainerComponent} from "./app/patient/component/patient-container.component";
import {PatientFormComponent} from "./app/patient/component/patient-form.component";
import {PatientDatatableComponent} from "./app/patient/component/patient-datatable.component";
import {LoginComponent} from "./app/login/component/login.component";
import {AppGuard} from "./app/login/service/app-guard.service";
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
    ]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutes{}
