import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // user login method using email and password
    const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Signin with popup
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // user logout method
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser && currentUser.email) {
                const loggedUser = {
                    email: currentUser.email
                }
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loggedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data)
                        // warning: Local storage is not the best (second best place) to store access token.
                        localStorage.setItem('car-doctor-access-token', data.token);

                    })
            }
            else {
                localStorage.removeItem('car-doctor-access-token');
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authIfo = {
        user,
        loading,
        createUser,
        logIn,
        logOut,
        googleSignin
    }

    return (
        <AuthContext.Provider value={authIfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;