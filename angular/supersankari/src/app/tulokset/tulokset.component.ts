import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-tulokset',
  templateUrl: './tulokset.component.html',
  styleUrls: ['./tulokset.component.css']
})
export class TuloksetComponent implements OnInit {

  @Input() supersankari;

  tuloslista: any[];
  labels;
  datasets;
  options = {
    maintainAspectRatio: false,
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.paivitaTulokset();
  }

  public paivitaTulokset() {
    this.dataService.haeTulokset().then((response) => {
      this.asetaTulokset(response.json());
    });
  }

  private asetaTulokset(tulokset) {
    this.tuloslista = [];
    for (let t in tulokset) {
      this.tuloslista.push([t, tulokset[t]]);
    }

    let newLabels: string[] = [];
    let newData: number[] = [];


    //Object.keys(tulokset).sort().forEach(function(key) {
    //  ordered[key] = tulokset[key];
    //});

    let orderedByKey = {};
    orderedByKey = Object.keys(tulokset).sort(function(a, b){
      return tulokset[a] - tulokset[b];
    });

    console.log("ordered", orderedByKey);
    let orderedByValue = {};
    orderedByValue = Object.keys(tulokset).sort(function(a, b){
      return tulokset[a] - tulokset[b];
    }).map(key => tulokset[key]);

    console.log(orderedByValue)
    for (let k in orderedByKey) {
      newData.push(orderedByValue[k]);
      newLabels.push(orderedByKey[k]);
    }

    this.datasets = [
    {data: newData, label: "Suosikit"}
    ];
    this.labels = newLabels;
  }

}
