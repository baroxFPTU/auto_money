import { signOutLocal, startPending, stopPending } from 'features/Auth/authSlice';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useDispatch } from 'react-redux';

function useAuth(callback) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    // console.log(user);
    if (!callback) return;
    if (user) {
      callback(user);
    }
  }, [user]);

  useEffect(() => {
    const unregistered = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      console.log({ user, message: 'try' });
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      setUser(userData);
      dispatch(stopPending());
    });

    return () => {
      unregistered();
    };
  }, []);

  const signIn = async (platform) => {
    let provider = null;
    dispatch(startPending());
    switch (platform) {
      case 'google':
        provider = googleProvider;
        break;
      case 'facebook':
        provider = facebookProvider;
        break;
      default:
        setError('Still not supported on this platform.');
        return;
    }
    try {
      const response = await signInWithPopup(auth, provider);
      if (!response) throw new Error('Could not sign in. Let try again.');
    } catch (error) {
      setError(error.message);
    }
    dispatch(stopPending());
  };

  const signInWithGoogle = useCallback(async () => {
    signIn('google');
  }, []);

  const signInWithFacebook = useCallback(async () => {
    signIn('facebook');
  }, []);

  const signOutBoth = useCallback(async () => {
    dispatch(startPending());
    const response = await signOut(auth);
    const action = signOutLocal();
    dispatch(action);
    dispatch(stopPending());
  }, []);

  return { user, error, signInWithGoogle, signInWithFacebook, signOut: signOutBoth };
}

export default useAuth;
