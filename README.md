# 🐾 Architecture du Site d'Adoption pour Chats

## 1. 🎯 Objectif
Ce site web est dédié à la mise en adoption de chats via une plateforme moderne, simple et responsive.  
Il permet à une association de publier des fiches de chats, de recevoir des demandes d’adoption et de gérer son contenu via une interface admin sécurisée.

---

## 2. 🛠️ Technologies Utilisées

### Front-end
- **Framework** : React.js (via Vite)
- **Styling** : TailwindCSS
- **Routing** : React Router
- **State** : `useState` / `useEffect` 
- **Déploiement** : Vercel 

### Back-end
- **Langage** : Node.js
- **Framework** : Express.js
- **Authentification** : JWT (admins uniquement)
- **Base de données** : PostgreSQL 
- **Déploiement** : Render

### Base de Données
- **Type** : PostgreSQL
- **Hébergement** : Mango (plan gratuit)

### Outils Supplémentaires
- **API Client** : Axios
- **Sécurité** : Bcrypt, CORS, Helmet
- **Tests API** : Postman

---

## 3. ⚙️ Fonctionnalités

### 🐱 Gestion des chats
- Ajouter, modifier, supprimer des fiches chats
- Upload de plusieurs images via URL
- Présentation par fiche avec galeries et infos

### 👤 Administration
- Connexion sécurisée admin via JWT
- Interface de gestion simple et épurée

### 📨 Demandes d’adoption
- Formulaire de contact pour chaque chat
- Envoi d’un mail à l’admin (ou stockage futur en DB)

### 💸 Dons et partenaires (à venir)
- Section dédiée aux soutiens
- Intégration possible d’un lien externe de don

---


## 5. 🏗️ Architecture Technique

### Front-end (React + Vercel)
- Composants dynamiques
- Utilisation de Tailwind pour un design clair
- Interaction via fetch/axios avec l'API

### Back-end (Node + Express + JWT)
- API REST pour :
  - CRUD des chats
  - Authentification des admins
- Middleware de vérification de token admin

### Base de données (PostgreSQL)
- Modèle Chat, Admin
- Gestion d’images sous forme de tableau de string

---

## 6. 🔐 Sécurité

- JWT pour l’authentification admin
- Bcrypt pour le hashage des mots de passe
- Middleware Express pour la protection des routes
- DotEnv pour les secrets

---

## 7. 🚀 Déploiement

| Composant      | Plateforme      | Coût         |
|----------------|-----------------|--------------|
| Front-end      | Vercel          | 0€           |
| Back-end       | Render          | 0€ (gratuit) |
| Base de données| mango           | 0€           |
| Nom de domaine | Freenom         | 0€ - 10€/an  |

> 🎁 Possibilité de tout centraliser sur Render.com si besoin (plan gratuit pour Front + API + DB).

---

## 8. 📦 Installation locale

```bash
# Cloner le projet
git clone https://github.com/ton-compte/ton-repo.git
cd ton-repo

# Installation du front
cd client
npm install
npm run dev

# Installation du back
cd ../server
npm install
npm run dev
```

Crée un fichier `.env` dans `/server` avec :

```env
JWT_SECRET=tonsecret
DATABASE_URL=postgresql://...
```

---

## 8.5 connexion et lien vercel 
 Lien : https://sitechat.vercel.app

 Lien admin : https://sitechat.vercel.app/admin
{
  "email": "admin@example.com",
  "password": "admin"
}

## 9. ✅ À venir

- Authentification des adoptants(?)
- Notification email à l’admin (via Nodemailer)
- Back-office + tableau de bord
- Upload d’images via Cloudinary(?)

---

## 10. 🐾 Conclusion

Le site est conçu pour être léger, rapide à déployer, sécurisé et quasiment gratuit.  
Il permet à n'importe quelle association de gérer efficacement l’adoption de chats avec une interface claire et intuitive.

