import { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import app from '../firebase/firebase.config';
export const AuthContext = createContext('');



export const auth = getAuth(app);
const UserContexts = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    // sign up with email & password 
    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    // sign in with email & password
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };
    // google login 
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    // get current user by using onAuthStateChanged 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unSubscribe();
    }, []);

    const contextValue = { user, loading, signUp, login, googleLogin }
    return (
        <AuthContext.Provider value={contextValue}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default UserContexts;