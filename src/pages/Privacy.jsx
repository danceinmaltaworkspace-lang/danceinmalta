import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Pages.css'
import './Legal.css'

const Privacy = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.privacyPolicy}</h1>
      </div>
      <div className="legal-content container">
        <section className="legal-section">
          <h2>{language === 'IT' ? '1. Titolare del trattamento' : language === 'ES' ? '1. Responsable del tratamiento' : language === 'FR' ? '1. Responsable du traitement' : '1. Data controller'}</h2>
          <p>
            Dance in Malta – St Georges Business Complex, 4th Floor, Elija Zammit Street, St Julian's STJ 3150, Malta.<br />
            Email: info@danceinmalta.com
          </p>
        </section>
        <section className="legal-section">
          <h2>{language === 'IT' ? '2. Dati che raccogliamo' : language === 'ES' ? '2. Datos que recogemos' : language === 'FR' ? '2. Données collectées' : '2. Data we collect'}</h2>
          <p>
            {language === 'IT'
              ? 'Raccogliamo i dati che ci fornisci tramite il modulo di contatto (nome, email, telefono, messaggio), i dati di navigazione necessari al funzionamento del sito e, se accetti i cookie, dati statistici anonimi.'
              : language === 'ES'
              ? 'Recogemos los datos que nos facilitas a través del formulario de contacto (nombre, email, teléfono, mensaje), datos de navegación necesarios para el funcionamiento del sitio y, si aceptas las cookies, datos estadísticos anónimos.'
              : language === 'FR'
              ? 'Nous collectons les données que vous nous fournissez via le formulaire de contact (nom, email, téléphone, message), les données de navigation nécessaires au fonctionnement du site et, si vous acceptez les cookies, des données statistiques anonymes.'
              : 'We collect data you provide via the contact form (name, email, phone, message), navigation data necessary for the site to function and, if you accept cookies, anonymous statistical data.'}
          </p>
        </section>
        <section className="legal-section">
          <h2>{language === 'IT' ? '3. Finalità e base giuridica' : language === 'ES' ? '3. Finalidad y base legal' : language === 'FR' ? '3. Finalité et base légale' : '3. Purpose and legal basis'}</h2>
          <p>
            {language === 'IT'
              ? 'I dati del modulo di contatto sono trattati per rispondere alle tue richieste (legittimo interesse / esecuzione di misure precontrattuali). I cookie sono utilizzati come descritto nella Cookie Policy, in base al tuo consenso dove richiesto.'
              : language === 'ES'
              ? 'Los datos del formulario de contacto se tratan para responder a tus solicitudes (interés legítimo / ejecución de medidas precontractuales). Las cookies se utilizan como se describe en la Política de Cookies, con tu consentimiento cuando sea necesario.'
              : language === 'FR'
              ? 'Les données du formulaire de contact sont traitées pour répondre à vos demandes (intérêt légitime / exécution de mesures précontractuelles). Les cookies sont utilisés comme décrit dans la Politique des cookies, avec votre consentement lorsque requis.'
              : 'Contact form data is processed to respond to your requests (legitimate interest / pre-contractual measures). Cookies are used as described in the Cookie Policy, based on your consent where required.'}
          </p>
        </section>
        <section className="legal-section">
          <h2>{language === 'IT' ? '4. Conservazione e sicurezza' : language === 'ES' ? '4. Conservación y seguridad' : language === 'FR' ? '4. Conservation et sécurité' : '4. Retention and security'}</h2>
          <p>
            {language === 'IT'
              ? 'Conserviamo i messaggi di contatto per il tempo necessario a gestire la richiesta e per eventuali obblighi di legge. Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati.'
              : language === 'ES'
              ? 'Conservamos los mensajes de contacto el tiempo necesario para gestionar la solicitud y para cualquier obligación legal. Adoptamos medidas técnicas y organizativas adecuadas para proteger sus datos.'
              : language === 'FR'
              ? 'Nous conservons les messages de contact le temps nécessaire pour traiter la demande et pour toute obligation légale. Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos données.'
              : 'We retain contact messages for as long as needed to handle the request and for any legal obligations. We adopt appropriate technical and organisational measures to protect your data.'}
          </p>
        </section>
        <section className="legal-section">
          <h2>{language === 'IT' ? '5. I tuoi diritti (GDPR)' : language === 'ES' ? '5. Tus derechos (RGPD)' : language === 'FR' ? '5. Vos droits (RGPD)' : '5. Your rights (GDPR)'}</h2>
          <p>
            {language === 'IT'
              ? 'Hai diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione. Puoi revocare il consenso in qualsiasi momento. Puoi presentare reclamo all’autorità di controllo (es. Garante per la protezione dei dati personali).'
              : language === 'ES'
              ? 'Tienes derecho de acceso, rectificación, supresión, limitación del tratamiento, portabilidad de datos y oposición. Puedes revocar el consentimiento en cualquier momento. Puedes presentar una reclamación ante la autoridad de control.'
              : language === 'FR'
              ? 'Vous avez le droit d’accès, de rectification, d’effacement, de limitation du traitement, de portabilité des données et d’opposition. Vous pouvez révoquer votre consentement à tout moment. Vous pouvez déposer une réclamation auprès de l’autorité de contrôle.'
              : 'You have the right to access, rectification, erasure, restriction of processing, data portability and to object. You may withdraw consent at any time. You may lodge a complaint with a supervisory authority.'}
          </p>
        </section>
        <section className="legal-section">
          <h2>{language === 'IT' ? '6. Contatti' : language === 'ES' ? '6. Contacto' : language === 'FR' ? '6. Contact' : '6. Contact'}</h2>
          <p>
            {language === 'IT'
              ? 'Per esercitare i tuoi diritti o per domande sulla privacy: info@danceinmalta.com.'
              : language === 'ES'
              ? 'Para ejercer tus derechos o para preguntas sobre privacidad: info@danceinmalta.com.'
              : language === 'FR'
              ? 'Pour exercer vos droits ou pour toute question sur la confidentialité : info@danceinmalta.com.'
              : 'To exercise your rights or for privacy enquiries: info@danceinmalta.com.'}
          </p>
          <p>
            <Link to="/cookie-policy">{t.cookiePolicy}</Link>
          </p>
        </section>
      </div>
    </div>
  )
}

export default Privacy
