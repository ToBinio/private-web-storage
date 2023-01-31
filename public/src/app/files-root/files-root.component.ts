import {Component} from '@angular/core';
import {FileService} from "../file.service";

@Component({
    selector: 'app-files-root',
    templateUrl: './files-root.component.html',
    styleUrls: ['./files-root.component.scss']
})
export class FilesRootComponent {
    dirName: string = ""

    constructor(public filesService: FileService) {
    }
}
