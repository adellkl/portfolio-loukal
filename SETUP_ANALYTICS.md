# 📊 Configuration Google Analytics & Search Console

## 🎯 Étape 1 : Google Analytics 4 (GA4)

### Créer un compte Google Analytics

1. **Accéder à Google Analytics**
   - Va sur : https://analytics.google.com/
   - Connecte-toi avec ton compte Google

2. **Créer une propriété**
   - Clique sur "Admin" (roue dentée en bas à gauche)
   - Clique sur "Créer une propriété"
   - Nom de la propriété : `Portfolio Adel Loukal`
   - Fuseau horaire : `France`
   - Devise : `Euro (EUR)`

3. **Configurer le flux de données**
   - Type : `Web`
   - URL du site web : `https://www.adelloukal.fr`
   - Nom du flux : `Portfolio Web`

4. **Obtenir ton ID de mesure**
   - Format : `G-XXXXXXXXXX`
   - Tu le trouves dans : Admin > Flux de données > Détails du flux
   - **COPIE CET ID !**

5. **Remplacer dans le code**
   - Ouvre `/src/pages/onepage/index.js`
   - Cherche : `G-XXXXXXXXXX` (2 occurrences)
   - Remplace par ton vrai ID de mesure

---

## 🔍 Étape 2 : Google Search Console

### Vérifier ton site

1. **Accéder à Search Console**
   - Va sur : https://search.google.com/search-console/
   - Connecte-toi avec ton compte Google

2. **Ajouter une propriété**
   - Clique sur "Ajouter une propriété"
   - Type : `Préfixe de l'URL`
   - URL : `https://www.adelloukal.fr`

3. **Méthode de vérification : Balise HTML**
   - Choisis "Balise HTML"
   - Tu verras : `<meta name="google-site-verification" content="XXXXXXXXXXXXX" />`
   - **COPIE LE CODE** (la partie `XXXXXXXXXXXXX`)

4. **Remplacer dans le code**
   - Ouvre `/src/pages/onepage/index.js`
   - Ligne 249 : Remplace `VOTRE_CODE_DE_VERIFICATION_ICI`
   - Par ton code de vérification

5. **Vérifier**
   - Redéploie ton site
   - Retourne sur Search Console
   - Clique sur "Vérifier"
   - ✅ Succès !

6. **Soumettre le sitemap**
   - Dans Search Console
   - Menu "Sitemaps"
   - Ajouter : `https://www.adelloukal.fr/sitemap.xml`

---

## 🌐 Étape 3 : Bing Webmaster Tools (Optionnel)

### Vérifier sur Bing

1. **Accéder à Bing Webmaster**
   - Va sur : https://www.bing.com/webmasters/
   - Connecte-toi avec ton compte Microsoft

2. **Ajouter un site**
   - URL : `https://www.adelloukal.fr`
   - Méthode : `Balise meta`

3. **Copier le code**
   - Tu verras : `<meta name="msvalidate.01" content="XXXXX" />`
   - **COPIE LE CODE**

4. **Remplacer dans le code**
   - Ligne 252 : Remplace `VOTRE_CODE_BING_ICI`

---

## 📈 Ce que tu peux tracker avec GA4

### Événements automatiques
- ✅ Visites de pages
- ✅ Temps passé sur le site
- ✅ Taux de rebond
- ✅ Appareil (mobile/desktop)
- ✅ Localisation géographique
- ✅ Source de trafic (Google, direct, réseaux sociaux)

### Événements personnalisés (à ajouter plus tard)
- Clics sur projets
- Ouverture du formulaire contact
- Envoi du formulaire
- Changement de langue FR/EN
- Clics sur liens GitHub/LinkedIn

---

## 🚀 Après la configuration

### Vérifier que ça marche

1. **Google Analytics**
   - Va sur Analytics
   - Rapports > Temps réel
   - Visite ton site
   - Tu dois te voir dans les utilisateurs actifs

2. **Search Console**
   - Attends 48-72h
   - Tu verras les premières données :
     - Impressions dans Google
     - Clics
     - Position moyenne
     - Mots-clés

---

## 📝 Notes importantes

⚠️ **RGPD / Cookies**
- Google Analytics utilise des cookies
- Tu dois ajouter une bannière de consentement cookies
- Recommandé : Tarteaucitron.js ou Axeptio

🔒 **Privacy**
- Anonymise les IPs dans GA4 (déjà configuré)
- Respect de la vie privée des utilisateurs

📊 **Données utiles à surveiller**
- Pages les plus visitées
- Durée moyenne des sessions
- Taux de rebond par page
- Conversions (contacts, clics projets)

---

## 🎯 Checklist finale

- [ ] Compte Google Analytics créé
- [ ] ID de mesure `G-XXXXXXXXXX` obtenu
- [ ] Code GA4 ajouté dans index.js
- [ ] Site vérifié sur Google Search Console
- [ ] Sitemap soumis
- [ ] Test en temps réel effectué
- [ ] (Optionnel) Bing Webmaster configuré

---

**Besoin d'aide ?**
- Doc GA4 : https://support.google.com/analytics/
- Doc Search Console : https://support.google.com/webmasters/
