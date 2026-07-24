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

## Theme « socialiser » (24 pistes, un seul memo vocal)

1. **chou akhbarak ?**  `soc-001`
2. **chou akhbarik ?**  `soc-001_f`  *(Variante adressee a une femme.)*
3. **kello tamem**  `soc-002`
4. **mnen ente ?**  `soc-003`
5. **ana men Fransa**  `soc-004`
6. **tcharrafna**  `soc-005`
7. **ahla w sahla**  `soc-006`
8. **addé 3omrik ?**  `soc-007`
9. **chou btechteghle ?**  `soc-008`
10. **3am bet3allam 3arabe**  `soc-009`
11. **mabrouk !**  `soc-010`
12. **hamdella 3al saleme**  `soc-011`
13. **in cha2 Allah**  `soc-012`
14. **wallah ?!**  `soc-013`
15. **3an jad ?**  `soc-014`
16. **ma3le**  `soc-015`
17. **khalas !**  `soc-016`
18. **chou ra2yik ?**  `soc-017`
19. **ana mabsouta ktir**  `soc-018`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
20. **ana ta3bane chwaye**  `soc-019`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
21. **nchoufkon ba3den !**  `soc-020`
22. **deere belik**  `soc-021`
23. **deere belik**  `soc-021_f`  *(Variante adressee a une femme.)*
24. **byejnen !**  `soc-022`

## Theme « shopping » (20 pistes, un seul memo vocal)

1. **adde ha2o ?**  `sho-001`
2. **ghale ktir !**  `sho-002`
3. **fi chi arkhas ?**  `sho-003`
4. **3melle se3er mni7**  `sho-004`
5. **badde hayda**  `sho-005`
6. **3am betfarraj bas**  `sho-006`
7. **fi 3andak mesure azghar ?**  `sho-007`
8. **fi 3andik mesure azghar ?**  `sho-007_f`  *(Variante adressee a une femme.)*
9. **fiye jarreb ?**  `sho-008`
10. **7elo ktir hayda**  `sho-009`
11. **bteftakhod carte ?**  `sho-010`
12. **ma3e cash**  `sho-011`
13. **khedle kis, 3mol ma3rouf**  `sho-012`
14. **wen fi souk hon ?**  `sho-013`
15. **baddne wa7de metla**  `sho-014`
16. **chou hal lon el tene ?**  `sho-015`
17. **ekhedto !**  `sho-016`
18. **raje3lak bokra**  `sho-017`
19. **raje3lik bokra**  `sho-017_f`  *(Variante adressee a une femme.)*
20. **hayda kado la 7abibe**  `sho-018`

## Theme « voyage » (18 pistes, un seul memo vocal)

1. **wen el matar ?**  `voy-001`
2. **badde rou7 3a Beirut**  `voy-002`
3. **adde el taxi la hon ?**  `voy-003`
4. **wa2ef hon, 3mol ma3rouf**  `voy-004`
5. **3ala mahlak !**  `voy-005`
6. **wen el ba7er ?**  `voy-006`
7. **badde rou7 3al jabal**  `voy-007`
8. **fi ghurfe fadye ?**  `voy-008`
9. **adde el layle ?**  `voy-009`
10. **day3ane ana**  `voy-010`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
11. **3a chmel aw 3a yamin ?**  `voy-011`
12. **adde b3id ?**  `voy-012`
13. **emta byemche el bus ?**  `voy-013`
14. **sourra hon !**  `voy-014`
15. **chou hal manzar !**  `voy-015`
16. **el jaw 7elo lyom**  `voy-016`
17. **chob ktir !**  `voy-017`
18. **ma3e passport franseve**  `voy-018`

## Theme « sortir » (16 pistes, un seul memo vocal)

1. **chou 3am na3mel lyom ?**  `sor-001`
2. **yalla nrou7 !**  `sor-002`
3. **baddik tejé ma3na ?**  `sor-003`
4. **akid !**  `sor-004`
5. **ma fiye lyom**  `sor-005`
6. **emta mnelta2a ?**  `sor-006`
7. **wasalet ?**  `sor-007`
8. **el sahra kenet khyele**  `sor-008`
9. **badde or2os !**  `sor-009`
10. **hal oghniye bet jannen**  `sor-010`
11. **nrou7 3al cinema ?**  `sor-011`
12. **kasak !**  `sor-012`
13. **d7ekna ktir**  `sor-013`
14. **sohrane la bokra ?**  `sor-014`  *(A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle.)*
15. **3azumye 3ande !**  `sor-015`
16. **wen ahla mat3am hon ?**  `sor-016`

## Theme « culture » (20 pistes, un seul memo vocal)

1. **Lebnen**  `cul-001`
2. **el arze**  `cul-002`
3. **dabke**  `cul-003`
4. **Fairuz**  `cul-004`
5. **arak**  `cul-005`
6. **day3a**  `cul-006`
7. **sobhiye**  `cul-007`
8. **3azime**  `cul-008`
9. **jar**  `cul-009`
10. **tfaddale !**  `cul-010`
11. **nharak sa3id**  `cul-011`
12. **nharik sa3id**  `cul-011_f`  *(Variante adressee a une femme.)*
13. **Allah ma3ik**  `cul-012`
14. **Allah ma3ik**  `cul-012_f`  *(Variante adressee a une femme.)*
15. **ya 3ayne !**  `cul-013`
16. **to2borne**  `cul-014`
17. **ne3eman**  `cul-015`
18. **sa7tein w 3afye**  `cul-016`
19. **beit jeddo**  `cul-017`
20. **el gharbe**  `cul-018`
