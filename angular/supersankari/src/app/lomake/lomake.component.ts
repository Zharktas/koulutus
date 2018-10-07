import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lomake',
  templateUrl: './lomake.component.html',
  styleUrls: ['./lomake.component.css']
})
export class LomakeComponent implements OnInit {

  nimi: string;
  supersankari: string;
  vaihtoehdot: string[];

  @Output() valmis = new EventEmitter<any>();



  constructor() {
  }

  ngOnInit() {
      this.vaihtoehdot = ["Superhessu", "Wonder woman", "Teräsmies"];
  }

  laheta(){
    this.valmis.emit({
      nimi: this.nimi,
      supersankari: this.supersankari
    });

  }
}
