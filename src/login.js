import {
  signInWithRedirect, getAuth, GoogleAuthProvider,
} from 'firebase/auth';

const loginControl = (() => {
  const grayout = document.querySelector('.grayout');
  const loginContainer = document.querySelector('.login-container');

  const useGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider).then(() => {
      grayout.className = 'grayout hidden';
      loginContainer.className = 'login-container hidden';
    });
  };

  const useLocalStorage = () => {
    localStorage.setItem('usingLocal', true);
  };

  return {
    useGoogle,
    useLocalStorage,
  };
})();

export default loginControl;
