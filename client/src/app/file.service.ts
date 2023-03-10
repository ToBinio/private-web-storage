import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    public root!: Dir;
    form!: FormGroup;

    constructor(private http: HttpClient, private fb: FormBuilder) {
        this.updateFiles()

        this.form = this.fb.group({
            profile: ['']
        });
    }

    public updateFiles() {
        this.http.get("/files").subscribe((data) => {
            this.root = data as Dir;
        })
    }

    public rootHasLoaded(): boolean {
        return this.root != undefined;
    }

    public delete(path: string, file: string) {

        if (!confirm("You Shure you want to delete " + path + file))
            return

        this.http.delete("/file/" + path + file).subscribe(() => this.updateFiles());
    }

    onDrop(event: DragEvent, path: string) {

        console.log("huff");

        event.preventDefault()

        this.form.get('profile')!.setValue(event.dataTransfer!.files[0]);
        const formData = new FormData();
        formData.append('profile', this.form.get('profile')!.value);

        this.http.post<any>("/file/file/" + path, formData).subscribe(() => this.updateFiles());
    }

    onHover(event: DragEvent) {
        event.preventDefault();
    }

    addDir(path: string) {

        let dirName = prompt("enter Dir name");

        this.http.post("/file/dir/" + path + dirName, {}).subscribe(() => this.updateFiles());
    }

    trackerFile(index: number, file: string) {
        return file;
    }

    trackerDir(index: number, dir: Dir) {
        return dir.name;
    }
}

export interface Dir {
    name: string
    files: string[],
    dirs: Dir[]
}
