import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';

import { MatButtonModule, MatInputModule, MatRadioModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LomakeComponent } from './lomake/lomake.component';
import { TuloksetComponent } from './tulokset/tulokset.component';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LomakeComponent,
    TuloksetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
