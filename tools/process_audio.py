#!/usr/bin/env python3
"""Outillage audio de Yalla (developpement uniquement, jamais servi par l'app).

Prerequis : ffmpeg installe (brew install ffmpeg).

Trois commandes :

  python3 tools/process_audio.py liste
      Regenere tools/liste_enregistrement.md, le script de lecture pour Chadi.

  python3 tools/process_audio.py decouper <theme> <fichier_audio>
      Decoupe un memo vocal (une phrase apres l'autre, ~1,5 s de silence entre
      chaque, dans l'ordre de la liste) en un fichier par phrase dans audio/.
      Exemple : python3 tools/process_audio.py decouper bases recordings/bases.m4a

  python3 tools/process_audio.py fichier <id> <fichier_audio>
      Remplace l'audio d'une seule phrase (correction ponctuelle).
      Exemple : python3 tools/process_audio.py fichier bas-003 recordings/bas-003.m4a

Apres chaque export, data/audio_manifest.js est regenere automatiquement.
"""

import json
import re
import subprocess
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
FICHIER_PHRASES = RACINE / "data" / "phrases.js"
FICHIER_MANIFEST = RACINE / "data" / "audio_manifest.js"
DOSSIER_AUDIO = RACINE / "audio"
FICHIER_LISTE = RACINE / "tools" / "liste_enregistrement.md"

# Silence entre deux phrases : au moins 1 seconde sous -35 dB
SEUIL_SILENCE = "-35dB"
DUREE_SILENCE_MIN = 1.0


def lire_phrases():
    """Extrait les entrees de data/phrases.js sans moteur JS (regex sur les blocs)."""
    texte = FICHIER_PHRASES.read_text(encoding="utf-8")
    entrees = []
    for bloc in re.finditer(r"\{\s*id:\s*\"([a-z]+-\d+)\"(.*?)\n  \}", texte, re.S):
        ident, corps = bloc.group(1), bloc.group(2)

        def champ(nom):
            m = re.search(nom + r":\s*\"((?:[^\"\\]|\\.)*)\"", corps)
            return m.group(1) if m else None

        entrees.append({
            "id": ident,
            "theme": champ("theme"),
            "franco": champ("franco"),
            "versF": champ("versF"),
            "genreLocuteur": champ("genreLocuteur"),
        })
    return entrees


def pistes_du_theme(theme):
    """Liste ordonnee des pistes a enregistrer pour un theme.
    Chaque piste = (nom_fichier, texte_a_lire, remarque)."""
    pistes = []
    for p in lire_phrases():
        if p["theme"] != theme:
            continue
        remarque = ""
        if p["genreLocuteur"] == "f":
            remarque = "A LIRE TEL QUEL, au feminin, meme si ca sonne bizarre : c'est Isaure qui parle."
        pistes.append((p["id"], p["franco"], remarque))
        if p["versF"]:
            pistes.append((p["id"] + "_f", p["versF"], "Variante adressee a une femme."))
    return pistes


def themes_presents():
    vus = []
    for p in lire_phrases():
        if p["theme"] not in vus:
            vus.append(p["theme"])
    return vus


def generer_liste():
    lignes = [
        "# Script d'enregistrement pour Chadi",
        "",
        "Un memo vocal PAR THEME, lu d'une traite dans l'ordre ci-dessous.",
        "Laisse environ 1,5 seconde de silence entre chaque phrase (compte « un, deux » dans ta tete).",
        "Parle a vitesse naturelle mais articulee, telephone proche de la bouche, piece calme.",
        "",
        "Certaines phrases sont marquees « a lire tel quel » : elles sont au feminin",
        "parce que c'est Isaure qui les dira. Ne les corrige pas vers le masculin !",
        "",
        "Ensuite, depose les fichiers dans recordings/ puis lance :",
        "```",
        "python3 tools/process_audio.py decouper <theme> recordings/<fichier>",
        "```",
        "et verifie l'alignement en ouvrant tools/qa.html via un serveur local.",
        "",
    ]
    for theme in themes_presents():
        pistes = pistes_du_theme(theme)
        lignes.append(f"## Theme « {theme} » ({len(pistes)} pistes, un seul memo vocal)")
        lignes.append("")
        for i, (ident, texte, remarque) in enumerate(pistes, 1):
            suffixe = f"  *({remarque})*" if remarque else ""
            lignes.append(f"{i}. **{texte}**  `{ident}`{suffixe}")
        lignes.append("")
    FICHIER_LISTE.write_text("\n".join(lignes), encoding="utf-8")
    print(f"Liste ecrite : {FICHIER_LISTE}")


def ffmpeg(*args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-y", *args],
                          capture_output=True, text=True)


def detecter_silences(fichier):
    """Retourne [(debut, fin)] des silences via silencedetect."""
    res = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(fichier), "-af",
         f"silencedetect=noise={SEUIL_SILENCE}:d={DUREE_SILENCE_MIN}", "-f", "null", "-"],
        capture_output=True, text=True)
    debuts = [float(m) for m in re.findall(r"silence_start: ([\d.]+)", res.stderr)]
    fins = [float(m) for m in re.findall(r"silence_end: ([\d.]+)", res.stderr)]
    return list(zip(debuts, fins + [None] * (len(debuts) - len(fins))))


def duree_totale(fichier):
    res = subprocess.run(
        ["ffprobe", "-hide_banner", "-show_entries", "format=duration",
         "-of", "json", str(fichier)], capture_output=True, text=True)
    return float(json.loads(res.stdout)["format"]["duration"])


def exporter_segment(source, debut, fin, nom):
    """Extrait [debut, fin], normalise le volume, coupe les silences residuels, exporte en m4a."""
    DOSSIER_AUDIO.mkdir(exist_ok=True)
    cible = DOSSIER_AUDIO / f"{nom}.m4a"
    filtres = (
        "silenceremove=start_periods=1:start_threshold=-40dB:"
        "stop_periods=1:stop_threshold=-40dB,"
        "loudnorm=I=-18:TP=-2"
    )
    res = ffmpeg("-i", str(source), "-ss", f"{debut:.3f}", "-to", f"{fin:.3f}",
                 "-af", filtres, "-ac", "1", "-ar", "44100",
                 "-c:a", "aac", "-b:a", "48k", str(cible))
    if res.returncode != 0:
        print(res.stderr[-800:])
        sys.exit(f"Echec de l'export de {nom}")
    print(f"  audio/{nom}.m4a  ({fin - debut:.1f}s)")


def commande_decouper(theme, fichier):
    fichier = Path(fichier)
    if not fichier.exists():
        sys.exit(f"Fichier introuvable : {fichier}")
    pistes = pistes_du_theme(theme)
    if not pistes:
        sys.exit(f"Theme inconnu ou vide : {theme}. Themes : {', '.join(themes_presents())}")

    duree = duree_totale(fichier)
    silences = detecter_silences(fichier)

    # Les segments parles = ce qui reste entre les silences
    segments = []
    curseur = 0.0
    for debut_s, fin_s in silences:
        if debut_s - curseur > 0.3:
            segments.append((curseur, debut_s))
        curseur = fin_s if fin_s is not None else duree
    if duree - curseur > 0.3:
        segments.append((curseur, duree))

    print(f"{len(segments)} segments detectes, {len(pistes)} pistes attendues.")
    if len(segments) != len(pistes):
        print("\nDesaccord ! Pistes attendues dans l'ordre :")
        for i, (ident, texte, _) in enumerate(pistes, 1):
            print(f"  {i:2}. {ident}  {texte}")
        print(f"\nSegments trouves : {[f'{a:.1f}-{b:.1f}s' for a, b in segments]}")
        print("Pistes : reenregistre le memo avec des pauses plus franches,")
        print(f"ou ajuste SEUIL_SILENCE ({SEUIL_SILENCE}) / DUREE_SILENCE_MIN ({DUREE_SILENCE_MIN}s) en tete de script.")
        sys.exit(1)

    for (ident, _, _), (debut, fin) in zip(pistes, segments):
        # Petite marge pour ne pas rogner les attaques et les fins de mots
        exporter_segment(fichier, max(0, debut - 0.15), min(duree, fin + 0.15), ident)

    regenerer_manifest()
    print(f"\nTermine. Ouvre tools/qa.html (via un serveur local) pour verifier l'alignement.")


def commande_fichier(ident, fichier):
    fichier = Path(fichier)
    if not fichier.exists():
        sys.exit(f"Fichier introuvable : {fichier}")
    valides = {i for p in lire_phrases() for i in ([p["id"]] + ([p["id"] + "_f"] if p["versF"] else []))}
    if ident not in valides:
        sys.exit(f"Id inconnu : {ident}")
    duree = duree_totale(fichier)
    exporter_segment(fichier, 0, duree, ident)
    regenerer_manifest()


def regenerer_manifest():
    ids = sorted(f.stem for f in DOSSIER_AUDIO.glob("*.m4a")) if DOSSIER_AUDIO.exists() else []
    contenu = (
        "// Genere par tools/process_audio.py. Liste des ids ayant un fichier audio dans audio/.\n"
        "// Une variante versF enregistree apparait comme \"<id>_f\".\n"
        f"const AUDIO_MANIFEST = {json.dumps(ids)};\n"
    )
    FICHIER_MANIFEST.write_text(contenu, encoding="utf-8")
    print(f"Manifest regenere : {len(ids)} fichiers audio.")


if __name__ == "__main__":
    args = sys.argv[1:]
    if args[:1] == ["liste"]:
        generer_liste()
    elif args[:1] == ["decouper"] and len(args) == 3:
        commande_decouper(args[1], args[2])
    elif args[:1] == ["fichier"] and len(args) == 3:
        commande_fichier(args[1], args[2])
    else:
        print(__doc__)
        sys.exit(1)
