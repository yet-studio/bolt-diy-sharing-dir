import { useEffect, useState } from 'react';
import { auth } from '~/lib/firebase';

interface AuthUser {
  uid: string;
  email: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  return {
    user,
    loading,
    signIn,
    signOut,
  };
}
