# Bolt.DIY - File Sharing Application

A modern file sharing application built with Remix, Firebase, and TypeScript.

## Features

- File upload and management
- Secure authentication
- File sharing capabilities
- Responsive UI
- Real-time updates

## Tech Stack

- Framework: [Remix](https://remix.run)
- Authentication: Firebase Auth
- Storage: Firebase Storage
- Database: Firebase Firestore
- Styling: Tailwind CSS
- Language: TypeScript

## Prerequisites

- Node.js 18+
- pnpm
- Firebase account

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yet-studio/bolt-diy-sharing-dir.git
   cd bolt-diy-sharing-dir
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication, Storage, and Firestore
   - Copy your Firebase config to `.env` file
   - See `FIREBASE_SETUP.md` in the docs folder for detailed instructions

4. Start the development server:
   ```bash
   pnpm dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## Documentation

- [API Documentation](docs/API.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Firebase Setup](docs/FIREBASE_SETUP.md)

## Project Structure

```
bolt.diy/
├── app/
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Library configurations
│   ├── routes/          # Application routes
│   ├── services/        # Business logic and API calls
│   └── utils/           # Utility functions
├── docs/                # Documentation
├── public/              # Static assets
└── firebase/            # Firebase configurations
```

## Contributing

Please read our [Contributing Guide](docs/CONTRIBUTING.md) before submitting a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Join the community for bolt.diy!

https://thinktank.ottomator.ai

## Requested Additions - Feel Free to Contribute!

- OpenRouter Integration (@coleam00)
- Gemini Integration (@jonathands)
- Autogenerate Ollama models from what is downloaded (@yunatamos)
- Filter models by provider (@jasonm23)
- Download project as ZIP (@fabwaseem)
- Improvements to the main bolt.new prompt in `app\lib\.server\llm\prompts.ts` (@kofi-bhr)
- DeepSeek API Integration (@zenith110)
- Mistral API Integration (@ArulGandhi)
- "Open AI Like" API Integration (@ZerxZ)
- Ability to sync files (one way sync) to local folder (@muzafferkadir)
- Containerize the application with Docker for easy installation (@aaronbolton)
- Publish projects directly to GitHub (@goncaloalves)
- Ability to enter API keys in the UI (@ali00209)
- xAI Grok Beta Integration (@milutinke)
- LM Studio Integration (@karrot0)
- HuggingFace Integration (@ahsan3219)
- Bolt terminal to see the output of LLM run commands (@thecodacus)
- Streaming of code output (@thecodacus)
- Ability to revert code to earlier version (@wonderwhy-er)
- Cohere Integration (@hasanraiyan)
- Dynamic model max token length (@hasanraiyan)
- Better prompt enhancing (@SujalXplores)
- Prompt caching (@SujalXplores)
- Load local projects into the app (@wonderwhy-er)
- Together Integration (@mouimet-infinisoft)
- Mobile friendly (@qwikode)
- Better prompt enhancing (@SujalXplores)
- Attach images to prompts (@atrokhym)
- Added Git Clone button (@thecodacus)
- Git Import from url (@thecodacus)
- PromptLibrary to have different variations of prompts for different use cases (@thecodacus)
- Detect package.json and commands to auto install & run preview for folder and git import (@wonderwhy-er)
- Selection tool to target changes visually (@emcconnell)
- HIGH PRIORITY - Prevent bolt from rewriting files as often (file locking and diffs)
- HIGH PRIORITY - Better prompting for smaller LLMs (code window sometimes doesn't start)
- HIGH PRIORITY - Run agents in the backend as opposed to a single model call
- Deploy directly to Vercel/Netlify/other similar platforms
- Have LLM plan the project in a MD file for better results/transparency
- VSCode Integration with git-like confirmations
- Upload documents for knowledge - UI design templates, a code base to reference coding style, etc.
- Voice prompting
- Azure Open AI API Integration
- Perplexity Integration
- Vertex AI Integration

## bolt.diy Features

- AI-powered full-stack web development directly in your browser.
- Support for multiple LLMs with an extensible architecture to integrate additional models.
- Attach images to prompts for better contextual understanding.
- Integrated terminal to view output of LLM-run commands.
- Revert code to earlier versions for easier debugging and quicker changes.
- Download projects as ZIP for easy portability.
- Integration-ready Docker support for a hassle-free setup.

## Setup bolt.diy 

If you're new to installing software from GitHub, don't worry! If you encounter any issues, feel free to submit an "issue" using the provided links or improve this documentation by forking the repository, editing the instructions, and submitting a pull request. The following instruction will help you get the stable branch up and running on your local machine in no time.  

### Prerequisites  

1. Install Git: [Download Git](https://git-scm.com/downloads)  
2. Install Node.js: [Download Node.js](https://nodejs.org/en/download/)  

   - After installation, the Node.js path is usually added to your system automatically. To verify:  
     - Windows: Search for "Edit the system environment variables," click "Environment Variables," and check if `Node.js` is in the `Path` variable.  
     - Mac/Linux: Open a terminal and run:  
       ```bash  
       echo $PATH  
       ```  
       Look for `/usr/local/bin` in the output.  

### Clone the Repository  

Clone the repository using Git:  

```bash  
git clone -b stable https://github.com/stackblitz-labs/bolt.diy  
```  

### (Optional) Configure Environment Variables  

Most environment variables can be configured directly through the settings menu of the application. However, if you need to manually configure them:  

1. Rename `.env.example` to `.env.local`.  
2. Add your LLM API keys. For example:  

```env  
GROQ_API_KEY=YOUR_GROQ_API_KEY  
OPENAI_API_KEY=YOUR_OPENAI_API_KEY  
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY  
```  

**Note**: Ollama does not require an API key as it runs locally.  

3. Optionally, set additional configurations:  

```env  
# Debugging  
VITE_LOG_LEVEL=debug  

# Ollama settings (example: 8K context, localhost port 11434)  
OLLAMA_API_BASE_URL=http://localhost:11434  
DEFAULT_NUM_CTX=8192  
```  

**Important**: Do not commit your `.env.local` file to version control. This file is already included in `.gitignore`.  

---

## Démarrage Rapide

1. Installation des dépendances
```bash
npm install
```

2. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet :
```env
SESSION_SECRET=votre-secret-très-long
UPLOAD_DIR=./uploads
```

3. Création du dossier d'uploads
```bash
mkdir uploads
```

4. Lancement du serveur de développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Run the Application  

### Option 1: Without Docker

1. Install Dependencies:  
   ```bash  
   pnpm install  
   ```  
   If `pnpm` is not installed, install it using:  
   ```bash  
   sudo npm install -g pnpm  
   ```  

2. Start the Application:  
   ```bash  
   pnpm run dev  
   ```
   This will start the Remix Vite development server. You will need Google Chrome Canary to run this locally if you use Chrome! It's an easy install and a good browser for web development anyway.  

### Option 2: With Docker  

#### Prerequisites  
- Ensure Git, Node.js, and Docker are installed: [Download Docker](https://www.docker.com/)  

#### Steps  

1. Build the Docker Image:  

   Use the provided NPM scripts:  
   ```bash  
   npm run dockerbuild       # Development build  
   npm run dockerbuild:prod  # Production build  
   ```  

   Alternatively, use Docker commands directly:  
   ```bash  
   docker build . --target bolt-ai-development  # Development build  
   docker build . --target bolt-ai-production   # Production build  
   ```  

2. Run the Container:  
   Use Docker Compose profiles to manage environments:  
   ```bash  
   docker-compose --profile development up  # Development  
   docker-compose --profile production up   # Production  
   ```  

   - With the development profile, changes to your code will automatically reflect in the running container (hot reloading).  

---

### Update Your Local Version to the Latest

To keep your local version of bolt.diy up to date with the latest changes, follow these steps for your operating system:

#### 1. Navigate to your project folder  
   Navigate to the directory where you cloned the repository and open a terminal:

#### 2. Fetch the Latest Changes  
   Use Git to pull the latest changes from the main repository:

   ```bash
   git pull origin main
   ```

#### 3. Update Dependencies  
   After pulling the latest changes, update the project dependencies by running the following command:

   ```bash
   pnpm install
   ```

#### 4. Run the Application  
   Once the updates are complete, you can start the application again with:

   ```bash
   pnpm run dev
   ```

This ensures that you're running the latest version of bolt.diy and can take advantage of all the newest features and bug fixes.

---

## Available Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the project.
- `pnpm run start`: Runs the built application locally using Wrangler Pages.
- `pnpm run preview`: Builds and runs the production build locally.
- `pnpm test`: Runs the test suite using Vitest.
- `pnpm run typecheck`: Runs TypeScript type checking.
- `pnpm run typegen`: Generates TypeScript types using Wrangler.
- `pnpm run deploy`: Deploys the project to Cloudflare Pages.
- `pnpm run lint:fix`: Automatically fixes linting issues.

---

## Contributing

We welcome contributions! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## Roadmap

Explore upcoming features and priorities on our [Roadmap](https://roadmap.sh/r/ottodev-roadmap-2ovzo).

---

## FAQ

For answers to common questions, visit our [FAQ Page](FAQ.md).
