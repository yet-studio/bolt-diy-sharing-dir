# Guide de Contribution

Merci de votre intérêt pour contribuer à Bolt.DIY ! Ce document fournit des lignes directrices pour contribuer au projet.

## 🌟 Comment Contribuer

1. **Fork & Clone**
```bash
git clone https://github.com/votre-username/bolt.diy.git
cd bolt.diy
npm install
```

2. **Créer une Branche**
```bash
git checkout -b feature/ma-fonctionnalite
```

3. **Développer**
- Suivez les conventions de code
- Ajoutez des tests si nécessaire
- Documentez vos changements

4. **Tester**
```bash
npm test
```

5. **Commit**
```bash
git add .
git commit -m "feat: description de la fonctionnalité"
```

6. **Push & Pull Request**
```bash
git push origin feature/ma-fonctionnalite
```

## 📝 Conventions de Code

### TypeScript
- Utilisez TypeScript strict mode
- Définissez des interfaces pour les props
- Évitez `any`

### React
- Composants fonctionnels avec hooks
- Props typées
- Styles avec Tailwind CSS

### Commits
Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

### Structure des Fichiers
```
app/
├── components/          # Composants React réutilisables
│   └── shared-folder/  # Composants spécifiques aux fichiers
├── routes/             # Routes Remix
├── services/           # Services métier
├── styles/            # Styles globaux
└── utils/             # Utilitaires
```

## 🧪 Tests

- Écrivez des tests pour les nouvelles fonctionnalités
- Maintenez une couverture de tests > 80%
- Utilisez les tests unitaires et d'intégration

## 📚 Documentation

- Documentez les nouvelles fonctionnalités
- Mettez à jour le README si nécessaire
- Commentez le code complexe
- Mettez à jour la documentation API

## 🐛 Rapporter des Bugs

1. Vérifiez que le bug n'est pas déjà reporté
2. Utilisez le template de bug
3. Incluez :
   - Description détaillée
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si possible
   - Environnement (OS, navigateur, etc.)

## 💡 Proposer des Fonctionnalités

1. Discutez d'abord dans les issues
2. Expliquez le besoin
3. Décrivez la solution proposée
4. Considérez les alternatives
5. Fournissez des exemples d'utilisation

## 🚀 Release Process

1. Mise à jour de la version
2. Création des notes de version
3. Tag Git
4. Build et tests
5. Déploiement

## ❓ Questions

- Utilisez les Discussions GitHub
- Stack Overflow avec le tag [bolt-diy]
- Issues pour les bugs uniquement

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.
