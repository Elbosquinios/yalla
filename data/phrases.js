// Contenu de l'app. Convention franco-arabe standard francisee :
// "ch" (pas "sh"), "ou" (pas "u"), et les chiffres 3 = ع, 7 = ح, 2 = ء, gh = غ, kh = خ.
// Forme par defaut : Isaure (femme) parle a un homme.
// variantes.versF : forme quand elle s'adresse a une femme.
// genreLocuteur: "f" : la phrase decrit celle qui parle, la forme principale est le feminin.

const THEMES = [
  { id: "bases", nom: "Les bases", emoji: "👋", couleur: "#e8956b" },
  { id: "famille", nom: "Famille & amour", emoji: "❤️", couleur: "#d96c7b" },
  { id: "nourriture", nom: "Nourriture", emoji: "🍽️", couleur: "#7ba05b" },
  { id: "socialiser", nom: "Socialiser", emoji: "💬", couleur: "#5b8ea0" },
  { id: "shopping", nom: "Shopping", emoji: "🛍️", couleur: "#a07b5b" },
  { id: "voyage", nom: "Voyage", emoji: "✈️", couleur: "#6b7ba8" },
  { id: "sortir", nom: "Sortir", emoji: "🎉", couleur: "#9b6ba8" },
  { id: "culture", nom: "Culture", emoji: "🎶", couleur: "#c2a05b" },
];

const PHRASES = [
  // ===== LES BASES =====
  {
    id: "bas-001", theme: "bases",
    franco: "mar7aba",
    arabe: "مرحبا",
    francais: "Bonjour / Salut",
    note: "Le salut universel, a toute heure. On repond souvent « mar7abtein » (deux bonjours !)."
  },
  {
    id: "bas-002", theme: "bases",
    franco: "kifak ?",
    arabe: "كيفك؟",
    francais: "Comment vas-tu ?",
    variantes: { versF: "kifik ?" },
    note: "A un homme : kifak. A une femme : kifik."
  },
  {
    id: "bas-003", theme: "bases",
    franco: "ana mni7a, w enta ?",
    arabe: "أنا منيحة، وإنتَ؟",
    francais: "Je vais bien, et toi ?",
    variantes: { versF: "ana mni7a, w ente ?" },
    genreLocuteur: "f",
    note: "mni7a = bien (au feminin, car c'est toi qui parles). Un homme dirait mni7."
  },
  {
    id: "bas-004", theme: "bases",
    franco: "chou esmak ?",
    arabe: "شو اسمك؟",
    francais: "Comment tu t'appelles ?",
    variantes: { versF: "chou esmik ?" },
    note: "chou = quoi. Litteralement : « quoi ton nom ? »"
  },
  {
    id: "bas-005", theme: "bases",
    franco: "esme Isaure",
    arabe: "اسمي إيزور",
    francais: "Je m'appelle Isaure",
    note: "esme = mon nom. Le « e » final = « mon »."
  },
  {
    id: "bas-006", theme: "bases",
    franco: "eh",
    arabe: "إيه",
    francais: "Oui",
    note: "Le « oui » de tous les jours. « na3am » existe mais fait tres formel."
  },
  {
    id: "bas-007", theme: "bases",
    franco: "la2",
    arabe: "لأ",
    francais: "Non",
    note: "Le 2 = un petit coup de glotte, comme dans « uh-oh »."
  },
  {
    id: "bas-008", theme: "bases",
    franco: "chokran",
    arabe: "شكراً",
    francais: "Merci",
    note: "« merci » tout court s'utilise aussi enormement au Liban."
  },
  {
    id: "bas-009", theme: "bases",
    franco: "tekram",
    arabe: "تكرم",
    francais: "De rien / Je t'en prie",
    variantes: { versF: "tekrame" },
    note: "Reponse elegante a merci. A une femme : tekrame."
  },
  {
    id: "bas-010", theme: "bases",
    franco: "3mol ma3rouf",
    arabe: "عمول معروف",
    francais: "S'il te plait",
    variantes: { versF: "3mele ma3rouf" },
    note: "Litteralement « fais une bonne action ». Tres courant pour demander quelque chose."
  },
  {
    id: "bas-011", theme: "bases",
    franco: "sorry, ma twekhezne",
    arabe: "سوري، ما تواخذني",
    francais: "Pardon, excuse-moi",
    note: "Les Libanais disent « sorry » en permanence. ma twekhezne = ne m'en veux pas."
  },
  {
    id: "bas-012", theme: "bases",
    franco: "saba7 el kheir",
    arabe: "صباح الخير",
    francais: "Bonjour (le matin)",
    note: "Reponse classique : « saba7 el nour » (matin de lumiere)."
  },
  {
    id: "bas-013", theme: "bases",
    franco: "masa el kheir",
    arabe: "مسا الخير",
    francais: "Bonsoir",
    note: "Reponse : « masa el nour »."
  },
  {
    id: "bas-014", theme: "bases",
    franco: "tesba7 3ala kheir",
    arabe: "تصبح على خير",
    francais: "Bonne nuit",
    variantes: { versF: "tesba7e 3ala kheir" },
    note: "Litteralement : « reveille-toi sur du bien »."
  },
  {
    id: "bas-015", theme: "bases",
    franco: "yalla bye",
    arabe: "يلا باي",
    francais: "Allez, salut !",
    note: "La vraie facon de dire au revoir au Liban. yalla = allez / on y va."
  },
  {
    id: "bas-016", theme: "bases",
    franco: "chou hayda ?",
    arabe: "شو هيدا؟",
    francais: "C'est quoi, ca ?",
    note: "hayda = ca / celui-ci. Pour un objet feminin : hayde."
  },
  {
    id: "bas-017", theme: "bases",
    franco: "wen ... ?",
    arabe: "وين ...؟",
    francais: "Ou est ... ?",
    note: "wen el 7emmem ? = ou sont les toilettes ? La question qui sauve."
  },
  {
    id: "bas-018", theme: "bases",
    franco: "wa7ad, tnen, tlete, arb3a, khamse",
    arabe: "واحد، تنين، تلاتة، أربعة، خمسة",
    francais: "1, 2, 3, 4, 5",
    note: "Les cinq premiers chiffres. A dire a voix haute en comptant sur les doigts."
  },
  {
    id: "bas-019", theme: "bases",
    franco: "sette, sab3a, tmene, tes3a, 3achra",
    arabe: "ستة، سبعة، تمانة، تسعة، عشرة",
    francais: "6, 7, 8, 9, 10",
    note: "La suite. Avec bas-018, tu sais compter jusqu'a 10."
  },
  // Phrases de survie
  {
    id: "bas-020", theme: "bases",
    franco: "ma be7ke 3arabe mni7",
    arabe: "ما بحكي عربي منيح",
    francais: "Je ne parle pas bien arabe",
    note: "Phrase de survie. Dite avec le sourire, elle ouvre toutes les portes."
  },
  {
    id: "bas-021", theme: "bases",
    franco: "fik te7ke 3ala mahl ?",
    arabe: "فيك تحكي على مهل؟",
    francais: "Tu peux parler lentement ?",
    variantes: { versF: "fike te7ke 3ala mahl ?" },
    note: "Phrase de survie. 3ala mahl = doucement, sans se presser."
  },
  {
    id: "bas-022", theme: "bases",
    franco: "kif b2oul ... bel 3arabe ?",
    arabe: "كيف بقول ... بالعربي؟",
    francais: "Comment on dit ... en arabe ?",
    note: "Phrase de survie. Ta meilleure amie pour apprendre en discutant."
  },
  {
    id: "bas-023", theme: "bases",
    franco: "ma fhemet, 3id 3mol ma3rouf",
    arabe: "ما فهمت، عيد عمول معروف",
    francais: "Je n'ai pas compris, repete s'il te plait",
    variantes: { versF: "ma fhemet, 3ide 3mele ma3rouf" },
    note: "Phrase de survie. 3id = repete (a un homme)."
  },
  {
    id: "bas-024", theme: "bases",
    franco: "chou ya3ne ... ?",
    arabe: "شو يعني ...؟",
    francais: "Ca veut dire quoi, ... ?",
    note: "Phrase de survie. ya3ne = ca veut dire. Les Libanais le glissent dans chaque phrase."
  },
  {
    id: "bas-025", theme: "bases",
    franco: "chwaye chwaye",
    arabe: "شوي شوي",
    francais: "Doucement, petit a petit",
    note: "Reponse parfaite a « tu parles arabe ? » : 3am bet3allam, chwaye chwaye (j'apprends, petit a petit)."
  },
  {
    id: "bas-026", theme: "bases",
    franco: "ma ba3ref",
    arabe: "ما بعرف",
    francais: "Je ne sais pas",
    note: "ba3ref = je sais. ma ... = negation."
  },

  // ===== FAMILLE & AMOUR =====
  {
    id: "fam-001", theme: "famille",
    franco: "el 3ayle",
    arabe: "العيلة",
    francais: "La famille",
    note: "Au Liban, la famille est le centre de tout. Tu vas beaucoup entendre ce mot."
  },
  {
    id: "fam-002", theme: "famille",
    franco: "bayye",
    arabe: "بيي",
    francais: "Mon pere",
    note: "Le pere de quelqu'un d'autre : bayyak (ton pere, a un homme), bayyik (a une femme)."
  },
  {
    id: "fam-003", theme: "famille",
    franco: "emme",
    arabe: "إمي",
    francais: "Ma mere",
    note: "On dit aussi « mama ». emmak = ta mere (a un homme)."
  },
  {
    id: "fam-004", theme: "famille",
    franco: "khayye",
    arabe: "خيي",
    francais: "Mon frere",
    note: "Aussi utilise entre amis, comme « frero » en francais."
  },
  {
    id: "fam-005", theme: "famille",
    franco: "ekhte",
    arabe: "إختي",
    francais: "Ma soeur",
    note: "kh = le son de la jota espagnole ou du « ch » allemand de Bach."
  },
  {
    id: "fam-006", theme: "famille",
    franco: "jeddo",
    arabe: "جدو",
    francais: "Papi, grand-pere",
    note: "C'est le mot affectueux, celui qu'on utilise pour lui parler."
  },
  {
    id: "fam-007", theme: "famille",
    franco: "teta",
    arabe: "تيتا",
    francais: "Mamie, grand-mere",
    note: "La teta libanaise : la personne qui te forcera a manger trois assiettes."
  },
  {
    id: "fam-008", theme: "famille",
    franco: "3ammo",
    arabe: "عمو",
    francais: "Tonton",
    note: "Oncle paternel, mais aussi tout homme plus age qu'on veut saluer gentiment."
  },
  {
    id: "fam-009", theme: "famille",
    franco: "tante",
    arabe: "طانت",
    francais: "Tata",
    note: "Emprunte au francais ! Utilise pour les tantes et les dames plus agees."
  },
  {
    id: "fam-010", theme: "famille",
    franco: "7abibe",
    arabe: "حبيبي",
    francais: "Mon cheri, mon amour",
    variantes: { versF: "7abibte" },
    note: "LE mot d'amour. A un homme : 7abibe. A une femme : 7abibte. S'utilise aussi entre amis."
  },
  {
    id: "fam-011", theme: "famille",
    franco: "7ayete",
    arabe: "حياتي",
    francais: "Ma vie (mot doux)",
    note: "Litteralement « ma vie ». Encore plus fort que 7abibe."
  },
  {
    id: "fam-012", theme: "famille",
    franco: "b7ebbak",
    arabe: "بحبك",
    francais: "Je t'aime",
    variantes: { versF: "b7ebbik" },
    note: "A un homme : b7ebbak. A une femme : b7ebbik. Reponse : b7ebbak aktar (je t'aime plus)."
  },
  {
    id: "fam-013", theme: "famille",
    franco: "wa7achtne",
    arabe: "وحشتني",
    francais: "Tu m'as manque",
    variantes: { versF: "wa7achtine" },
    note: "Litteralement : « tu m'as rendu la vie deserte sans toi ». Oui, c'est intense."
  },
  {
    id: "fam-014", theme: "famille",
    franco: "kif el 3ayle ?",
    arabe: "كيف العيلة؟",
    francais: "Comment va la famille ?",
    note: "Question de politesse incontournable, a poser des les premieres minutes."
  },
  {
    id: "fam-015", theme: "famille",
    franco: "3ande khay w ekht",
    arabe: "عندي خي وإخت",
    francais: "J'ai un frere et une soeur",
    note: "3ande = j'ai (litteralement « chez moi »). A adapter a ta vraie famille !"
  },
  {
    id: "fam-016", theme: "famille",
    franco: "hayda khayye",
    arabe: "هيدا خيي",
    francais: "Voici mon frere",
    note: "hayda = voici (masculin). Pour presenter ta soeur : hayde ekhte."
  },

  // ===== NOURRITURE =====
  {
    id: "nou-001", theme: "nourriture",
    franco: "ana jou3ane",
    arabe: "أنا جوعانة",
    francais: "J'ai faim",
    genreLocuteur: "f",
    note: "jou3ane au feminin car c'est toi qui parles. Un homme dirait jou3an."
  },
  {
    id: "nou-002", theme: "nourriture",
    franco: "ana 3atchane",
    arabe: "أنا عطشانة",
    francais: "J'ai soif",
    genreLocuteur: "f",
    note: "Meme logique : 3atchane (toi), 3atchan (un homme)."
  },
  {
    id: "nou-003", theme: "nourriture",
    franco: "badde ekol",
    arabe: "بدي آكل",
    francais: "Je veux manger",
    note: "badde = je veux. Le mot le plus utile de tout le libanais."
  },
  {
    id: "nou-004", theme: "nourriture",
    franco: "badde may",
    arabe: "بدي مي",
    francais: "Je veux de l'eau",
    note: "may = eau. Simple et vital."
  },
  {
    id: "nou-005", theme: "nourriture",
    franco: "chou fi akel ?",
    arabe: "شو في أكل؟",
    francais: "Qu'est-ce qu'il y a a manger ?",
    note: "fi = il y a. akel = nourriture. Question officielle du dimanche chez teta."
  },
  {
    id: "nou-006", theme: "nourriture",
    franco: "ktir tayyeb !",
    arabe: "كتير طيب!",
    francais: "C'est tres bon !",
    note: "ktir = tres. tayyeb = bon. Le compliment qui fait plaisir a toute cuisiniere libanaise."
  },
  {
    id: "nou-007", theme: "nourriture",
    franco: "sa7ten !",
    arabe: "صحتين!",
    francais: "Bon appetit !",
    note: "Litteralement « deux santes ». Se dit avant, pendant et apres le repas."
  },
  {
    id: "nou-008", theme: "nourriture",
    franco: "chbe3et, chokran",
    arabe: "شبعت، شكراً",
    francais: "J'ai assez mange, merci",
    note: "Indispensable pour survivre a un repas libanais. Ne marche jamais avec teta."
  },
  {
    id: "nou-009", theme: "nourriture",
    franco: "7ommos",
    arabe: "حمص",
    francais: "Houmous",
    note: "Avec le vrai 7 du fond de la gorge. Dire « houmous » a la francaise = carte de touriste."
  },
  {
    id: "nou-010", theme: "nourriture",
    franco: "tabboule",
    arabe: "تبولة",
    francais: "Taboule",
    note: "Le vrai, au persil. Le taboule francais a la semoule est une heresie au Liban."
  },
  {
    id: "nou-011", theme: "nourriture",
    franco: "man2ouche bza3tar",
    arabe: "منقوشة بزعتر",
    francais: "Galette au thym (petit dej)",
    note: "LE petit dejeuner libanais. za3tar = melange de thym, sesame et sumac."
  },
  {
    id: "nou-012", theme: "nourriture",
    franco: "khebez",
    arabe: "خبز",
    francais: "Pain",
    note: "Le pain libanais est plat et sert de couvert : on attrape tout avec."
  },
  {
    id: "nou-013", theme: "nourriture",
    franco: "badde ahwe",
    arabe: "بدي قهوة",
    francais: "Je veux un cafe",
    note: "ahwe = le cafe libanais, petit, fort, sans filtre. Refuser un cafe = mission diplomatique."
  },
  {
    id: "nou-014", theme: "nourriture",
    franco: "chay",
    arabe: "شاي",
    francais: "The",
    note: "Facile : ca ressemble au « chai » que tu connais deja."
  },
  {
    id: "nou-015", theme: "nourriture",
    franco: "ma bekol la7me",
    arabe: "ما باكل لحمة",
    francais: "Je ne mange pas de viande",
    note: "la7me = viande. Utile aussi : bala la7me = sans viande."
  },
  {
    id: "nou-016", theme: "nourriture",
    franco: "chou tayyeb hon ?",
    arabe: "شو طيب هون؟",
    francais: "Qu'est-ce qui est bon ici ?",
    note: "hon = ici. La question a poser au resto pour avoir les vraies recommandations."
  },
  {
    id: "nou-017", theme: "nourriture",
    franco: "l 7seb, 3mol ma3rouf",
    arabe: "الحساب، عمول معروف",
    francais: "L'addition, s'il te plait",
    variantes: { versF: "l 7seb, 3mele ma3rouf" },
    note: "7seb = compte, addition. Attention : au Liban, tout le monde se bat pour payer."
  },
  {
    id: "nou-018", theme: "nourriture",
    franco: "badde chi 7elo",
    arabe: "بدي شي حلو",
    francais: "Je veux un truc sucre",
    note: "chi = quelque chose. 7elo = sucre, ou joli selon le contexte."
  },
  {
    id: "nou-019", theme: "nourriture",
    franco: "el mezze",
    arabe: "المازة",
    francais: "Le mezze",
    note: "Des dizaines de petits plats a partager. On ne commande pas un plat, on couvre la table."
  },
  {
    id: "nou-020", theme: "nourriture",
    franco: "3azamne 3a chi mat3am",
    arabe: "عزمني عشي مطعم",
    francais: "Invite-moi au restaurant",
    variantes: { versF: "3azmine 3a chi mat3am" },
    note: "mat3am = restaurant. Phrase a utiliser sur Chadi sans moderation."
  },

  // ===== SOCIALISER =====
  {
    id: "soc-001", theme: "socialiser",
    franco: "chou akhbarak ?",
    arabe: "شو أخبارك؟",
    francais: "Quoi de neuf ?",
    variantes: { versF: "chou akhbarik ?" },
    note: "Litteralement « quoi tes nouvelles ? ». Vient juste apres kifak dans toute conversation."
  },
  {
    id: "soc-002", theme: "socialiser",
    franco: "kello tamem",
    arabe: "كلو تمام",
    francais: "Tout va bien",
    note: "kello = tout. tamem = nickel. Reponse passe-partout."
  },
  {
    id: "soc-003", theme: "socialiser",
    franco: "mnen ente ?",
    arabe: "منين إنتِ؟",
    francais: "Tu viens d'ou ?",
    note: "La question qu'on va beaucoup LUI poser. Reponse : ana men Fransa."
  },
  {
    id: "soc-004", theme: "socialiser",
    franco: "ana men Fransa",
    arabe: "أنا من فرنسا",
    francais: "Je viens de France",
    note: "men = de. Succes garanti au Liban, tout le monde a un cousin a Paris."
  },
  {
    id: "soc-005", theme: "socialiser",
    franco: "tcharrafna",
    arabe: "تشرفنا",
    francais: "Enchantee",
    note: "Litteralement « on a ete honores ». A dire quand on te presente quelqu'un."
  },
  {
    id: "soc-006", theme: "socialiser",
    franco: "ahla w sahla",
    arabe: "أهلا وسهلا",
    francais: "Bienvenue",
    note: "LA phrase de l'hospitalite libanaise. Tu l'entendras cent fois par jour."
  },
  {
    id: "soc-007", theme: "socialiser",
    franco: "addé 3omrik ?",
    arabe: "قدي عمرك؟",
    francais: "Quel age as-tu ?",
    note: "3omr = age. Reponse : 3omre tnen w 3echrin sene (j'ai 22 ans)."
  },
  {
    id: "soc-008", theme: "socialiser",
    franco: "chou btechteghle ?",
    arabe: "شو بتشتغلي؟",
    francais: "Tu fais quoi dans la vie ?",
    note: "Forme adressee a une femme (c'est a elle qu'on la posera)."
  },
  {
    id: "soc-009", theme: "socialiser",
    franco: "3am bet3allam 3arabe",
    arabe: "عم بتعلم عربي",
    francais: "J'apprends l'arabe",
    note: "3am + verbe = etre en train de. La phrase qui declenche des sourires partout."
  },
  {
    id: "soc-010", theme: "socialiser",
    franco: "mabrouk !",
    arabe: "مبروك!",
    francais: "Felicitations !",
    note: "Pour un mariage, un diplome, une nouvelle voiture... Reponse : Allah ybarek fik."
  },
  {
    id: "soc-011", theme: "socialiser",
    franco: "hamdella 3al saleme",
    arabe: "الحمدلله عالسلامة",
    francais: "Content que tu sois bien arrive",
    note: "Se dit a quelqu'un qui rentre de voyage. Reponse : Allah ysallmik."
  },
  {
    id: "soc-012", theme: "socialiser",
    franco: "in cha2 Allah",
    arabe: "إن شاء الله",
    francais: "Si Dieu le veut / j'espere",
    note: "Ponctue toute phrase sur le futur. Aussi la reponse polie qui veut dire « on verra »."
  },
  {
    id: "soc-013", theme: "socialiser",
    franco: "wallah ?!",
    arabe: "والله؟!",
    francais: "Serieux ?!",
    note: "Litteralement « par Dieu ». S'utilise pour s'etonner, jurer, insister. Mot camelion."
  },
  {
    id: "soc-014", theme: "socialiser",
    franco: "3an jad ?",
    arabe: "عن جد؟",
    francais: "Vraiment ?",
    note: "Le « c'est vrai ? » de tous les jours. 3an jad ! = je t'assure !"
  },
  {
    id: "soc-015", theme: "socialiser",
    franco: "ma3le",
    arabe: "معليه",
    francais: "C'est pas grave",
    note: "Le mot qui pardonne tout. Aussi : « tant pis », « laisse tomber »."
  },
  {
    id: "soc-016", theme: "socialiser",
    franco: "khalas !",
    arabe: "خلص!",
    francais: "Ca suffit ! / C'est regle !",
    note: "Mot magique : stop, fini, d'accord, n'en parlons plus. Tout depend du ton."
  },
  {
    id: "soc-017", theme: "socialiser",
    franco: "chou ra2yik ?",
    arabe: "شو رأيك؟",
    francais: "Qu'est-ce que tu en penses ?",
    note: "ra2y = avis. Forme adressee a elle. A un homme : chou ra2yak ?"
  },
  {
    id: "soc-018", theme: "socialiser",
    franco: "ana mabsouta ktir",
    arabe: "أنا مبسوطة كتير",
    francais: "Je suis tres contente",
    genreLocuteur: "f",
    note: "mabsouta au feminin. Un homme dirait mabsout."
  },
  {
    id: "soc-019", theme: "socialiser",
    franco: "ana ta3bane chwaye",
    arabe: "أنا تعبانة شوي",
    francais: "Je suis un peu fatiguee",
    genreLocuteur: "f",
    note: "ta3bane au feminin (toi). Un homme dirait ta3ban. chwaye = un peu."
  },
  {
    id: "soc-020", theme: "socialiser",
    franco: "nchoufkon ba3den !",
    arabe: "نشوفكن بعدين!",
    francais: "On se voit plus tard !",
    note: "nchouf = on voit. ba3den = apres. Pour quitter un groupe."
  },
  {
    id: "soc-021", theme: "socialiser",
    franco: "deere belik",
    arabe: "ديري بالك",
    francais: "Prends soin de toi",
    variantes: { versF: "deere belik" },
    note: "Forme dite A elle. Elle, a un homme, dira : deer belak."
  },
  {
    id: "soc-022", theme: "socialiser",
    franco: "byejnen !",
    arabe: "بيجنن!",
    francais: "C'est genial !",
    note: "Litteralement « ca rend fou ». LE compliment libanais pour tout ce qui est top."
  },

  // ===== SHOPPING =====
  {
    id: "sho-001", theme: "shopping",
    franco: "adde ha2o ?",
    arabe: "قدي حقو؟",
    francais: "Ca coute combien ?",
    note: "adde = combien. ha2 = prix. LA phrase du souk."
  },
  {
    id: "sho-002", theme: "shopping",
    franco: "ghale ktir !",
    arabe: "غالي كتير!",
    francais: "C'est trop cher !",
    note: "Etape obligatoire de toute negociation. A dire avec conviction."
  },
  {
    id: "sho-003", theme: "shopping",
    franco: "fi chi arkhas ?",
    arabe: "في شي أرخص؟",
    francais: "Il y a moins cher ?",
    note: "arkhas = moins cher. Suite logique de ghale ktir."
  },
  {
    id: "sho-004", theme: "shopping",
    franco: "3melle se3er mni7",
    arabe: "عملي سعر منيح",
    francais: "Fais-moi un bon prix",
    note: "se3er = prix. Au Liban, negocier est un sport national, pas une impolitesse."
  },
  {
    id: "sho-005", theme: "shopping",
    franco: "badde hayda",
    arabe: "بدي هيدا",
    francais: "Je veux celui-ci",
    note: "hayda = celui-ci. Pour un objet feminin : badde hayde."
  },
  {
    id: "sho-006", theme: "shopping",
    franco: "3am betfarraj bas",
    arabe: "عم بتفرج بس",
    francais: "Je regarde seulement",
    note: "bas = seulement. Pour echapper aux vendeurs insistants."
  },
  {
    id: "sho-007", theme: "shopping",
    franco: "fi 3andak mesure azghar ?",
    arabe: "في عندك مقاس أزغر؟",
    francais: "Tu as une taille plus petite ?",
    variantes: { versF: "fi 3andik mesure azghar ?" },
    note: "azghar = plus petit. Plus grand : akbar."
  },
  {
    id: "sho-008", theme: "shopping",
    franco: "fiye jarreb ?",
    arabe: "فيي جرب؟",
    francais: "Je peux essayer ?",
    note: "fiye = je peux. jarreb = essayer."
  },
  {
    id: "sho-009", theme: "shopping",
    franco: "7elo ktir hayda",
    arabe: "حلو كتير هيدا",
    francais: "C'est tres joli",
    note: "7elo = joli ou sucre selon le contexte. Ici : joli."
  },
  {
    id: "sho-010", theme: "shopping",
    franco: "bteftakhod carte ?",
    arabe: "بتاخد كارت؟",
    francais: "Tu prends la carte ?",
    note: "Au Liban beaucoup de commerces preferent le liquide (cash)."
  },
  {
    id: "sho-011", theme: "shopping",
    franco: "ma3e cash",
    arabe: "معي كاش",
    francais: "J'ai du liquide",
    note: "ma3e = avec moi, j'ai sur moi. Different de 3ande (je possede)."
  },
  {
    id: "sho-012", theme: "shopping",
    franco: "khedle kis, 3mol ma3rouf",
    arabe: "خدلي كيس عمول معروف",
    francais: "Donne-moi un sac, s'il te plait",
    note: "kis = sac. khedle = prends-moi / donne-moi."
  },
  {
    id: "sho-013", theme: "shopping",
    franco: "wen fi souk hon ?",
    arabe: "وين في سوق هون؟",
    francais: "Ou y a-t-il un marche ici ?",
    note: "souk = marche. Le souk de Byblos ou de Tripoli valent le detour."
  },
  {
    id: "sho-014", theme: "shopping",
    franco: "baddne wa7de metla",
    arabe: "بدني وحدة متلا",
    francais: "J'en veux une pareille",
    note: "metla = comme elle. Pour montrer un objet et demander le meme."
  },
  {
    id: "sho-015", theme: "shopping",
    franco: "chou hal lon el tene ?",
    arabe: "شو هاللون التاني؟",
    francais: "Il existe en quelle autre couleur ?",
    note: "lon = couleur. tene = autre / deuxieme."
  },
  {
    id: "sho-016", theme: "shopping",
    franco: "ekhedto !",
    arabe: "أخدتو!",
    francais: "Je le prends !",
    note: "La conclusion victorieuse de la negociation."
  },
  {
    id: "sho-017", theme: "shopping",
    franco: "raje3lak bokra",
    arabe: "راجعلك بكرا",
    francais: "Je reviens demain",
    variantes: { versF: "raje3lik bokra" },
    note: "bokra = demain. Technique de negociation classique : partir pour mieux revenir."
  },
  {
    id: "sho-018", theme: "shopping",
    franco: "hayda kado la 7abibe",
    arabe: "هيدا كادو لحبيبي",
    francais: "C'est un cadeau pour mon cheri",
    note: "kado = cadeau (du francais !). la = pour."
  },

  // ===== VOYAGE =====
  {
    id: "voy-001", theme: "voyage",
    franco: "wen el matar ?",
    arabe: "وين المطار؟",
    francais: "Ou est l'aeroport ?",
    note: "matar = aeroport. A Beyrouth : matar Beirut."
  },
  {
    id: "voy-002", theme: "voyage",
    franco: "badde rou7 3a Beirut",
    arabe: "بدي روح ع بيروت",
    francais: "Je veux aller a Beyrouth",
    note: "rou7 = aller. 3a = vers. La structure pour toute destination."
  },
  {
    id: "voy-003", theme: "voyage",
    franco: "adde el taxi la hon ?",
    arabe: "قدي التاكسي لهون؟",
    francais: "C'est combien le taxi jusqu'ici ?",
    note: "TOUJOURS negocier le prix AVANT de monter dans un taxi libanais."
  },
  {
    id: "voy-004", theme: "voyage",
    franco: "wa2ef hon, 3mol ma3rouf",
    arabe: "وقف هون عمول معروف",
    francais: "Arrete-toi ici, s'il te plait",
    note: "wa2ef = arrete. Pour descendre du taxi ou du bus."
  },
  {
    id: "voy-005", theme: "voyage",
    franco: "3ala mahlak !",
    arabe: "على مهلك!",
    francais: "Doucement ! (au chauffeur)",
    note: "Indispensable : la conduite libanaise est un sport extreme."
  },
  {
    id: "voy-006", theme: "voyage",
    franco: "wen el ba7er ?",
    arabe: "وين البحر؟",
    francais: "Ou est la mer ?",
    note: "ba7er = mer. Au Liban elle n'est jamais loin."
  },
  {
    id: "voy-007", theme: "voyage",
    franco: "badde rou7 3al jabal",
    arabe: "بدي روح عالجبل",
    francais: "Je veux aller a la montagne",
    note: "jabal = montagne. Mer le matin, ski l'apres-midi : la fierte nationale."
  },
  {
    id: "voy-008", theme: "voyage",
    franco: "fi ghurfe fadye ?",
    arabe: "في غرفة فاضية؟",
    francais: "Il y a une chambre libre ?",
    note: "ghurfe = chambre. fadye = libre, vide."
  },
  {
    id: "voy-009", theme: "voyage",
    franco: "adde el layle ?",
    arabe: "قدي الليلة؟",
    francais: "C'est combien la nuit ?",
    note: "layle = nuit. Pour l'hotel ou la maison d'hotes."
  },
  {
    id: "voy-010", theme: "voyage",
    franco: "day3ane ana",
    arabe: "ضيعانة أنا",
    francais: "Je suis perdue",
    genreLocuteur: "f",
    note: "Au feminin (toi). Un homme dirait day3an. Dite avec le sourire, quelqu'un t'accompagnera carrement jusqu'a destination."
  },
  {
    id: "voy-011", theme: "voyage",
    franco: "3a chmel aw 3a yamin ?",
    arabe: "ع شمال أو ع يمين؟",
    francais: "A gauche ou a droite ?",
    note: "chmel = gauche. yamin = droite."
  },
  {
    id: "voy-012", theme: "voyage",
    franco: "adde b3id ?",
    arabe: "قدي بعيد؟",
    francais: "C'est loin ?",
    note: "b3id = loin. Proche : arib. Reponse libanaise type : « 5 minutes » (jamais vrai)."
  },
  {
    id: "voy-013", theme: "voyage",
    franco: "emta byemche el bus ?",
    arabe: "إيمتى بيمشي الباص؟",
    francais: "Quand part le bus ?",
    note: "emta = quand. Reponse honnete : quand il est plein."
  },
  {
    id: "voy-014", theme: "voyage",
    franco: "sourra hon !",
    arabe: "صورة هون!",
    francais: "Une photo ici !",
    note: "sourra = photo. Pour immortaliser Raouche, Jeita ou Baalbek."
  },
  {
    id: "voy-015", theme: "voyage",
    franco: "chou hal manzar !",
    arabe: "شو هالمنظر!",
    francais: "Quelle vue !",
    note: "manzar = vue, paysage. A dire du haut de Harissa."
  },
  {
    id: "voy-016", theme: "voyage",
    franco: "el jaw 7elo lyom",
    arabe: "الجو حلو اليوم",
    francais: "Il fait beau aujourd'hui",
    note: "jaw = temps, meteo, ambiance. lyom = aujourd'hui."
  },
  {
    id: "voy-017", theme: "voyage",
    franco: "chob ktir !",
    arabe: "شوب كتير!",
    francais: "Il fait tres chaud !",
    note: "chob = chaleur. L'ete libanais en un mot. Froid : bard."
  },
  {
    id: "voy-018", theme: "voyage",
    franco: "ma3e passport franseve",
    arabe: "معي باسبور فرنساوي",
    francais: "J'ai un passeport francais",
    note: "franseve = francais(e). Utile a l'aeroport et aux checkpoints."
  },

  // ===== SORTIR =====
  {
    id: "sor-001", theme: "sortir",
    franco: "chou 3am na3mel lyom ?",
    arabe: "شو عم نعمل اليوم؟",
    francais: "On fait quoi aujourd'hui ?",
    note: "na3mel = on fait. La question du samedi matin."
  },
  {
    id: "sor-002", theme: "sortir",
    franco: "yalla nrou7 !",
    arabe: "يلا نروح!",
    francais: "Allez, on y va !",
    note: "nrou7 = on va. yalla + verbe = le moteur de toute sortie libanaise."
  },
  {
    id: "sor-003", theme: "sortir",
    franco: "baddik tejé ma3na ?",
    arabe: "بدك تجي معنا؟",
    francais: "Tu veux venir avec nous ?",
    note: "Forme adressee a elle. ma3na = avec nous."
  },
  {
    id: "sor-004", theme: "sortir",
    franco: "akid !",
    arabe: "أكيد!",
    francais: "Bien sur !",
    note: "La reponse enthousiaste a toute invitation."
  },
  {
    id: "sor-005", theme: "sortir",
    franco: "ma fiye lyom",
    arabe: "ما فيي اليوم",
    francais: "Je ne peux pas aujourd'hui",
    note: "ma fiye = je ne peux pas. Pour decliner sans vexer, ajouter : marra tenye (une autre fois)."
  },
  {
    id: "sor-006", theme: "sortir",
    franco: "emta mnelta2a ?",
    arabe: "إيمتى منلتقى؟",
    francais: "On se retrouve quand ?",
    note: "mnelta2a = on se retrouve. Reponse libanaise : « vers 9h » = 10h30."
  },
  {
    id: "sor-007", theme: "sortir",
    franco: "wasalet ?",
    arabe: "وصلت؟",
    francais: "Tu es arrive(e) ?",
    note: "Le texto qu'on s'envoie. Reponse : 3al tari2 (en route) ou wselet (je suis la)."
  },
  {
    id: "sor-008", theme: "sortir",
    franco: "el sahra kenet khyele",
    arabe: "السهرة كانت خيالية",
    francais: "La soiree etait incroyable",
    note: "sahra = soiree. khyele = de reve, irreelle."
  },
  {
    id: "sor-009", theme: "sortir",
    franco: "badde or2os !",
    arabe: "بدي أرقص!",
    francais: "Je veux danser !",
    note: "or2os = je danse. Impossible d'y echapper des que la dabke commence."
  },
  {
    id: "sor-010", theme: "sortir",
    franco: "hal oghniye bet jannen",
    arabe: "هالأغنية بتجنن",
    francais: "Cette chanson est geniale",
    note: "oghniye = chanson. bet jannen = elle rend fou (= elle dechire)."
  },
  {
    id: "sor-011", theme: "sortir",
    franco: "nrou7 3al cinema ?",
    arabe: "نروح عالسينما؟",
    francais: "On va au cinema ?",
    note: "Structure : nrou7 3a + lieu. Le « ? » se joue a l'intonation."
  },
  {
    id: "sor-012", theme: "sortir",
    franco: "kasak !",
    arabe: "كاسك!",
    francais: "Sante ! (trinquer)",
    note: "kas = verre. Se dit en levant son verre, souvent d'arak."
  },
  {
    id: "sor-013", theme: "sortir",
    franco: "d7ekna ktir",
    arabe: "ضحكنا كتير",
    francais: "On a beaucoup ri",
    note: "d7ek = rire. Le bilan d'une bonne soiree."
  },
  {
    id: "sor-014", theme: "sortir",
    franco: "sohrane la bokra ?",
    arabe: "سهرانة لبكرا؟",
    francais: "Debout jusqu'a demain ?",
    genreLocuteur: "f",
    note: "sohrane au feminin : qui veille tard. Les soirees libanaises finissent au lever du soleil."
  },
  {
    id: "sor-015", theme: "sortir",
    franco: "3azumye 3ande !",
    arabe: "عزيمة عندي!",
    francais: "C'est moi qui invite !",
    note: "Prononcer cette phrase declenche une bataille rituelle pour payer. Bonne chance."
  },
  {
    id: "sor-016", theme: "sortir",
    franco: "wen ahla mat3am hon ?",
    arabe: "وين أحلى مطعم هون؟",
    francais: "Ou est le meilleur restaurant ici ?",
    note: "ahla = le plus beau / le meilleur. Question qui declenche des debats sans fin."
  },

  // ===== CULTURE =====
  {
    id: "cul-001", theme: "culture",
    franco: "Lebnen",
    arabe: "لبنان",
    francais: "Le Liban",
    note: "Le pays se dit Lebnen en libanais, Loubnan en arabe standard."
  },
  {
    id: "cul-002", theme: "culture",
    franco: "el arze",
    arabe: "الأرزة",
    francais: "Le cedre",
    note: "L'arbre du drapeau. Les cedres millenaires de Bcharre sont classes a l'UNESCO."
  },
  {
    id: "cul-003", theme: "culture",
    franco: "dabke",
    arabe: "دبكة",
    francais: "La dabke (danse traditionnelle)",
    note: "Danse en ligne, epaule contre epaule, qui ouvre tous les mariages. Elle y aura droit."
  },
  {
    id: "cul-004", theme: "culture",
    franco: "Fairuz",
    arabe: "فيروز",
    francais: "Fairuz (la chanteuse)",
    note: "LA voix du Liban. Regle sacree : le matin, on ecoute Fairuz. Pas de debat."
  },
  {
    id: "cul-005", theme: "culture",
    franco: "arak",
    arabe: "عرق",
    francais: "L'arak (alcool anise)",
    note: "L'alcool national, a l'anis, coupe d'eau. Se trouble et devient blanc : magie."
  },
  {
    id: "cul-006", theme: "culture",
    franco: "day3a",
    arabe: "ضيعة",
    francais: "Le village (d'origine)",
    note: "Chaque Libanais a SA day3a et y remonte le week-end. On lui demandera la sienne."
  },
  {
    id: "cul-007", theme: "culture",
    franco: "sobhiye",
    arabe: "صبحية",
    francais: "Le cafe du matin entre voisines",
    note: "Institution : cafe, potins et man2ouche en matinee. Intraduisible et sacre."
  },
  {
    id: "cul-008", theme: "culture",
    franco: "3azime",
    arabe: "عزيمة",
    francais: "L'invitation a manger",
    note: "Refuser une 3azime est quasi impossible. Y aller le ventre vide, toujours."
  },
  {
    id: "cul-009", theme: "culture",
    franco: "jar",
    arabe: "جار",
    francais: "Le voisin",
    note: "Au Liban le voisin fait partie de la famille. Il sait tout, il donne tout."
  },
  {
    id: "cul-010", theme: "culture",
    franco: "tfaddale !",
    arabe: "تفضلي!",
    francais: "Je t'en prie, entre / sers-toi !",
    note: "Forme dite A elle. Le mot de l'hospitalite : entre, assieds-toi, mange, prends."
  },
  {
    id: "cul-011", theme: "culture",
    franco: "nharak sa3id",
    arabe: "نهارك سعيد",
    francais: "Bonne journee",
    variantes: { versF: "nharik sa3id" },
    note: "Plus formel que yalla bye, tres apprecie des commercants et des tetas."
  },
  {
    id: "cul-012", theme: "culture",
    franco: "Allah ma3ik",
    arabe: "الله معك",
    francais: "Que Dieu soit avec toi (au revoir)",
    variantes: { versF: "Allah ma3ik" },
    note: "Forme dite A elle. Elle, a un homme, dira : Allah ma3ak."
  },
  {
    id: "cul-013", theme: "culture",
    franco: "ya 3ayne !",
    arabe: "يا عيني!",
    francais: "Magnifique ! (admiration)",
    note: "Litteralement « oh mon oeil ! ». S'exclame devant un beau paysage, un bebe, un plat."
  },
  {
    id: "cul-014", theme: "culture",
    franco: "to2borne",
    arabe: "تقبرني",
    francais: "Je t'adore (litt. « enterre-moi »)",
    note: "Le mot d'amour le plus libanais : « que tu m'enterres » = que je meure avant de te perdre. Intense, on avait prevenu."
  },
  {
    id: "cul-015", theme: "culture",
    franco: "ne3eman",
    arabe: "نعيماً",
    francais: "Se dit apres une douche ou une coupe de cheveux",
    note: "Intraduisible : « que ce soit une grace ». Reponse : Allah yen3am 3leik."
  },
  {
    id: "cul-016", theme: "culture",
    franco: "sa7tein w 3afye",
    arabe: "صحتين وعافية",
    francais: "Grand bon appetit",
    note: "Version longue de sa7ten, pour les grandes tablees du dimanche."
  },
  {
    id: "cul-017", theme: "culture",
    franco: "beit jeddo",
    arabe: "بيت جدو",
    francais: "La maison de grand-pere",
    note: "beit = maison. Lieu mythique de tous les souvenirs d'enfance libanais."
  },
  {
    id: "cul-018", theme: "culture",
    franco: "el gharbe",
    arabe: "الغربة",
    francais: "L'exil, vivre loin du pays",
    note: "Mot charge : plus de Libanais vivent dehors que dedans. Toute famille connait la gharbe."
  },
];
