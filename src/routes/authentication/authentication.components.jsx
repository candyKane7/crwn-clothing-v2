import {
    auth,
    createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form.component.jsx/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        console.log(response)
        if (response) {
            const userDocRef = await createUserDocFromAuth(response.user);
        }
    }, []);

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;