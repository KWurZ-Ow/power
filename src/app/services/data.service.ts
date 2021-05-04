import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  enregistrerOrdres(couleur: string, ordres:any) {
    this.httpClient
      .put('https://power-7212d-default-rtdb.europe-west1.firebasedatabase.app/ordres'+ couleur +'.json', ordres)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getOrdres(roue:string) {
    return this.httpClient.get<any[]>('https://power-7212d-default-rtdb.europe-west1.firebasedatabase.app/ordres'+ roue +'.json');
  }

}
