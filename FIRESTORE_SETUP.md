# Configurazione Firestore per Dance in Malta

## Passi da seguire su Firebase Console

### 1. Abilitare Firestore Database

1. Vai su [Firebase Console](https://console.firebase.google.com/)
2. Seleziona il progetto `danceinmalta`
3. Nel menu laterale, clicca su **Firestore Database**
4. Clicca su **Crea database**
5. Scegli **Inizia in modalità test** (per sviluppo) o **Inizia in modalità produzione** (per produzione)
6. Seleziona una regione (es. `europe-west` per l'Europa)
7. Clicca **Abilita**

### 2. Configurare le Regole di Sicurezza

Vai su **Regole** nella sezione Firestore e imposta:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Eventi - lettura pubblica, scrittura solo admin
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'danceinmalta.workspace@gmail.com';
    }
    // Camere (Stay) - lettura pubblica, scrittura solo admin
    match /rooms/{roomId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'danceinmalta.workspace@gmail.com';
    }
    // Messaggi form Contatti - chiunque può creare, solo admin può leggere/cancellare
    match /contactMessages/{msgId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null && request.auth.token.email == 'danceinmalta.workspace@gmail.com';
    }
  }
}
```

**Copia e incolla il blocco qui sopra** nella scheda **Regole** di Firestore (Firebase Console → Firestore Database → Regole), poi clicca **Pubblica**.

### 3. Creare l'Utente Admin

1. Vai su **Authentication** nel menu laterale
2. Clicca su **Inizia** se non è ancora abilitato
3. Abilita **Email/Password** come metodo di accesso
4. Clicca su **Aggiungi utente**
5. Inserisci:
   - Email: `danceinmalta.workspace@gmail.com`
   - Password: `Dance2026@@`
6. Clicca **Aggiungi utente**

### 4. Struttura della Collezione Events

La collezione `events` avrà documenti con questa struttura:

```javascript
{
  title: "Summer Festival 2024",
  date: Timestamp, // Data dell'evento
  location: "Valletta",
  description: "Amazing summer festival...",
  imageId: "summer-festival-2024", // ID immagine su Cloudinary
  externalLink: "https://www.getyourtickets.com/event/123", // Link a getyourtickets.com
  createdAt: Timestamp // Data di creazione
}
```

### 5. Collezione contactMessages (form Contatti)

I messaggi inviati dalla pagina **Contatti** vengono salvati nella collezione `contactMessages`. Ogni documento ha:

- `name`, `email`, `phone`, `message` (stringhe)
- `createdAt` (Timestamp)

Puoi leggerli dalla **Firebase Console** o dalla sezione **Messaggi** nel pannello Admin. Se in Admin i messaggi non compaiono, controlla: (1) che le regole Firestore consentano la lettura all’admin per `contactMessages`; (2) in console del browser, se compare un errore che richiede un indice, apri il link indicato da Firebase per creare l’indice su `createdAt`.

### 6. Collezione rooms (Stay / Camere)

Le camere e gli alloggi della pagina **Stay** sono nella collezione `rooms`. Ogni documento ha:

- `name` (stringa), `location` (stringa), `rating` (numero 1-5), `price` (stringa, es. "€120/notte")
- `features` (array di stringhe, es. ["Pool", "WiFi", "Spa"])
- `imageId` (Cloudinary ID), `externalLink` (opzionale, link prenotazione)
- `createdAt` (Timestamp)

Si gestiscono dalla sezione **Camere (Stay)** nel pannello Admin.

### 7. Test della Configurazione

Dopo aver completato i passi sopra (regole per `events`, `rooms`, `contactMessages`):

1. Vai su `/admin/login` nel sito
2. Accedi con:
   - Email: `danceinmalta.workspace@gmail.com`
   - Password: `Dance2026@@`
3. Dovresti essere reindirizzato a `/admin`
4. **Eventi**: aggiungi un evento e verifica che appaia nel calendario su `/calendar`
5. **Camere**: nella tab "Camere (Stay)" aggiungi una camera; verifica che appaia nella pagina `/stay`
6. **Messaggi**: invia un messaggio dal form **Contatti** e verifica che compaia nella tab "Messaggi" in Admin

### Note Importanti

- **Sicurezza**: Le regole Firestore permettono la lettura pubblica degli eventi ma solo l'admin può scrivere
- **Autenticazione**: L'email deve corrispondere esattamente a `danceinmalta.workspace@gmail.com`
- **Date**: Le date vengono salvate come Timestamp di Firestore
- **Immagini**: Usa gli ID delle immagini caricate su Cloudinary

### Troubleshooting

Se hai problemi:

1. **Errore di permessi**: Verifica le regole Firestore
2. **Errore di autenticazione**: Verifica che l'utente sia creato in Authentication
3. **Eventi non appaiono**: Controlla la console del browser per errori e verifica che Firestore sia abilitato
