# Dance in Malta - Website Clone

Una replica completa del sito Dance in Malta costruita con React e Vite.

## Caratteristiche

- ✨ Design moderno e responsive
- 🎨 Animazioni fluide e transizioni
- 📱 Completamente responsive per mobile, tablet e desktop
- 🌐 Supporto multilingua (IT, EN, ES, FR)
- ⚡ Performance ottimizzate con Vite
- 🖼️ Integrazione Cloudinary per gestione immagini
- 🔥 Integrazione Firebase per analytics e database
- 🧭 Routing con React Router (pagine separate)

## Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build

# Preview della build
npm run preview
```

## Struttura del Progetto

```
danceinmalta/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── UpcomingEvents.jsx
│   │   ├── WhatIsDIM.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Experiences.jsx
│   │   ├── WhyUs.jsx
│   │   ├── Footer.jsx
│   │   └── CloudinaryImage.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── Experiences.jsx
│   │   ├── Plans.jsx
│   │   ├── Stay.jsx
│   │   └── Contacts.jsx
│   ├── config/
│   │   ├── firebase.js
│   │   └── cloudinary.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Pagine

- **Home** (`/`) - Pagina principale con hero, eventi, testimonial e sezione "Why Us"
- **Events** (`/events`) - Lista completa degli eventi
- **Experiences** (`/experiences`) - Tour ed esperienze disponibili
- **Plans** (`/plans`) - Pacchetti e piani disponibili
- **Stay** (`/stay`) - Opzioni di alloggio
- **Contacts** (`/contacts`) - Informazioni di contatto e form

## Deploy

Il progetto può essere deployato su:
- Vercel
- Netlify
- GitHub Pages
- Qualsiasi hosting statico

Per il deploy, esegui `npm run build` e carica la cartella `dist` generata.

## Tecnologie Utilizzate

- React 18
- Vite
- React Router DOM (routing e navigazione)
- Firebase (analytics e database)
- Cloudinary (gestione e ottimizzazione immagini)
- CSS3 (con animazioni e transizioni)

## Configurazione

### Cloudinary

Le immagini sono gestite tramite Cloudinary. Le configurazioni sono già impostate in `src/config/cloudinary.js`.

Per utilizzare le immagini da Cloudinary, usa il componente `CloudinaryImage`:

```jsx
import CloudinaryImage from './components/CloudinaryImage'

<CloudinaryImage
  imageId="nome-immagine"
  alt="Descrizione"
  width={400}
  height={225}
  crop="fill"
/>
```

### Firebase

Firebase è configurato in `src/config/firebase.js` e include:
- Analytics
- Database (Firestore - da configurare se necessario)
- Storage (per file e immagini - da configurare se necessario)

Le configurazioni sono già impostate e pronte all'uso.
