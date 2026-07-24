// Yalla : toute la logique de l'app. Zero reseau a l'execution, zero dependance.

/* ===== Etat & persistance ===== */

const CLE_STOCKAGE = "yalla_v1";

const etatDefaut = () => ({
  boites: {},            // id -> { boite: 1-4, due: timestamp }
  joursPratiques: [],    // ["2026-07-24", ...] jours ou une activite a ete terminee
  guideVu: false,
  arabeVisible: false,
  nouvellesDuJour: { jour: "", ids: [] },
});

let etat = chargerEtat();

function chargerEtat() {
  try {
    const brut = localStorage.getItem(CLE_STOCKAGE);
    if (brut) return Object.assign(etatDefaut(), JSON.parse(brut));
  } catch (e) { /* stockage corrompu : on repart de zero */ }
  return etatDefaut();
}

function sauver() {
  try { localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat)); } catch (e) { /* stockage plein ou bloque */ }
}

function aujourdhui() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

/* ===== Leitner (4 boites) =====
   Boite 1 : revoir chaque jour. Boite 2 : dans 2 jours.
   Boite 3 : dans 5 jours. Boite 4 : dans 14 jours.
   "Pas encore" renvoie toujours en boite 1. */

const INTERVALLES_JOURS = { 1: 1, 2: 2, 3: 5, 4: 14 };
const JOUR_MS = 24 * 60 * 60 * 1000;

function reponseCarte(id, savait) {
  const actuel = etat.boites[id] || { boite: 0, due: 0 };
  const boite = savait ? Math.min(4, (actuel.boite || 0) + 1) : 1;
  etat.boites[id] = { boite, due: Date.now() + INTERVALLES_JOURS[boite] * JOUR_MS };
  sauver();
}

function cartesDues() {
  const maintenant = Date.now();
  return PHRASES.filter((p) => {
    const b = etat.boites[p.id];
    return b && b.boite > 0 && b.due <= maintenant;
  });
}

function cartesNouvelles() {
  return PHRASES.filter((p) => !etat.boites[p.id] && !themePar(p.theme).bientot);
}

// Plafond : 6 nouvelles par jour, zero si plus de 15 revisions dues
function nouvellesPourAujourdhui(nbDues) {
  if (nbDues > 15) return [];
  const jour = aujourdhui();
  if (etat.nouvellesDuJour.jour !== jour) etat.nouvellesDuJour = { jour, ids: [] };
  const dejaVues = etat.nouvellesDuJour.ids.length;
  const reste = Math.max(0, 6 - dejaVues);
  return cartesNouvelles().slice(0, reste);
}

function marquerJourPratique() {
  const jour = aujourdhui();
  if (!etat.joursPratiques.includes(jour)) {
    etat.joursPratiques.push(jour);
    if (etat.joursPratiques.length > 400) etat.joursPratiques = etat.joursPratiques.slice(-400);
    sauver();
  }
}

function calculerStreak() {
  const jours = new Set(etat.joursPratiques);
  let streak = 0;
  let d = new Date();
  // Le jour courant compte s'il est pratique, sinon on part d'hier
  if (!jours.has(aujourdhui())) d = new Date(Date.now() - JOUR_MS);
  while (true) {
    const cle = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    if (!jours.has(cle)) break;
    streak++;
    d = new Date(d.getTime() - JOUR_MS);
  }
  return streak;
}

/* ===== Aides contenu ===== */

function themePar(id) { return THEMES.find((t) => t.id === id); }
function phrasesDuTheme(id) { return PHRASES.filter((p) => p.theme === id); }
function aAudio(id) { return AUDIO_MANIFEST.includes(id); }

function melanger(tab) {
  const t = tab.slice();
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

// Distracteurs : meme theme, longueur comparable, jamais la bonne reponse
function distracteurs(phrase, champ, n) {
  const memeTheme = phrasesDuTheme(phrase.theme).filter((p) => p.id !== phrase.id);
  const parProximite = memeTheme.slice().sort((a, b) =>
    Math.abs(a[champ].length - phrase[champ].length) - Math.abs(b[champ].length - phrase[champ].length)
  );
  const candidats = parProximite.slice(0, Math.max(n * 2, 6));
  return melanger(candidats).slice(0, n);
}

/* ===== Audio ===== */

let lecteurAudio = null;

function jouerAudio(id, versF) {
  const fichier = versF ? id + "_f" : id;
  if (!aAudio(fichier)) { toast("Audio pas encore enregistre"); return; }
  if (lecteurAudio) { lecteurAudio.pause(); }
  lecteurAudio = new Audio("audio/" + fichier + ".m4a");
  lecteurAudio.play().catch(() => toast("Impossible de lire l'audio"));
}

/* ===== Rendu ===== */

const app = document.getElementById("app");

function html(morceaux, ...valeurs) {
  return morceaux.reduce((acc, m, i) => acc + m + (valeurs[i] ?? ""), "");
}

function echapper(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function toast(message) {
  document.querySelectorAll(".toast").forEach((t) => t.remove());
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function entete(titre, retour) {
  return html`
    <div class="entete">
      ${retour ? `<button class="retour" data-action="accueil">&larr; Retour</button>` : `<h1>${titre}</h1>`}
      ${retour ? `<h1 style="font-size:1.1rem">${titre}</h1>` : ""}
      <div class="streak">🔥 ${calculerStreak()}</div>
    </div>`;
}

/* ===== Ecran : accueil ===== */

function ecranAccueil() {
  themeCourant = null;
  const dues = cartesDues();
  const nouvelles = nouvellesPourAujourdhui(dues.length);
  const total = dues.length + nouvelles.length;
  const audioDispo = AUDIO_MANIFEST.length > 0;

  const themesHtml = THEMES.map((t) => {
    const phrases = phrasesDuTheme(t.id);
    if (t.bientot) {
      return `<div class="carte-theme bientot">
        <div class="emoji" style="background:${t.couleur}22">${t.emoji}</div>
        <div class="infos"><div class="nom">${t.nom}</div><div class="detail">Bientot disponible</div></div>
      </div>`;
    }
    const apprises = phrases.filter((p) => (etat.boites[p.id] || {}).boite >= 1).length;
    const maitrisees = phrases.filter((p) => (etat.boites[p.id] || {}).boite === 4).length;
    const pct = phrases.length ? Math.round((apprises / phrases.length) * 100) : 0;
    return `<button class="carte-theme" data-action="theme" data-theme="${t.id}">
      <div class="emoji" style="background:${t.couleur}22">${t.emoji}</div>
      <div class="infos">
        <div class="nom">${t.nom}</div>
        <div class="detail">${apprises}/${phrases.length} vues, ${maitrisees} maitrisees</div>
        <div class="barre-progression"><div class="remplie" style="width:${pct}%;background:${t.couleur}"></div></div>
      </div>
    </button>`;
  }).join("");

  app.innerHTML = html`
    ${entete("Yalla Izo 🇱🇧", false)}
    <p class="salutation">Ahla Isaure ! Quelques minutes par jour, chwaye chwaye.</p>

    <button class="bouton-principal" data-action="session">
      <div class="titre">Session du jour</div>
      <div class="sous-titre">${total > 0
        ? `${dues.length} a revoir, ${nouvelles.length} nouvelle${nouvelles.length > 1 ? "s" : ""}`
        : "Tout est a jour ! Une revision libre ?"}</div>
    </button>

    <div class="grille-modes">
      <button class="carte-mode" data-action="rappel">
        <div class="emoji">🗣️</div>
        <div class="titre">Rappel actif</div>
        <div class="sous-titre">Tu lis le francais, tu dis la phrase a voix haute</div>
      </button>
      <button class="carte-mode" data-action="shadowing">
        <div class="emoji">🎧</div>
        <div class="titre">Shadowing</div>
        <div class="sous-titre">Tu ecoutes l'audio, tu repetes juste apres</div>
      </button>
      <button class="carte-mode" data-action="quiz-ecoute">
        <div class="emoji">👂</div>
        <div class="titre">Quiz d'ecoute</div>
        <div class="sous-titre">Audio seul : retrouve le sens</div>
      </button>
      <button class="carte-mode" data-action="quiz-sens">
        <div class="emoji">🧠</div>
        <div class="titre">Quiz de sens</div>
        <div class="sous-titre">Francais : retrouve la phrase libanaise</div>
      </button>
      <button class="carte-mode" data-action="ecriture" style="grid-column: 1 / -1">
        <div class="emoji">✍️</div>
        <div class="titre">Ecrire en libanais</div>
        <div class="sous-titre">Tape la phrase en franco-arabe, l'app te corrige</div>
      </button>
    </div>

    <div class="section-titre">Themes</div>
    <div class="liste-themes">${themesHtml}</div>

    <div class="pied-liens">
      <button data-action="guide">Guide du franco-arabe</button>
      ${audioDispo ? `<button data-action="telecharger-audio">Audios hors ligne</button>` : ""}
      <button data-action="exporter">Sauvegarder ma progression</button>
      <button data-action="importer">Restaurer</button>
    </div>
    <input type="file" id="fichier-import" accept="application/json" style="display:none">
  `;
}

/* ===== Ecran : guide franco-arabe ===== */

function ecranGuide(premierLancement) {
  const lignes = [
    ["3", "La lettre ع : un « a » profond, serre au fond de la gorge.", "3arabe = arabe, 3ayle = famille"],
    ["7", "La lettre ح : un « h » tres souffle, comme une buee sur une vitre.", "7abibe = mon cheri, mar7aba = bonjour"],
    ["2", "La lettre ء : un petit arret de la voix, comme dans « uh-oh ».", "la2 = non"],
    ["kh", "La lettre خ : le son de la jota espagnole, ou « Bach » en allemand.", "khebez = pain"],
    ["gh", "La lettre غ : un « r » francais doux, presque garguarise.", "ghale = cher"],
    ["ch", "Se lit comme en francais (« chou »).", "chou = quoi, chokran = merci"],
    ["ou", "Se lit comme en francais (« ou »).", "jou3ane = affamee"],
  ];
  app.innerHTML = html`
    ${premierLancement ? `<div class="entete"><h1>Yalla Izo 🇱🇧</h1></div>` : entete("Guide", true)}
    <div class="guide">
      <h2>Lire le franco-arabe</h2>
      <p class="intro">Le libanais s'ecrit ici en lettres latines, comme les Libanais le font sur WhatsApp.
      Quelques chiffres remplacent les sons qui n'existent pas en francais. C'est tout ce qu'il faut savoir :</p>
      ${lignes.map(([s, e, ex]) => `
        <div class="ligne-guide">
          <div class="symbole">${s}</div>
          <div class="explication">${e}<br><span class="exemple">${ex}</span></div>
        </div>`).join("")}
    </div>
    ${premierLancement
      ? `<button class="btn-plein" data-action="fin-guide">C'est parti !</button>`
      : `<button class="btn-plein" data-action="accueil">Retour a l'accueil</button>`}
  `;
}

/* ===== Sessions d'exercices =====
   Une session = une file de cartes + un mode. On avance carte par carte. */

let session = null;

function demarrerSession(mode, cartes, options) {
  if (cartes.length === 0) { ecranFinVide(mode); return; }
  session = { mode, file: cartes, index: 0, revele: false, bonnes: 0, options: options || {} };
  rendreCarte();
}

function carteActuelle() { return session.file[session.index]; }

function avancer() {
  session.index++;
  session.revele = false;
  session.resultatEcriture = null;
  if (session.index >= session.file.length) { ecranFin(); return; }
  rendreCarte();
}

function ecranFin() {
  marquerJourPratique();
  const messages = [
    "3anjad bravo ! (serieusement, bravo)",
    "Ktir mni7 ! (tres bien)",
    "Chwaye chwaye, tu y arrives.",
    "Chadi va etre impressionne.",
    "Encore un pas vers le Liban.",
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  app.innerHTML = html`
    ${entete("", true)}
    <div class="ecran-fin">
      <div class="gros-emoji">🎉</div>
      <h2>Session terminee !</h2>
      <p>${session.file.length} carte${session.file.length > 1 ? "s" : ""} travaillee${session.file.length > 1 ? "s" : ""}. ${msg}</p>
      <button class="btn-plein" data-action="accueil">Retour a l'accueil</button>
    </div>
  `;
  session = null;
}

function ecranFinVide(mode) {
  const besoinAudio = mode === "shadowing" || mode === "quiz-ecoute";
  app.innerHTML = html`
    ${entete("", true)}
    <div class="ecran-fin">
      <div class="gros-emoji">${besoinAudio ? "🎙️" : "✨"}</div>
      <h2>${besoinAudio ? "Pas encore d'audio" : "Tout est a jour !"}</h2>
      <p>${besoinAudio
        ? "Ce mode utilise les enregistrements de Chadi. Ils arrivent bientot !"
        : "Toutes tes cartes sont revisees. Reviens demain, ou lance une revision libre."}</p>
      ${besoinAudio ? "" : `<button class="btn-plein" data-action="revision-libre">Revision libre (8 cartes)</button>`}
      <button class="btn-neutre" style="border-radius:18px;padding:14px" data-action="accueil">Retour a l'accueil</button>
    </div>
  `;
}

/* ===== Rendu d'une carte selon le mode ===== */

function blocVariante(p) {
  if (!p.variantes || !p.variantes.versF) return "";
  return `<div class="variante">a une femme : <strong>${echapper(p.variantes.versF)}</strong></div>`;
}

function blocGenre(p) {
  return p.genreLocuteur === "f" ? `<span class="badge-genre">au feminin : c'est toi qui parles</span>` : "";
}

function blocNote(p) {
  return p.note ? `<div class="note">💡 ${echapper(p.note)}</div>` : "";
}

function blocArabe(p) {
  return etat.arabeVisible ? `<div class="arabe">${echapper(p.arabe)}</div>` : "";
}

function boutonAudio(p, petit) {
  if (!aAudio(p.id)) return "";
  return `<button class="bouton-audio ${petit ? "petit" : ""}" data-action="jouer" data-id="${p.id}">▶</button>`;
}

function toggleArabe() {
  return `<label class="toggle-arabe"><input type="checkbox" id="toggle-arabe" ${etat.arabeVisible ? "checked" : ""}> Afficher l'ecriture arabe</label>`;
}

function rendreCarte() {
  const p = carteActuelle();
  const compteur = `<div class="compteur">${session.index + 1} / ${session.file.length}</div>`;

  if (session.mode === "session" || session.mode === "rappel") {
    const estNouvelle = session.mode === "session" && !etat.boites[p.id];
    if (estNouvelle && !session.revele) session.revele = true; // une nouvelle carte se presente entierement

    if (!session.revele) {
      // Face question : le francais, elle dit la phrase a voix haute
      app.innerHTML = html`
        ${entete(session.mode === "session" ? "Session du jour" : "Rappel actif", true)}
        <div class="ecran-exercice">
          <div class="bandeau-mode"><strong>Dis la phrase a voix haute</strong> avant de retourner la carte.</div>
          ${compteur}
          <div class="flashcard">
            <div class="francais" style="font-size:1.4rem;font-weight:700">${echapper(p.francais)}</div>
            ${blocGenre(p)}
            <div class="invite">Comment tu dis ca en libanais ?</div>
          </div>
          <div class="actions-bas">
            <button class="btn-reveler" data-action="reveler">Retourner la carte</button>
          </div>
        </div>
      `;
    } else {
      app.innerHTML = html`
        ${entete(session.mode === "session" ? "Session du jour" : "Rappel actif", true)}
        <div class="ecran-exercice">
          <div class="bandeau-mode">${estNouvelle ? "<strong>Nouvelle phrase !</strong> Lis-la, ecoute-la, repete-la." : "Alors, tu l'avais ?"}</div>
          ${compteur}
          <div class="flashcard">
            <div class="franco">${echapper(p.franco)}</div>
            ${blocArabe(p)}
            <div class="francais">${echapper(p.francais)}</div>
            ${blocGenre(p)}
            ${blocVariante(p)}
            ${boutonAudio(p)}
            ${blocNote(p)}
          </div>
          ${toggleArabe()}
          <div class="actions-bas">
            ${estNouvelle
              ? `<button class="btn-savais" data-action="nouvelle-vue">C'est note !</button>`
              : `<button class="btn-pas-encore" data-action="repondre" data-savait="0">Pas encore</button>
                 <button class="btn-savais" data-action="repondre" data-savait="1">Je savais !</button>`}
          </div>
        </div>
      `;
    }
    return;
  }

  if (session.mode === "shadowing") {
    app.innerHTML = html`
      ${entete("Shadowing", true)}
      <div class="ecran-exercice">
        <div class="bandeau-mode"><strong>Ecoute, puis repete a voix haute.</strong> Re-ecoute pour comparer, autant de fois que tu veux.</div>
        ${compteur}
        <div class="flashcard">
          ${session.revele ? `
            <div class="franco">${echapper(p.franco)}</div>
            ${blocArabe(p)}
            <div class="francais">${echapper(p.francais)}</div>` : `
            <div class="invite">Audio seul. Ecoute bien, repete, puis affiche le texte si besoin.</div>`}
          <div class="zone-shadowing">
            <button class="bouton-audio" data-action="jouer" data-id="${p.id}">▶</button>
            <button class="bouton-audio enregistre" data-action="micro" title="S'enregistrer pour se comparer">🎙️</button>
          </div>
          <div id="zone-lecture-micro"></div>
        </div>
        <div class="actions-bas">
          ${session.revele ? "" : `<button class="btn-neutre" data-action="reveler">Voir le texte</button>`}
          <button class="btn-savais" data-action="suivant">Suivant</button>
        </div>
      </div>
    `;
    return;
  }

  if (session.mode === "ecriture") {
    const resultat = session.resultatEcriture; // null tant qu'elle n'a pas valide
    app.innerHTML = html`
      ${entete("Ecrire en libanais", true)}
      <div class="ecran-exercice">
        <div class="bandeau-mode"><strong>Ecris la phrase en franco-arabe.</strong> Rappel : 3 = ع, 7 = ح, 2 = ء.</div>
        ${compteur}
        <div class="question-quiz">
          <div class="texte">${echapper(p.francais)}</div>
          ${blocGenre(p)}
        </div>
        ${resultat ? `
          <div class="flashcard" style="flex:0;min-height:0;padding:20px">
            <div class="verdict ${resultat.type}">${resultat.type === "bon" ? "Sa77 ! (juste)" : resultat.type === "presque" ? "Presque !" : "Pas tout a fait"}</div>
            ${resultat.type !== "bon" ? `<div class="ta-reponse">Ta reponse : ${echapper(resultat.saisie) || "(vide)"}</div>` : ""}
            <div class="franco">${echapper(p.franco)}</div>
            ${blocArabe(p)}
            ${boutonAudio(p, true)}
          </div>
          <div class="actions-bas"><button class="btn-savais" data-action="suivant">Suivant</button></div>` : `
          <form id="forme-ecriture" autocomplete="off">
            <input type="text" id="saisie-ecriture" class="champ-ecriture" placeholder="chou baddik ?"
              autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="done">
            <div class="actions-bas">
              <button type="submit" class="btn-reveler">Verifier</button>
            </div>
          </form>`}
      </div>
    `;
    const champ = document.getElementById("saisie-ecriture");
    if (champ) champ.focus();
    return;
  }

  if (session.mode === "quiz-ecoute" || session.mode === "quiz-sens") {
    const estEcoute = session.mode === "quiz-ecoute";
    if (!session.choix || session.choixPour !== p.id) {
      const champ = estEcoute ? "francais" : "franco";
      session.choix = melanger([p, ...distracteurs(p, champ, 3)]);
      session.choixPour = p.id;
      session.repondu = false;
    }
    app.innerHTML = html`
      ${entete(estEcoute ? "Quiz d'ecoute" : "Quiz de sens", true)}
      <div class="ecran-exercice">
        <div class="bandeau-mode">${estEcoute
          ? "<strong>Ecoute</strong> et choisis le bon sens."
          : "<strong>Lis le francais</strong> et choisis la bonne phrase."}</div>
        ${compteur}
        <div class="question-quiz">
          ${estEcoute
            ? `<button class="bouton-audio" data-action="jouer" data-id="${p.id}">▶</button>`
            : `<div class="texte">${echapper(p.francais)}</div>`}
        </div>
        <div class="choix">
          ${session.choix.map((c) => {
            const texte = estEcoute ? c.francais : c.franco;
            let classe = "";
            if (session.repondu) {
              if (c.id === p.id) classe = "bon";
              else if (c.id === session.choisi) classe = "mauvais";
            }
            return `<button class="${classe}" data-action="choisir" data-id="${c.id}" ${session.repondu ? "disabled" : ""}>${echapper(texte)}</button>`;
          }).join("")}
        </div>
        ${session.repondu ? `<div class="actions-bas"><button class="btn-savais" data-action="suivant">Suivant</button></div>` : ""}
      </div>
    `;
    return;
  }
}

/* ===== Mode ecriture : comparaison tolerante ===== */

// Normalise une saisie franco-arabe : minuscules, sans ponctuation ni accents,
// espaces reduits. On ne convertit pas 3/7/2 : les apprendre fait partie du jeu.
function normaliserFranco(s) {
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[?!.,;:'"«»()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function distanceEdition(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prec = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cour = [i];
    for (let j = 1; j <= n; j++) {
      cour[j] = Math.min(
        prec[j] + 1,
        cour[j - 1] + 1,
        prec[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prec = cour;
  }
  return prec[n];
}

function corrigerEcriture(saisie, phrase) {
  const attendu = normaliserFranco(phrase.franco);
  const donne = normaliserFranco(saisie);
  const d = distanceEdition(donne, attendu);
  const tolerance = attendu.length > 12 ? 2 : 1;
  if (d === 0) return "bon";
  if (d <= tolerance) return "presque";
  return "faux";
}

/* ===== Micro (shadowing) : enregistrement local, rien n'est envoye ===== */

let enregistreur = null;

async function basculerMicro() {
  if (enregistreur && enregistreur.state === "recording") {
    enregistreur.stop();
    return;
  }
  if (!navigator.mediaDevices || !window.MediaRecorder) {
    toast("Enregistrement non disponible sur ce navigateur");
    return;
  }
  try {
    const flux = await navigator.mediaDevices.getUserMedia({ audio: true });
    const morceaux = [];
    enregistreur = new MediaRecorder(flux);
    enregistreur.ondataavailable = (e) => morceaux.push(e.data);
    enregistreur.onstop = () => {
      flux.getTracks().forEach((t) => t.stop());
      const blob = new Blob(morceaux);
      const zone = document.getElementById("zone-lecture-micro");
      if (zone) {
        const url = URL.createObjectURL(blob);
        zone.innerHTML = `<audio controls src="${url}" style="width:100%;margin-top:10px"></audio>`;
      }
      enregistreur = null;
    };
    enregistreur.start();
    toast("Enregistrement... re-tape sur le micro pour arreter");
  } catch (e) {
    toast("Acces au micro refuse");
  }
}

/* ===== Export / import de la progression ===== */

function exporterProgression() {
  const blob = new Blob([JSON.stringify(etat, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "yalla-progression-" + aujourdhui() + ".json";
  a.click();
  toast("Progression sauvegardee dans tes fichiers");
}

function importerProgression(fichier) {
  const lecteur = new FileReader();
  lecteur.onload = () => {
    try {
      const donnees = JSON.parse(lecteur.result);
      if (!donnees || typeof donnees.boites !== "object") throw new Error("format");
      etat = Object.assign(etatDefaut(), donnees);
      sauver();
      toast("Progression restauree !");
      ecranAccueil();
    } catch (e) {
      toast("Fichier non reconnu");
    }
  };
  lecteur.readAsText(fichier);
}

/* ===== Telechargement des audios pour le hors ligne ===== */

async function telechargerAudios() {
  if (AUDIO_MANIFEST.length === 0) { toast("Aucun audio disponible pour le moment"); return; }
  const banniere = document.createElement("div");
  banniere.className = "progression-telechargement";
  banniere.textContent = "Telechargement des audios...";
  app.prepend(banniere);
  let ok = 0;
  for (let i = 0; i < AUDIO_MANIFEST.length; i++) {
    try {
      await fetch("audio/" + AUDIO_MANIFEST[i] + ".m4a"); // le service worker met en cache au passage
      ok++;
    } catch (e) { /* fichier manquant ou hors ligne */ }
    banniere.textContent = `Telechargement des audios... ${i + 1} / ${AUDIO_MANIFEST.length}`;
  }
  banniere.textContent = `${ok} audios disponibles hors ligne !`;
  setTimeout(() => banniere.remove(), 2500);
}

/* ===== Lancement des modes ===== */

function lancerSessionDuJour() {
  const dues = melanger(cartesDues());
  const nouvelles = nouvellesPourAujourdhui(dues.length);
  nouvelles.forEach((p) => {
    if (!etat.nouvellesDuJour.ids.includes(p.id)) etat.nouvellesDuJour.ids.push(p.id);
  });
  sauver();
  demarrerSession("session", [...nouvelles, ...dues]);
}

function lancerRevisionLibre() {
  const connues = PHRASES.filter((p) => etat.boites[p.id]);
  demarrerSession("rappel", melanger(connues).slice(0, 8));
}

function lancerRappel() {
  const connues = PHRASES.filter((p) => etat.boites[p.id]);
  const source = connues.length >= 4 ? connues : PHRASES.filter((p) => !themePar(p.theme).bientot);
  demarrerSession("rappel", melanger(source).slice(0, 10));
}

function lancerShadowing() {
  const avecAudio = PHRASES.filter((p) => aAudio(p.id));
  demarrerSession("shadowing", melanger(avecAudio).slice(0, 8));
}

function lancerQuizEcoute() {
  const avecAudio = PHRASES.filter((p) => aAudio(p.id));
  demarrerSession("quiz-ecoute", melanger(avecAudio).slice(0, 8));
}

function lancerQuizSens() {
  const source = PHRASES.filter((p) => !themePar(p.theme).bientot);
  demarrerSession("quiz-sens", melanger(source).slice(0, 8));
}

function lancerEcriture() {
  // En priorite les phrases deja vues ; sinon tout le corpus disponible
  const connues = PHRASES.filter((p) => etat.boites[p.id]);
  const source = connues.length >= 4 ? connues : PHRASES.filter((p) => !themePar(p.theme).bientot);
  demarrerSession("ecriture", melanger(source).slice(0, 8));
}

/* ===== Ecran : liste d'un theme ===== */

let themeCourant = null;

function ecranTheme(idTheme) {
  themeCourant = idTheme;
  const t = themePar(idTheme);
  const phrases = phrasesDuTheme(idTheme);
  app.innerHTML = html`
    ${entete(t.emoji + " " + t.nom, true)}
    ${toggleArabe()}
    <div class="liste-phrases">
      ${phrases.map((p) => {
        const b = etat.boites[p.id];
        const etiquette = !b ? "nouveau" : b.boite === 4 ? "maitrise ✓" : "boite " + b.boite;
        return `<div class="carte-phrase">
          <div class="textes">
            <div class="franco">${echapper(p.franco)}${p.genreLocuteur === "f" ? " ♀" : ""}</div>
            <div class="francais">${echapper(p.francais)}</div>
            ${etat.arabeVisible ? `<div class="arabe">${echapper(p.arabe)}</div>` : ""}
          </div>
          <span class="boite">${etiquette}</span>
          ${boutonAudio(p, true)}
        </div>`;
      }).join("")}
    </div>
  `;
}

/* ===== Routage des clics ===== */

document.addEventListener("click", (e) => {
  const cible = e.target.closest("[data-action]");
  if (!cible) return;
  const action = cible.dataset.action;

  switch (action) {
    case "accueil": session = null; ecranAccueil(); break;
    case "guide": ecranGuide(false); break;
    case "fin-guide": etat.guideVu = true; sauver(); ecranAccueil(); break;
    case "session": lancerSessionDuJour(); break;
    case "rappel": lancerRappel(); break;
    case "revision-libre": lancerRevisionLibre(); break;
    case "shadowing": lancerShadowing(); break;
    case "quiz-ecoute": lancerQuizEcoute(); break;
    case "quiz-sens": lancerQuizSens(); break;
    case "ecriture": lancerEcriture(); break;
    case "theme": ecranTheme(cible.dataset.theme); break;
    case "jouer": jouerAudio(cible.dataset.id); break;
    case "micro": basculerMicro(); break;
    case "reveler": session.revele = true; rendreCarte(); break;
    case "suivant": avancer(); break;
    case "nouvelle-vue": reponseCarte(carteActuelle().id, false); avancer(); break;
    case "repondre": reponseCarte(carteActuelle().id, cible.dataset.savait === "1"); avancer(); break;
    case "choisir": {
      session.repondu = true;
      session.choisi = cible.dataset.id;
      const bon = cible.dataset.id === carteActuelle().id;
      if (bon) session.bonnes++;
      reponseCarte(carteActuelle().id, bon);
      rendreCarte();
      break;
    }
    case "exporter": exporterProgression(); break;
    case "importer": document.getElementById("fichier-import").click(); break;
    case "telecharger-audio": telechargerAudios(); break;
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id !== "forme-ecriture") return;
  e.preventDefault();
  const saisie = document.getElementById("saisie-ecriture").value;
  const p = carteActuelle();
  const type = corrigerEcriture(saisie, p);
  session.resultatEcriture = { type, saisie };
  reponseCarte(p.id, type !== "faux");
  if (type === "bon") session.bonnes++;
  rendreCarte();
  jouerAudio(p.id);
});

document.addEventListener("change", (e) => {
  if (e.target.id === "toggle-arabe") {
    etat.arabeVisible = e.target.checked;
    sauver();
    if (session) rendreCarte();
    else if (themeCourant) ecranTheme(themeCourant);
    else ecranAccueil();
  }
  if (e.target.id === "fichier-import" && e.target.files[0]) {
    importerProgression(e.target.files[0]);
    e.target.value = "";
  }
});

/* ===== Service worker ===== */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => { /* hors ligne ou file:// */ });
}

/* ===== Demarrage ===== */

if (!etat.guideVu) ecranGuide(true);
else ecranAccueil();
