# depan.be — Refonte du site

Refonte moderne et ergonomique du site depan.be (dépannages plomberie & électricité à Bruxelles).

## Structure

```
depan.be/
├── index.html      # Accueil
├── plomberie.html  # Services plomberie
├── electricite.html# Services électricité
├── avis.html       # Témoignages clients
├── contact.html    # Formulaire de contact
├── css/
│   └── style.css   # Styles
├── js/
│   └── main.js     # Interactions
└── README.md
```

## Lancer en local

```bash
# Avec Python
python3 -m http.server 8000

# Ou avec Node.js (npx)
npx serve .
```

Puis ouvrir http://localhost:8000

## Formulaire de contact

Le formulaire utilise actuellement `mailto:` — il ouvre le client mail par défaut. Pour un envoi direct par email sans ouvrir le client :

1. Créer un compte sur [Formspree](https://formspree.io)
2. Créer un nouveau formulaire
3. Remplacer l'attribut `action` du formulaire dans `contact.html` par l'URL fournie par Formspree

## Déploiement

Site statique — déployable sur Netlify, Vercel, GitHub Pages, ou tout hébergeur web classique.
