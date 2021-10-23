import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShearchGIFResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = 'qmESO4yCfeXBwA3kPZhz752MoGOQDeHO';
  private servicioURL: string = 'http://api.giphy.com/v1/gifs';
  
  private _historial:string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor (
    private http:HttpClient,
  ) {


    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }





  buscarGifs( query:string) {
    
    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.slice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }


    const params = new HttpParams()
                    .set('api_key', this.apikey)
                    .set('limit','10')
                    .set('q',query);

    this.http.get<ShearchGIFResponse>(`${this.servicioURL}/search`,{params})
    .subscribe( (respuesta) => {
      // console.log(respuesta.data);
      this.resultados = respuesta.data;
      localStorage.setItem( 'resultados' , JSON.stringify(this.resultados) );


    })
    

  }

}
