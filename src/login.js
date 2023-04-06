import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const loginControl = (() => {
  const grayout = document.querySelector('.grayout');
  const loginContainer = document.querySelector('.login-container');

  const useGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        grayout.className = 'grayout hidden';
        loginContainer.className = 'login-container hidden';
        // do some other stuff
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
