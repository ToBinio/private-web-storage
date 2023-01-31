import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { FilesRootComponent } from './files-root/files-root.component';
import { DirComponent } from './dir/dir.component';
import { FileComponent } from './file/file.component';

@NgModule({
    declarations: [
        AppComponent,
        FilesRootComponent,
        DirComponent,
        FileComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
