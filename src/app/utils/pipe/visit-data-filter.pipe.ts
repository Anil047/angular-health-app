import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "visitDataFilter"
})
export class VisitDataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.patient.name.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}