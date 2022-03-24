import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  /* Instead ENv  I used Common URL here  */
  URL = 'https://jsonplaceholder.typicode.com';

  /* Common endpoints Object */
  API = {
    GET_TITLES: '/posts',
  };

  constructor(public _http: HttpClient) {}

  /*  GET HTTP */
  getTitles() {
    const url = this.URL + this.API.GET_TITLES;
    return this._http.get(url);
  }

  /*  POST HTTP */
  addTitle(body: any, id?:any){
    const url = this.URL + this.API.GET_TITLES + (id ? `/${id}` : '');
    return this._http.post(url, body);
  }

  /* Pacth HTTP */
  UpdateTitle(body: any, id?:any){
    const  headers = new HttpHeaders({
      'Content-Type': 'aapplication/json',
      'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept ',
    })
    const url = this.URL + this.API.GET_TITLES + (id ? `/${id}` : '');
    return this._http.patch(url, body,{headers} );
  }

/* Delete HTTP */
  deleteTitle(id: any){
    const url = this.URL + this.API.GET_TITLES + (id ? `/${id}` : '');
    return this._http.delete(url);
  }

}
