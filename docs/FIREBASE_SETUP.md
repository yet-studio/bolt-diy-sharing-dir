# Configuration Firebase

Ce document explique comment configurer Firebase pour l'application bolt.diy.

## Prérequis

1. Un compte Google
2. Un projet Firebase
3. Node.js et npm installés
4. Firebase CLI (`npm install -g firebase-tools`)

## Configuration

1. **Variables d'environnement**

Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```env
SESSION_SECRET=votre-secret-très-long
FIREBASE_API_KEY=votre-clé-api
FIREBASE_AUTH_DOMAIN=votre-domaine.firebaseapp.com
FIREBASE_PROJECT_ID=votre-projet-id
FIREBASE_STORAGE_BUCKET=votre-bucket.appspot.com
FIREBASE_MESSAGING_SENDER_ID=votre-sender-id
FIREBASE_APP_ID=votre-app-id
```

2. **Firebase Console**

- Allez sur [Firebase Console](https://console.firebase.google.com)
- Créez un nouveau projet ou sélectionnez un projet existant
- Activez Authentication avec email/password
- Créez une base de données Firestore
- Activez Storage

3. **Règles de sécurité**

Les règles de sécurité sont déjà configurées dans :
- `firebase/firestore.rules` pour Firestore
- `firebase/storage.rules` pour Storage

4. **Déploiement des règles**

```bash
# Connexion à Firebase
firebase login

# Sélection du projet
firebase use votre-projet-id

# Déploiement des règles
firebase deploy --only firestore:rules,storage:rules
```

## Structure des données

### Collection `files`

```typescript
interface FileData {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  lastModified: Date;
  shared: boolean;
  mimeType?: string;
  parentId?: string | null;
  ownerId: string;
  permissions: {
    read: string[];
    write: string[];
  };
  storageRef?: string;
}
```

## Émulateurs locaux

Pour développer localement avec les émulateurs Firebase :

```bash
# Installation des émulateurs
firebase init emulators

# Démarrage des émulateurs
firebase emulators:start
```

Les émulateurs seront disponibles sur :
- Auth : http://localhost:9099
- Firestore : http://localhost:8080
- Storage : http://localhost:9199
- UI des émulateurs : http://localhost:4000

## Tests

1. Créez un compte utilisateur
2. Essayez d'uploader un fichier
3. Vérifiez les permissions
4. Testez le partage de fichiers

## Sécurité

- Ne commettez jamais le fichier `.env`
- Utilisez des règles de sécurité strictes
- Limitez la taille des fichiers (100MB max)
- Restreignez les types MIME autorisés
