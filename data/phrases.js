// Contenu de l'app. Convention franco-arabe standard francisee :
// "ch" (pas "sh"), "ou" (pas "u"), et les chiffres 3 = ع, 7 = ح, 2 = ء, gh = غ, kh = خ.
// Forme par defaut : Isaure (femme) parle a un homme.
// variantes.versF : forme quand elle s'adresse a une femme.
// genreLocuteur: "f" : la phrase decrit celle qui parle, la forme principale est le feminin.

const THEMES = [
  { id: "bases", nom: "Les bases", emoji: "👋", couleur: "#e8956b" },
  { id: "famille", nom: "Famille & amour", emoji: "❤️", couleur: "#d96c7b" },
  { id: "nourriture", nom: "Nourriture", emoji: "🍽️", couleur: "#7ba05b" },
  { id: "socialiser", nom: "Socialiser", emoji: "💬", couleur: "#5b8ea0", bientot: true },
  { id: "shopping", nom: "Shopping", emoji: "🛍️", couleur: "#a07b5b", bientot: true },
  { id: "voyage", nom: "Voyage", emoji: "✈️", couleur: "#6b7ba8", bientot: true },
  { id: "sortir", nom: "Sortir", emoji: "🎉", couleur: "#9b6ba8", bientot: true },
  { id: "culture", nom: "Culture", emoji: "🎶", couleur: "#c2a05b", bientot: true },
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
];
