# Script d'enregistrement pour Chadi

Un memo vocal PAR THEME, lu d'une traite dans l'ordre ci-dessous.
Laisse environ 1,5 seconde de silence entre chaque phrase (compte « un, deux » dans ta tete).
Parle a vitesse naturelle mais articulee, telephone proche de la bouche, piece calme.

Certaines phrases sont marquees « a lire tel quel » : elles sont au feminin
parce que c'est Isaure qui les dira. Ne les corrige pas vers le masculin !

Ensuite, depose les fichiers dans recordings/ puis lance :
```
python3 tools/process_audio.py decouper <theme> recordings/<fichier>
```
et verifie l'alignement en ouvrant tools/qa.html via un serveur local.

## Theme « bases » (34 pistes, un seul memo vocal)

1. **mar7aba**  `bas-001`
2. **kifak ?**  `bas-002`
3. **kifik ?**  `bas-002_f`  *(Variante adressee a une femme.)*
4. **ana mni7a, w enta ?**  `bas-003`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
5. **ana mni7a, w ente ?**  `bas-003_f`  *(Variante adressee a une femme.)*
6. **chou esmak ?**  `bas-004`
7. **chou esmik ?**  `bas-004_f`  *(Variante adressee a une femme.)*
8. **esme Isaure**  `bas-005`
9. **eh**  `bas-006`
10. **la2**  `bas-007`
11. **chokran**  `bas-008`
12. **tekram**  `bas-009`
13. **tekrame**  `bas-009_f`  *(Variante adressee a une femme.)*
14. **3mol ma3rouf**  `bas-010`
15. **3mele ma3rouf**  `bas-010_f`  *(Variante adressee a une femme.)*
16. **sorry, ma twekhezne**  `bas-011`
17. **saba7 el kheir**  `bas-012`
18. **masa el kheir**  `bas-013`
19. **tesba7 3ala kheir**  `bas-014`
20. **tesba7e 3ala kheir**  `bas-014_f`  *(Variante adressee a une femme.)*
21. **yalla bye**  `bas-015`
22. **chou hayda ?**  `bas-016`
23. **wen ... ?**  `bas-017`
24. **wa7ad, tnen, tlete, arb3a, khamse**  `bas-018`
25. **sette, sab3a, tmene, tes3a, 3achra**  `bas-019`
26. **ma be7ke 3arabe mni7**  `bas-020`
27. **fik te7ke 3ala mahl ?**  `bas-021`
28. **fike te7ke 3ala mahl ?**  `bas-021_f`  *(Variante adressee a une femme.)*
29. **kif b2oul ... bel 3arabe ?**  `bas-022`
30. **ma fhemet, 3id 3mol ma3rouf**  `bas-023`
31. **ma fhemet, 3ide 3mele ma3rouf**  `bas-023_f`  *(Variante adressee a une femme.)*
32. **chou ya3ne ... ?**  `bas-024`
33. **chwaye chwaye**  `bas-025`
34. **ma ba3ref**  `bas-026`

## Theme « famille » (19 pistes, un seul memo vocal)

1. **el 3ayle**  `fam-001`
2. **bayye**  `fam-002`
3. **emme**  `fam-003`
4. **khayye**  `fam-004`
5. **ekhte**  `fam-005`
6. **jeddo**  `fam-006`
7. **teta**  `fam-007`
8. **3ammo**  `fam-008`
9. **tante**  `fam-009`
10. **7abibe**  `fam-010`
11. **7abibte**  `fam-010_f`  *(Variante adressee a une femme.)*
12. **7ayete**  `fam-011`
13. **b7ebbak**  `fam-012`
14. **b7ebbik**  `fam-012_f`  *(Variante adressee a une femme.)*
15. **wa7achtne**  `fam-013`
16. **wa7achtine**  `fam-013_f`  *(Variante adressee a une femme.)*
17. **kif el 3ayle ?**  `fam-014`
18. **3ande khay w ekht**  `fam-015`
19. **hayda khayye**  `fam-016`

## Theme « nourriture » (22 pistes, un seul memo vocal)

1. **ana jou3ane**  `nou-001`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
2. **ana 3atchane**  `nou-002`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
3. **badde ekol**  `nou-003`
4. **badde may**  `nou-004`
5. **chou fi akel ?**  `nou-005`
6. **ktir tayyeb !**  `nou-006`
7. **sa7ten !**  `nou-007`
8. **chbe3et, chokran**  `nou-008`
9. **7ommos**  `nou-009`
10. **tabboule**  `nou-010`
11. **man2ouche bza3tar**  `nou-011`
12. **khebez**  `nou-012`
13. **badde ahwe**  `nou-013`
14. **chay**  `nou-014`
15. **ma bekol la7me**  `nou-015`
16. **chou tayyeb hon ?**  `nou-016`
17. **l 7seb, 3mol ma3rouf**  `nou-017`
18. **l 7seb, 3mele ma3rouf**  `nou-017_f`  *(Variante adressee a une femme.)*
19. **badde chi 7elo**  `nou-018`
20. **el mezze**  `nou-019`
21. **3azamne 3a chi mat3am**  `nou-020`
22. **3azmine 3a chi mat3am**  `nou-020_f`  *(Variante adressee a une femme.)*
