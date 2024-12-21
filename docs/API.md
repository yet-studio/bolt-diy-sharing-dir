# API Reference

## Endpoints

### Files

#### `POST /api/upload`
Upload un nouveau fichier.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: Le fichier à uploader

**Response:**
```json
{
  "fileUrl": "/api/files/[fileName]",
  "success": true
}
```

#### `GET /api/files/:fileName`
Télécharge un fichier.

**Request:**
- Method: `GET`
- Parameters:
  - `fileName`: Nom du fichier (haché)

**Response:**
- Le fichier avec le Content-Type approprié
- Headers:
  - `Content-Disposition`: `attachment; filename="[originalName]"`

### Authentication

#### `POST /login`
Authentifie un utilisateur.

**Request:**
- Method: `POST`
- Content-Type: `application/x-www-form-urlencoded`
- Body:
  - `email`: Email de l'utilisateur
  - `password`: Mot de passe
  - `redirectTo`: URL de redirection (optionnel)

**Response:**
- Redirection vers la page demandée ou `/shared`

#### `POST /logout`
Déconnecte l'utilisateur.

**Request:**
- Method: `POST`

**Response:**
- Redirection vers la page d'accueil

### Files Management

#### `GET /shared`
Liste les fichiers partagés.

**Request:**
- Method: `GET`
- Query Parameters:
  - `folderId`: ID du dossier (optionnel)

**Response:**
```json
{
  "files": [
    {
      "id": "string",
      "name": "string",
      "type": "file | folder",
      "size": "number",
      "lastModified": "Date",
      "shared": "boolean",
      "mimeType": "string",
      "storageRef": "string"
    }
  ],
  "currentFolder": "string | null",
  "parentFolder": "string | null"
}
```

## Types

### FileData
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

### StorageFile
```typescript
interface StorageFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}
```

## Erreurs

Les erreurs sont retournées avec les codes HTTP appropriés :

- `400`: Requête invalide
- `401`: Non authentifié
- `403`: Non autorisé
- `404`: Ressource non trouvée
- `405`: Méthode non autorisée
- `413`: Fichier trop volumineux
- `415`: Type de fichier non supporté
- `500`: Erreur serveur

Exemple d'erreur :
```json
{
  "error": "Message d'erreur",
  "success": false
}
```
