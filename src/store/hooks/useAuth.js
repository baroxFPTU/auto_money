import { signOutLocal } from 'features/Auth/authSlice';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

function useAuth(callback) {
  const counter = useRef(0);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    if (!callback) return;
    if (user && counter.current < 1) {
      callback(user);
      counter.current++;
    }
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      setUser(userData);
    })
  }, []);

  const signIn = async (platform) => {
    let provider = null;

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
      const userData = {
        uid: response.user.uid,
        displayName: response.user.displayName,
        photoURL: response.user.photoURL,
      }
      
      setUser(userData);
    } catch (error) {
      setError(error.message);
    }
  }

  const signInWithGoogle = useCallback(async () => {
    signIn('google');
  },[]);

  const signInWithFacebook = useCallback(async () => {
    signIn('facebook');
  }, []);

  const signOutBoth = useCallback(async () => {
    const response = await signOut(auth);
    const action = signOutLocal();
    dispatch(action);
    callback();
  });
  
  return {user, signInWithGoogle, signInWithFacebook, signOut: signOutBoth};
}

export default useAuth;