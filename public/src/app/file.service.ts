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
        this.http.get("http://localhost:3000/files").subscribe((data) => {
            this.root = data as Dir;
        })
    }

    public delete(path: string, file: string) {
        this.http.delete("http://localhost:3000/file/" + path + file).subscribe(() => this.updateFiles());
    }

    onDrop(event: DragEvent, path: string) {

        console.log("huff");

        event.preventDefault()

        this.form.get('profile')!.setValue(event.dataTransfer!.files[0]);
        const formData = new FormData();
        formData.append('profile', this.form.get('profile')!.value);

        this.http.post<any>("http://localhost:3000/file/file/" + path, formData).subscribe(() => this.updateFiles());
    }

    onHover(event: DragEvent) {
        event.preventDefault();
    }

    addDir(path: string, dirName: string) {
        this.http.post("http://localhost:3000/file/dir/" + path + dirName, {}).subscribe(() => this.updateFiles());
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
