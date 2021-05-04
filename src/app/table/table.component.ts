import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  x = 50;
  y = 50;
  transla = 0;

  ordres$?: Observable<any>;
  logs$?: Observable<any>;
  roue = 1;
  getordres = 'v';

  ordrea: string = '';
  ordreb: string = '';
  ordrec: string = '';
  ordred: string = '';
  ordreSpelled?: Array<any>;
  logs!: Array<string>;

  ordres: any;
  pieces!: any;

  validation = [{ 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }];
  ordresEmpty = [{ a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '' }, { a: '', b: '', c: '', nom: 'En attente' }];
  ordre = {
    a: '',
    b: '',
    c: ''
  };

  positions = [
    ['vhq', '4', '4'],
    ['bhq', '96', '4'],
    ['jhq', '96', '96'],
    ['rhq', '4', '96'],
    ['ix', '50', '50'],
    ['in', '50', '4'],
    ['ie', '96', '50'],
    ['is', '50', '96'],
    ['iw', '4', '50']
  ];

  //        *************************************
  //        *                                   *
  //        *           fonctions               *
  //        *                                   *
  //        *************************************

  reset() {
    this.DataService.enregistrerOrdres('v', this.ordresEmpty);
    this.DataService.enregistrerOrdres('b', this.ordresEmpty);
    this.DataService.enregistrerOrdres('j', this.ordresEmpty);
    this.DataService.enregistrerOrdres('r', this.ordresEmpty);
    this.validation = [{ 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }, { 1: false, 2: false, 3: false, 4: false, 5: false }];
    this.roue = 1;
    this.executerOrdre(null, "fin");
    setTimeout(() => { this.onFetch() }, 100);
  }
  validateur(ordre: number, roue: number) {
    if (ordre == 1 || ordre == 2 || ordre == 3 || ordre == 4 || ordre == 5) {
      this.validation[roue][ordre] = true;
    } else {
      console.error("erreur dans la validation");
    }
  }
  estValide(ordre: number, roue: number) {
    if (ordre == 1 || ordre == 2 || ordre == 3 || ordre == 4 || ordre == 5) {
      if (this.validation[roue][ordre] == true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onFetch() {
    if (this.roue == 1) { this.getordres = 'v' };
    if (this.roue == 2) { this.getordres = 'b' };
    if (this.roue == 3) { this.getordres = 'j' };
    if (this.roue == 4) { this.getordres = 'r' };
    this.ordres$ = this.DataService.getOrdres(this.getordres)
    this.ordres$?.subscribe(
      (value) => {
        this.ordres = value;
      }
    )

  }
  next() {
    this.roue++;
  }
  prev() {
    this.roue--;
  }

  envoyerOrdre() {
    this.ordre.a = this.ordrea.toLowerCase();
    this.ordre.b = this.ordreb.toLowerCase();
    this.ordre.c = this.ordrec.toLowerCase();
    var couleur = this.ordred.toLowerCase();
    if (couleur == "v") { couleur = 'Vert' }
    if (couleur == "b") { couleur = 'Bleu' }
    if (couleur == "j") { couleur = 'Jaune' }
    if (couleur == "r") { couleur = 'Rouge' }
    this.ordrea = '';
    this.ordreb = '';
    this.ordrec = '';
    this.ordred = '';
    this.executerOrdre(this.ordre, couleur);
  }
  validerOrdre(ordre: number, roue: number) {
    var ordrea = this.ordres[ordre - 1].a
    var ordreb = this.ordres[ordre - 1].b
    var ordrec = this.ordres[ordre - 1].c
    var couleur = "pardon ?";
    this.ordre = {
      a: ordrea,
      b: ordreb,
      c: ordrec
    }
    if (roue == 0) { couleur = 'Vert' };
    if (roue == 1) { couleur = 'Bleu' };
    if (roue == 2) { couleur = 'Jaune' };
    if (roue == 3) { couleur = 'Rouge' };

    this.executerOrdre(this.ordre, couleur)
  }
  nouvellePartie() {
    this.pieces = [
      ["Soldat", "Vert", "VHQ", 2],
      ["Tank", "Vert", "VHQ", 2],
      ["Chasseur", "Vert", "VHQ", 2],
      ["Destroyer", "Vert", "VHQ", 2],

      ["Soldat", "Bleu", "BHQ", 2],
      ["Tank", "Bleu", "BHQ", 2],
      ["Chasseur", "Bleu", "BHQ", 2],
      ["Destroyer", "Bleu", "BHQ", 2],

      ["Soldat", "Jaune", "JHQ", 2],
      ["Tank", "Jaune", "JHQ", 2],
      ["Chasseur", "Jaune", "JHQ", 2],
      ["Destroyer", "Jaune", "JHQ", 2],

      ["Soldat", "Rouge", "RHQ", 2],
      ["Tank", "Rouge", "RHQ", 2],
      ["Chasseur", "Rouge", "RHQ", 2],
      ["Destroyer", "Rouge", "RHQ", 2],
    ]
    this.deleteLogs();
    setTimeout(() => {
      this.updateCase('VHQ');
      this.updateCase('bhq');
      this.updateCase('jhq');
      this.updateCase('rhq');
    }, 200);

  }
  executerOrdre(ordre: any, couleur: string) {
    var piece: string = "unknown";
    var depart: string = "unknown";
    var arrivee: string = "unknown";
    var amount: number = 0;
    if (couleur == "fin") {
      this.ordreSpelled = [["- - -   fin du tour   - - -", "Gris"]];
    } else if (couleur.substring(0, 1) == "c") {

      //        *************************************
      //        *                                   *
      //        *        création de pièce          *
      //        *                                   *
      //        *************************************


      var coul = "Incolore";
      if (couleur.substring(1, 2) == "v") { coul = "Vert" }
      if (couleur.substring(1, 2) == "b") { coul = "Bleu" }
      if (couleur.substring(1, 2) == "j") { coul = "Jaune" }
      if (couleur.substring(1, 2) == "r") { coul = "Rouge" }
      var truc;
      if (ordre.b == "s") { truc = "Soldat" }
      if (ordre.b == "t") { truc = "Tank" }
      if (ordre.b == "c") { truc = "Chasseur" }
      if (ordre.b == "d") { truc = "Destroyer" }
      if (ordre.b == "r") { truc = "Régiment" }
      if (ordre.b == "a") { truc = "Char d'Assaut" }
      if (ordre.b == "b") { truc = "Bombardier" }
      if (ordre.b == "cr") { truc = "Croiseur" }
      if (ordre.b == "p") { truc = "Power" }
      var pos = ordre.c.toUpperCase();
      var combien = parseInt(ordre.a, 10);

      var existe = false;
      for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces
        if (this.pieces[i][0] == truc && this.pieces[i][1] == coul && this.pieces[i][2] == pos) {
          existe = true;
          this.pieces[i][3] = this.pieces[i][3] + combien;
          break
        }
      }
      if (!existe) {
        this.pieces.push([truc, coul, pos, combien])

      }
      this.ordreSpelled = [["création de " + combien + " " + truc + "s " + coul + "s en " + pos, "Noir"]];

    } else if (couleur.substring(0, 1) == "d") {

      //        *************************************
      //        *                                   *
      //        *       suppression de pièce        *
      //        *                                   *
      //        *************************************

      var truc;
      if (ordre.b == "s") { truc = "Soldat" }
      if (ordre.b == "t") { truc = "Tank" }
      if (ordre.b == "c") { truc = "Chasseur" }
      if (ordre.b == "d") { truc = "Destroyer" }
      if (ordre.b == "r") { truc = "Régiment" }
      if (ordre.b == "a") { truc = "Char d'Assaut" }
      if (ordre.b == "b") { truc = "Bombardier" }
      if (ordre.b == "cr") { truc = "Croiseur" }
      if (ordre.b == "p") { truc = "Power" }
      var coul = "Incolore";
      var pos = ordre.c.toUpperCase();
      if (couleur.substring(1, 2) == "v") { coul = "Vert" }
      if (couleur.substring(1, 2) == "b") { coul = "Bleu" }
      if (couleur.substring(1, 2) == "j") { coul = "Jaune" }
      if (couleur.substring(1, 2) == "r") { coul = "Rouge" }

      if (ordre.a == "a") {//supprimer tout

        var existe = false;
        for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces
          if (this.pieces[i][0] == truc && this.pieces[i][1] == coul && this.pieces[i][2] == pos) {
            existe = true;
            this.pieces.splice(i, 1);//suppression de la ligne du tableau
            break
          }
        }
        if (existe) {
          this.ordreSpelled = [["Suppression de tous les " + truc + "s " + coul + " sur la case " + pos, "Noir"]];

        } else {
          this.ordreSpelled = [["impossible de supprimer tout", "RougeErr"]];
        }

      } else {//supprimer une seule pièce (ou plus :D)
        var combien = parseInt(ordre.a, 10);

        var existe = false;
        for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces
          if (this.pieces[i][0] == truc && this.pieces[i][1] == coul && this.pieces[i][2] == pos) {
            existe = true;

            if (this.pieces[i][3] == combien) {//si ça supprime tout
              this.pieces.splice(i, 1);//suppression de la ligne du tableau
            } else {
              this.pieces[i][3] = this.pieces[i][3] - combien;//on enleve les pièces
            }
            break
          }
        }
        if (existe) {
          this.ordreSpelled = [["Suppression de " + combien + " " + truc + "s " + coul + " sur la case " + pos]];

        } else {
          this.ordreSpelled = [["impossible de supprimer", "RougeErr"]];
        }
      }


    } else if (couleur.substring(0, 1) == "t") {

      //        *************************************
      //        *                                   *
      //        *     transformation de pièce       *
      //        *                                   *
      //        *************************************

      var truc;
      if (ordre.a == "s") { truc = "Soldat" }
      if (ordre.a == "t") { truc = "Tank" }
      if (ordre.a == "c") { truc = "Chasseur" }
      if (ordre.a == "d") { truc = "Destroyer" }
      if (ordre.a == "r") { truc = "Régiment" }
      if (ordre.a == "a") { truc = "Char d'Assaut" }
      if (ordre.a == "b") { truc = "Bombardier" }
      if (ordre.a == "cr") { truc = "Croiseur" }
      if (ordre.a == "p") { truc = "Power" }
      var coul = "Incolore";
      var coulRpl = coul;
      var pos = ordre.b.toUpperCase();
      if (couleur.substring(1, 2) == "v") { coulRpl = "Vert" }
      if (couleur.substring(1, 2) == "b") { coulRpl = "Bleu" }
      if (couleur.substring(1, 2) == "j") { coulRpl = "Jaune" }
      if (couleur.substring(1, 2) == "r") { coulRpl = "Rouge" }

      if (ordre.c == "v") { coulRpl = "Vert" }
      if (ordre.c == "b") { coulRpl = "Bleu" }
      if (ordre.c == "j") { coulRpl = "Jaune" }
      if (ordre.c == "r") { coulRpl = "Rouge" }

      var existe = false;
      for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces
        if (this.pieces[i][0] == truc && this.pieces[i][1] == coul && this.pieces[i][2] == pos) {
          existe = true;
          this.pieces[i][1] = coulRpl;
          break
        }
      }

      this.ordreSpelled = [["transformation"]];


    } else {
      if (ordre.b.substring(0, 1) == 'e') {

        //        *************************************
        //        *                                   *
        //        *         échange de pièce          *
        //        *                                   *
        //        *************************************

        if (ordre.c == "m") {
          this.ordreSpelled = [["Mega-Missile vasy ça saoûle...", couleur]]
        } else {
          if (ordre.a.includes("s")) { piece = "Soldat" }
          if (ordre.a.includes("t")) { piece = "Tank" }
          if (ordre.a.includes("c")) { piece = "Chasseur" }
          if (ordre.a.includes("d")) { piece = "Destroyer" }
          if (ordre.a.includes("p")) { piece = "Power" }

          amount = ordre.a.substring(0, ordre.a.length - 1).toUpperCase();
          depart = ordre.b.substring(1, ordre.b.length).toUpperCase();

          if (ordre.c == "s") { arrivee = "Soldat" }
          if (ordre.c == "t") { arrivee = "Tank" }
          if (ordre.c == "c") { arrivee = "Chasseur" }
          if (ordre.c == "d") { arrivee = "Destroyer" }
          if (ordre.c == "r") { arrivee = "Régiment" }
          if (ordre.c == "a") { arrivee = "Char d'Assaut" }
          if (ordre.c == "b") { arrivee = "Bombardier" }
          if (ordre.c == "cr") { arrivee = "Croiseur" }

          var ordreok = false;
          for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces
            if (this.pieces[i][0] == piece && this.pieces[i][1] == couleur && this.pieces[i][2] == depart) {
              //si la pièce existe
              if (this.pieces[i][3] < amount) {
                break
              } else if (this.pieces[i][3] == amount) {
                ordreok = true;
                this.pieces.splice(i, 1);
                this.pieces.push([arrivee, couleur, depart, 1]);
                break
              } else {
                ordreok = true;
                this.pieces[i][3] = this.pieces[i][3] - amount;
                this.pieces.push([arrivee, couleur, depart, 1]);
                break
              }
            }
          }
          if (ordreok) {
            this.ordreSpelled = [["échange de " + amount + " " + piece + "s " + couleur + "s au niveau de " + depart + " pour un " + arrivee, couleur]];

          } else {
            this.ordreSpelled = [["Ordre illégal (échange de " + amount + " " + piece + "s " + couleur + "s impossible : pas assez de " + piece + "s)"]];
          }
        }
      } else {

        //        *************************************
        //        *                                   *
        //        *       déplacement de pièce        *
        //        *                                   *
        //        *************************************

        if (ordre.a == "s") { piece = "Soldat" }
        if (ordre.a == "t") { piece = "Tank" }
        if (ordre.a == "c") { piece = "Chasseur" }
        if (ordre.a == "d") { piece = "Destroyer" }
        if (ordre.a == "r") { piece = "Régiment" }
        if (ordre.a == "a") { piece = "Char d'Assaut" }
        if (ordre.a == "b") { piece = "Bombardier" }
        if (ordre.a == "cr") { piece = "Croiseur" }
        if (ordre.a == "m") { piece = "Méga-Missile" }

        depart = ordre.b.toUpperCase();
        arrivee = ordre.c.toUpperCase();
        var ordreok = false;
        for (var i = 0; i != this.pieces.length; i++) {//scan du tableau des pieces

          if (this.pieces[i][0] == piece && this.pieces[i][1] == couleur && this.pieces[i][2] == depart) {
            //si on a une piece qui correspond
            ordreok = true;

            if (this.pieces[i][3] == 1) {//si la pièce est seule
              var cbon = false;//on en a pas trouvé dèjà là
              for (var j = 0; j != this.pieces.length; j++) {//on scan le tableau des pièces
                if (this.pieces[j][0] == piece && this.pieces[j][1] == couleur && this.pieces[j][2] == arrivee) {
                  //si on a déjà une pièce ici
                  this.pieces[j][3] = this.pieces[j][3] + 1;//on en rajoute une
                  cbon = true;//on dit qu'on en à trouvé une
                  break
                }
              } if (!cbon) {//si on en a pas trouvé
                this.pieces[i][2] = arrivee;//on change sa position
              } else {
                this.pieces.splice(i, 1);//on supprime la ligne du tableau
              }

            } else {//si elles sont plusieurs
              var cbon = false;//on en a pas trouvé dèjà là
              for (var j = 0; j != this.pieces.length; j++) {//on scan le tableau des pièces
                if (this.pieces[j][0] == piece && this.pieces[j][1] == couleur && this.pieces[j][2] == arrivee) {
                  //si on a déjà une pièce ici
                  this.pieces[i][3] = this.pieces[i][3] - 1;//on en retire une
                  this.pieces[j][3] = this.pieces[j][3] + 1;//on en rajoute une
                  cbon = true;//on dit qu'on en à trouvé une
                  break
                }
              }
              if (!cbon) {//si on en a pas trouvé
                this.pieces[i][3] = this.pieces[i][3] - 1;//on en retire une...
                this.pieces.push([piece, couleur, depart, 1])//...et on en met une nouvelle
                setTimeout(() => {
                  this.pieces[i][2] = arrivee;
                }, 1);
              }
            }
            break
          }
        }
        if (ordreok) {
          this.ordreSpelled = [[`déplacement d'un ${piece} ${couleur} de ${depart} vers ${arrivee}`, couleur]];
          setTimeout(() => {
            this.updateCase(depart);
            this.updateCase(arrivee);
          }, 10);
        } else {
          this.ordreSpelled = [[`Ordre illégal ${couleur} (${piece} de ${depart} vers ${arrivee})`, "Gris"]];
        }
      }
    }
    var nouveau: Array<string> = this.ordreSpelled.concat(this.logs);
    this.httpClient
      .put('https://power-7212d-default-rtdb.europe-west1.firebasedatabase.app/logs.json', nouveau)
      .subscribe(
        () => {
        },
        (error) => {
          console.error('Erreur d\'enregistrement! : ' + error);
        }
      );
    console.table(this.pieces);
    setTimeout(() => { this.refreshLogs(); }, 300);
  }
  refreshLogs() {
    this.logs$ = this.httpClient.get<any[]>('https://power-7212d-default-rtdb.europe-west1.firebasedatabase.app/logs.json');
    this.logs$.subscribe(
      (value) => {
        this.logs = value;
      }
    )
  }
  constructor(private DataService: DataService, private httpClient: HttpClient) { }

  deleteLogs() {
    this.httpClient.delete('https://power-7212d-default-rtdb.europe-west1.firebasedatabase.app/logs.json').subscribe(data => {

    });
    setTimeout(() => { this.refreshLogs() }, 200);
  }
  updateCase(pos: string) {

    var piecesApositioner = [];
    var x = 50;
    var y = 50;
    for (var i = 0; i != this.pieces.length; i++) {
      if (this.pieces[i][2] == pos.toUpperCase()) {
        piecesApositioner.push(i);
      }
    }
    for (var i = 0; i != this.positions.length; i++) {
      if (this.positions[i][0] == pos.toLowerCase()) {
        var x = parseInt(this.positions[i][1]);
        var y = parseInt(this.positions[i][2]);
      }
    }
    var angle = 360 / (piecesApositioner.length-1);
    var rota = angle;
    for (let i = 0; i != piecesApositioner.length; i++) {
      var element = document.getElementById(`piece${piecesApositioner[i]}`);
      if (element != null) {
        console.log(`coords : x=${x} y=${y}`);
        if (i == 0){
          element.style.cssText = `top: calc(${y}% - .42px * ${y}); left: calc(${x}% - .42px * ${x});`;
        }else{
          element.style.cssText = `top: calc(${y}% - .42px * ${y}); left: calc(${x}% - .42px * ${x});transform: rotate(${angle}deg) translate(40px) rotate(-${angle}deg);`;
        }
        angle = rota + angle;
      }
    }
  }

  ngOnInit(): void {
    this.onFetch();
    this.nouvellePartie();
  }
}

//ng deploy --base-href=/power/