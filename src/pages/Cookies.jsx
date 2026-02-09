import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Pages.css'
import './Legal.css'

const Cookies = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const openConsent = () => {
    window.dispatchEvent(new CustomEvent('showCookieConsent'))
  }

  const h2 = (en, it, es, fr) => language === 'IT' ? it : language === 'ES' ? es : language === 'FR' ? fr : en
  const p = (en, it, es, fr) => language === 'IT' ? it : language === 'ES' ? es : language === 'FR' ? fr : en

  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.cookiePolicy}</h1>
      </div>
      <div className="legal-content container">
        <section className="legal-section">
          <h2>{h2('1. Introduction', '1. Introduzione', '1. Introducción', '1. Introduction')}</h2>
          <p>
            {p(
              'Our website uses cookies and related technologies to provide the service, remember preferences and, with your consent, for statistics. Below we inform you about their use.',
              'Il nostro sito utilizza cookie e tecnologie correlate per fornire il servizio, ricordare le preferenze e, con il tuo consenso, per statistiche. Di seguito ti informiamo sull\'uso.',
              'Nuestro sitio utiliza cookies y tecnologías relacionadas para prestar el servicio, recordar preferencias y, con su consentimiento, para estadísticas. A continuación le informamos sobre su uso.',
              'Notre site utilise des cookies et des technologies connexes pour fournir le service, mémoriser les préférences et, avec votre consentement, pour les statistiques.'
            )}
          </p>
        </section>
        <section className="legal-section">
          <h2>{h2('2. What are cookies?', '2. Cosa sono i cookie?', '2. ¿Qué son las cookies?', '2. Qu\'est-ce que les cookies ?')}</h2>
          <p>
            {p(
              'Cookies are small files sent with the pages of this site and stored by your browser. The information collected may be sent back to our servers or to third-party servers on your next visit.',
              'I cookie sono piccoli file inviati con le pagine di questo sito e salvati dal tuo browser. Le informazioni raccolte possono essere rispedite ai nostri server o a server di terze parti alla prossima visita.',
              'Las cookies son pequeños archivos enviados con las páginas de este sitio y almacenados por su navegador. La información recogida puede reenviarse a nuestros servidores o a servidores de terceros.',
              'Les cookies sont de petits fichiers envoyés avec les pages de ce site et enregistrés par votre navigateur.'
            )}
          </p>
        </section>
        <section className="legal-section">
          <h2>{h2('3. Cookie categories', '3. Categorie di cookie', '3. Categorías de cookies', '3. Catégories de cookies')}</h2>
          <ul className="legal-list">
            <li><strong>{p('Functional (always active)', 'Funzionali (sempre attivi)', 'Funcionales (siempre activos)', 'Fonctionnels (toujours actifs)')}</strong> – {p('Necessary for the site to work and for your preferences.', 'Necessari per il corretto funzionamento del sito e per le tue preferenze.', 'Necesarios para el funcionamiento del sitio y tus preferencias.', 'Nécessaires au fonctionnement du site et à vos préférences.')}</li>
            <li><strong>{p('Preferences', 'Preferenze', 'Preferencias', 'Préférences')}</strong> – {p('Storage of preferences not explicitly requested (e.g. layout).', 'Memorizzazione di preferenze non esplicitamente richieste (es. layout).', 'Almacenamiento de preferencias no solicitadas explícitamente.', 'Stockage de préférences non explicitement demandées.')}</li>
            <li><strong>{p('Statistics', 'Statistiche', 'Estadísticas', 'Statistiques')}</strong> – {p('Used exclusively for anonymous statistics.', 'Utilizzati esclusivamente per statistiche anonime.', 'Utilizados exclusivamente para estadísticas anónimas.', 'Utilisés exclusivement pour des statistiques anonymes.')}</li>
            <li><strong>{p('Marketing', 'Marketing', 'Marketing', 'Marketing')}</strong> – {p('To create user profiles or track users for advertising purposes.', 'Per creare profili utente o tracciare l\'utente per scopi pubblicitari.', 'Para crear perfiles de usuario o rastrear al usuario con fines publicitarios.', 'Pour créer des profils ou suivre les utilisateurs à des fins publicitaires.')}</li>
          </ul>
        </section>
        <section className="legal-section">
          <h2>{h2('4. Consent', '4. Consenso', '4. Consentimiento', '4. Consentement')}</h2>
          <p>
            {p(
              'When you first visit the site, we show a banner with an explanation of cookies. By clicking "Accept" you consent to the use of the categories described. You can change your choice at any time.',
              'Quando visiti il sito per la prima volta mostriamo un banner con una spiegazione dei cookie. Cliccando "Accetta" dai il consenso all\'uso delle categorie descritte. Puoi modificare la scelta in qualsiasi momento.',
              'Cuando visite el sitio por primera vez mostramos un banner con una explicación de las cookies. Al hacer clic en "Aceptar" consiente el uso de las categorías descritas. Puede cambiar su elección en cualquier momento.',
              'Lors de votre première visite, nous affichons une bannière expliquant les cookies. En cliquant sur "Accepter", vous consentez à l\'utilisation des catégories décrites.'
            )}
          </p>
          <button type="button" className="legal-consent-btn" onClick={openConsent}>
            {t.manageConsent}
          </button>
        </section>
        <section className="legal-section">
          <h2>{h2('5. Your rights and contact', '5. Diritti e contatti', '5. Derechos y contacto', '5. Droits et contact')}</h2>
          <p>
            {p(
              'You have the right to object, access, rectify, erase and portability of your data, and to withdraw consent. For questions: info@danceinmalta.com. You may lodge a complaint with a supervisory authority.',
              'Hai diritto di opposizione, accesso, rettifica, cancellazione e portabilità dei dati e di revocare il consenso. Per domande: info@danceinmalta.com. Puoi presentare reclamo all’autorità di vigilanza.',
              'Tiene derecho a oponerse, acceder, rectificar, suprimir y a la portabilidad de sus datos y a retirar el consentimiento. Para preguntas: info@danceinmalta.com.',
              'Vous avez le droit de vous opposer, d\'accéder, de rectifier, d\'effacer et à la portabilité de vos données, et de retirer votre consentement. Pour toute question : info@danceinmalta.com.'
            )}
          </p>
          <p><Link to="/privacy-policy">{t.privacyPolicy}</Link></p>
        </section>
      </div>
    </div>
  )
}

export default Cookies
