// Stub pour l'authentification locale
export const auth = {
  currentUser: {
    uid: 'local-user',
    email: 'user@local.dev',
  },
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback({
      uid: 'local-user',
      email: 'user@local.dev',
    });
    return () => {};
  },
  signInWithEmailAndPassword: async () => ({
    user: {
      uid: 'local-user',
      email: 'user@local.dev',
    }
  }),
  signOut: async () => {},
};

// Stub pour le stockage local
export const storage = {
  ref: (path: string) => ({
    put: async (file: File) => ({
      ref: {
        getDownloadURL: async () => `/api/files/${file.name}`,
      },
    }),
  }),
};

export default {
  name: 'local-app',
};
