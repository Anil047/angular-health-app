import {Doctor} from "../../doctor/model/doctor.model";
import {Bed} from "../../bed/model/bed.model";
import {Patient} from "../../patient/model/patient.model";
/**
 * Created by anil on 3/20/17.
 */
export class Visit {
    id: number;
    patientType: number = 0;
    doctor: Doctor = new Doctor();
    bed: Bed = new Bed();
    patient: Patient = new Patient();
    dateOfVisit: Date;
    dateOfDischarge: Date;
    symptoms: string;
    disease: string;
    treatment: string;
}