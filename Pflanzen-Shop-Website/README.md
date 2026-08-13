# 🌿 Pflanzen-Shop

Eine kleine Website mit euren 22 Pflanzenfotos: Profil auswählen (Falk, Leni, Lilly, Test),
Pflanzen durchstöbern, filtern, in den Warenkorb legen und eine Auswahl per E-Mail verschicken.

## Website online stellen mit GitHub Pages (kostenlos)

1. **GitHub-Konto erstellen** (falls noch nicht vorhanden): auf [github.com](https://github.com) registrieren.
2. **Neues Repository anlegen**: Oben rechts auf **"+"** → **"New repository"**.
   - Name z. B. `pflanzen-shop`
   - Sichtbarkeit: "Public" (damit die Seite später erreichbar ist)
   - Auf **"Create repository"** klicken.
3. **Dateien hochladen**: Im neuen, leeren Repository auf **"uploading an existing file"** klicken
   (oder "Add file" → "Upload files"). Zieht den kompletten Inhalt dieses Ordners hinein
   (also `index.html`, den Ordner `css`, den Ordner `js` und den Ordner `images` – am besten den
   ganzen Ordnerinhalt auf einmal reinziehen). Unten auf **"Commit changes"** klicken.
4. **GitHub Pages aktivieren**: Im Repository oben auf **"Settings"** → links im Menü auf **"Pages"**.
   - Unter "Build and deployment" → "Source" **"Deploy from a branch"** auswählen.
   - Branch: `main`, Ordner: `/ (root)` auswählen → **"Save"**.
5. Nach ein bis zwei Minuten ist die Seite live unter einer Adresse wie:
   `https://DEIN-BENUTZERNAME.github.io/pflanzen-shop/`

Diesen Link könnt ihr dann mit allen teilen, die die Seite nutzen sollen.

## Wie die Website funktioniert

- Beim ersten Öffnen muss man eines der vier Profile (Falk, Leni, Lilly, Test) auswählen,
  bevor man den Shop sehen kann. Die Auswahl wird im Browser gespeichert, sodass man beim
  nächsten Besuch direkt weitermachen kann. Über "Profil wechseln" oben rechts kann man
  jederzeit ein anderes Profil auswählen.
- Jedes Profil hat seinen **eigenen Warenkorb** (im Browser gespeichert).
- Im Shop kann man nach Namen/Art suchen und nach Art, Größe, Pflegeaufwand und
  Lichtbedürfnis filtern.
- Klick auf eine Kachel (Bild oder Name) öffnet die Detailansicht mit mehr Infos und
  Pflegetipps.
- Über den Button "In den Korb" bzw. in der Detailansicht wird eine Pflanze zum Warenkorb
  hinzugefügt. Im Warenkorb (Symbol oben rechts) lässt sich die Menge anpassen oder eine
  Pflanze entfernen.
- **"Auswahl abschicken"** zeigt eine Zusammenfassung. Über "E-Mail-Programm öffnen" öffnet
  sich das Standard-Mailprogramm mit einer vorausgefüllten E-Mail (Empfänger, Betreff,
  Liste der ausgewählten Pflanzen) an **felix.n3003@gmail.com** – man muss dort nur noch
  auf "Senden" klicken. Alternativ kann die Auswahl über "Auswahl als Text kopieren" auch
  einfach in die Zwischenablage kopiert werden.

### Hinweis zum E-Mail-Versand

Momentan öffnet der Button das lokale Mailprogramm mit einer vorausgefüllten Nachricht
(sogenannter "mailto"-Link) – das funktioniert ohne jede Einrichtung, erfordert aber einen
Klick auf "Senden" im E-Mail-Programm.

Falls gewünscht, kann der Versand später **vollautomatisch** (ganz ohne Mailprogramm-Fenster)
über den kostenlosen Dienst [EmailJS](https://www.emailjs.com/) eingerichtet werden. Dafür
bräuchte man einen kostenlosen EmailJS-Account und müsste drei Werte (Service-ID, Template-ID,
Public Key) in `js/app.js` eintragen – sagt einfach Bescheid, wenn das noch ergänzt werden soll.

## E-Mail-Adresse ändern

Die Ziel-E-Mail-Adresse für die Bestellungen steht ganz oben in `js/app.js`:

```js
const ORDER_EMAIL = "felix.n3003@gmail.com";
```

Einfach diese Zeile anpassen, falls sich die Adresse ändern soll.

## Pflanzen bearbeiten oder ergänzen

Alle Pflanzendaten (Name, Kategorie, Größe, Pflegeaufwand, Licht, Gießrhythmus,
Beschreibung, Bild) stehen in `js/data.js`. Neue Pflanzen können dort einfach als weiterer
Eintrag im gleichen Format hinzugefügt werden (Bild vorher in den `images`-Ordner legen).

## Lokal testen

Einfach `index.html` per Doppelklick im Browser öffnen, oder – für volle Funktionalität –
im Ordner einen kleinen lokalen Server starten, z. B. mit Python:

```
python3 -m http.server 8000
```

und dann `http://localhost:8000` im Browser öffnen.
