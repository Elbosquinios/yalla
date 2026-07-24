#!/usr/bin/env python3
"""Petit serveur local pour tester l'app : python3 tools/serveur.py
Identique a http.server mais sert les .m4a avec le bon type MIME
(macOS les declare en audio/mp4a-latm, que Chrome refuse de lire)."""
import http.server, functools, os

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map,
                      ".m4a": "audio/mp4", ".aac": "audio/aac"}

os.chdir(os.path.join(os.path.dirname(__file__), ".."))
http.server.HTTPServer(("", 8000), Handler).serve_forever()
