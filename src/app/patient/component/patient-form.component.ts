import {Component, OnInit} from "@angular/core";
import {Patient} from "../model/patient.model";
import {PatientService} from "../service/patient.service";

/**
 * Created by anil on 3/8/17.
 */
@Component({
    selector:'patient-form',
    templateUrl:'../../../../resources/pages/Patient/patient-form.html',
})
export class PatientFormComponent implements OnInit{
    ngOnInit(): void {
        this.patient = this.patientService.patient;
    }
    constructor(private patientService:PatientService){}
    patient:Patient = new Patient();
    files:FileList;

    onFileChange(event):void{
        this.files=event.target.files;
    }

    encodeToBase64(file:File, patient:Patient, patientService:PatientService) {

        if (file) {
            var reader = new FileReader();
            reader.onload = function () {
                let encodedContents = reader.result;
                patient.encodedFileInString = btoa(encodedContents);
                if(reader.readyState){
                    console.log(" this.patient.encodedFileInString :"+ patient.encodedFileInString);
                    patientService.create("http://localhost:8080/Patient/add",patient);
                }
               // return patient;
            };
            reader.readAsBinaryString(file);
            //return reader.result;
        }
        //return patient;


    }

    onSubmit(event):void{
        event.preventDefault();
        let fileCheck:boolean = false;
        if(this.files){
            if(this.files.length>0) {
                fileCheck=true;
                var reader = new FileReader();
                let imageFile: File = this.files[0];
                let imagefileName: string = imageFile.name;
                this.patient.extensionOfFile = '.' + imagefileName.substr(imagefileName.lastIndexOf('.') + 1);
                this.encodeToBase64(imageFile, this.patient, this.patientService);
            }

        }
        if(!fileCheck) {
            this.patient.encodedFileInString = "";
            this.patientService.create("http://localhost:8080/Patient/add", this.patient);
        }


    }

}
