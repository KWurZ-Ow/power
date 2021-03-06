# ⚡ Projet Angular Power

⚠<ins> **projet en développement** </ins>⚠

Lien vers le site :
https://kwurz-ow.github.io/power/


## 🪂 Le jeu

<img src="https://escaleajeux.fr/p/powe2.jpg" width="400"/>

***

L'idée est de reproduire le jeu de plateau `"Power"` :
Un jeu de stratégie guerrière au tou par tour où les joueurs déplacent et échangent leurs unités via des `feuilles d'ordres`.
Les ordres sont écrits sous forme d'un code normé utilisé par tous les joueurs.
Les ordres de tous les joueurs sont ensuite appliqués en même temps.

## 💾 Partie technique

Le projet comprends deux composants : la `table de jeu` et `l'interface téléphone`.
Les joueurs accedent à l'interface téléphone, inscrivent leur nom, choisisent leur couleur et écrivent leurs ordres.
leurs ordres sont stockés dans une `Realtime Database` hébergée par `Firebase`.
A la fin du timer, on récupère les données sur la `table de jeu` (interface de l'ordinateur qui peut être branché sur un écran de télévision).
Les joueurs valident ou refusent les ordres illégaux, ceux-ci s'effectuent dans l'application qui les analyse afin de déplacer les pièces.

Les ordres sont stockés dans une autre table de la `base de données` et listés dans les `logs`.
On résout les combats éventuels et on lance une nouvelle manche.

## ✨ Interface

L'interface est codée en `html` et `css` brut.
J'utilise `Angular Matérial` pour les boutons, les formulaires et plein d'autres designs

### Plateau de jeu : 
<img src="https://raw.githubusercontent.com/KWurZ-Ow/power/gh-pages/illustration_plateau.png" width="400"/>

***

### Interface mobile : 
<img src="https://raw.githubusercontent.com/KWurZ-Ow/power/gh-pages/illustration_tel.png" width="300"/>
