import {Component, Input} from '@angular/core';
import {FileService} from "../file.service";

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent {

    @Input() path!: string
    @Input() file!: string;

    constructor(public fileService: FileService) {
    }
}
