import { Component, ViewChild } from '@angular/core';
import { DataService } from './services/data.service'

import { TuloksetComponent } from './tulokset/tulokset.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  supersankari: string;

  @ViewChild(TuloksetComponent) tulokset: TuloksetComponent;

  constructor(private dataService: DataService) { }

  onValmis($event){
      this.supersankari = $event.supersankari;
      this.dataService.postSupersankari(
        $event.nimi,
        $event.supersankari
      ).then(() => {
        console.log("tallennus onnistui");
        this.tulokset.paivitaTulokset();
      })
  }
}
