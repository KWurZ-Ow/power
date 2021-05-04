import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tel',
  templateUrl: './tel.component.html',
  styleUrls: ['./tel.component.scss']
})
export class TelComponent implements OnInit {

  public isAuth = false;
  public nom!:string;
  public couleur!:string;

  auth(){
    this.isAuth = true;
  }

  public ordre1a: string = '';
  public ordre1b: string = '';
  public ordre1c: string = '';

  public ordre2a: string = '';
  public ordre2b: string = '';
  public ordre2c: string = '';

  public ordre3a: string = '';
  public ordre3b: string = '';
  public ordre3c: string = '';

  public ordre4a: string = '';
  public ordre4b: string = '';
  public ordre4c: string = '';

  public ordre5a: string = '';
  public ordre5b: string = '';
  public ordre5c: string = '';

  private ordres = [
    {
      a: '',
      b: '',
      c: ''
    },
    {
      a: '',
      b: '',
      c: ''
    },
    {
      a: '',
      b: '',
      c: ''
    },
    {
      a: '',
      b: '',
      c: ''
    },
    {
      a: '',
      b: '',
      c: '',
      nom: 'Default'
    }
  ];

  reset(){
    this.ordre1a = '';
    this.ordre1b = '';
    this.ordre1c = '';

    this.ordre2a = '';
    this.ordre2b = '';
    this.ordre2c = '';

    this.ordre3a = '';
    this.ordre3b = '';
    this.ordre3c = '';

    this.ordre4a = '';
    this.ordre4b = '';
    this.ordre4c = '';

    this.ordre5a = '';
    this.ordre5b = '';
    this.ordre5c = '';
  }
  onSave(){
    this.ordres[0].a = this.ordre1a.toLowerCase();
    this.ordres[0].b = this.ordre1b.toLowerCase();
    this.ordres[0].c = this.ordre1c.toLowerCase();
    
    this.ordres[1].a = this.ordre2a.toLowerCase();
    this.ordres[1].b = this.ordre2b.toLowerCase();
    this.ordres[1].c = this.ordre2c.toLowerCase();

    this.ordres[2].a = this.ordre3a.toLowerCase();
    this.ordres[2].b = this.ordre3b.toLowerCase();
    this.ordres[2].c = this.ordre3c.toLowerCase();

    this.ordres[3].a = this.ordre4a.toLowerCase();
    this.ordres[3].b = this.ordre4b.toLowerCase();
    this.ordres[3].c = this.ordre4c.toLowerCase();

    this.ordres[4].a = this.ordre5a.toLowerCase();
    this.ordres[4].b = this.ordre5b.toLowerCase();
    this.ordres[4].c = this.ordre5c.toLowerCase();
    this.ordres[4].nom = this.nom.substring(0,1).toUpperCase() + this.nom.substring(1,this.nom.length).toLowerCase();

    this.DataService.enregistrerOrdres(this.couleur, this.ordres);
  }

  constructor(private DataService:DataService) { }

  ngOnInit(): void {
  }

}
