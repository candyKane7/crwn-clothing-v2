import {
    auth,
    createUserDocFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        console.log(response)
        if (response) {
            const userDocRef = await createUserDocFromAuth(response.user);
        }
    }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    };

    return (
        <>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            <SignUpForm />
        </>
    )
}

export default SignIn;