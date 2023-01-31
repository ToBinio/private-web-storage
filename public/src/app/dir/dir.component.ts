import {Component, Input, OnInit} from '@angular/core';
import {Dir, FileService} from "../file.service";

@Component({
    selector: 'app-dir',
    templateUrl: './dir.component.html',
    styleUrls: ['./dir.component.scss']
})
export class DirComponent implements OnInit {

    @Input() dir!: Dir
    @Input() path!: string;

    dirName: string = ""

    constructor(public fileService: FileService) {
    }

    ngOnInit(): void {
    }
}
