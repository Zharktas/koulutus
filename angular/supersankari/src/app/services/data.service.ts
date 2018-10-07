import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public postSupersankari(nimi: string, supersankari: string): Promise<Response> {
    return this.http.post( '/supersankari',
      {nimi: nimi, supersankari: supersankari}
    ).toPromise();
  }

  public haeTulokset() {
    return this.http.get('/tulokset').toPromise();
  }
}
