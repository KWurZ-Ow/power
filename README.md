# ⚡ Projet Angular Power

<span style="color: red;">⚠ **projet en développement** ⚠</span>

Lien vers le site :
https://kwurz-ow.github.io/power/

Lien vers les fichiers source :
https://github.com/KWurZ-Ow/power/tree/sources


## 🪂 Le jeu

<img src="https://escaleajeux.fr/p/powe2.jpg" alt="Image du jeu Power" width="400"/>

***

L'idée est de reproduire le jeu de plateau "Power" :
Un jeu de stratégie guerrière au tou par tour où les joueurs déplacent et échangent leurs unités via des feuilles d'ordres.
Les ordres sont écrits sous forme d'un code normé utilisé par tous les joueurs.
Les ordres de tous les joueurs sont ensuite appliqués en même temps.

## 💾 Partie technique

Le projet comprends deux composants : la table de jeu et l'interface téléphone.
Les joueurs accedent à l'interface téléphone, inscrivent leur nom, choisisent leur couleur et écrivent leurs ordres.
leurs ordres sont stockés dans une Realtime Database hébergée par Firebase.

A la fin du timer, on récupère les données sur la table de jeu (interface de l'ordinateur qui peut être branché sur une télévision).
Les joueurs valident ou refusent les ordres illégaux, ceux-ci s'effectuent dans l'application qui les analyse afin de déplacer les pièces.

Les ordres sont stockés dans une autre table de la base de données et listés dans les logs.
On résout les combats éventuels et on lance une nouvelle manche.

## ✨ Interface

L'interface est codée en html css brut et avec angular matérial
<div style="display: flex;">
### Plateau de jeu : 
<img src="https://raw.githubusercontent.com/KWurZ-Ow/power/gh-pages/illustration_plateau.png" alt="Image du jeu Power" width="400"/>

***

### Interface mobile : 
<img src="https://raw.githubusercontent.com/KWurZ-Ow/power/gh-pages/illustration_tel.png" alt="Image du jeu Power" width="400"/>
</div>
