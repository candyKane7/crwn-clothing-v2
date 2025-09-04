import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    createUserDocFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill in email or password");
            return;
        }
        try {
            // Sign in
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (e) {
            console.error('Failed to sign in', e.message);
        }
    }
    
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value} )
    }

    const resetFormFields = () => setFormFields(defaultFormFields);

    return (
        <div className="sign-up-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={onSubmit}>
                <FormInput label='Email'
                    type="text"
                    required
                    onChange={handleChange}
                    name="Email"
                    value={email} />

                <FormInput label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="Password"
                    value={password} />
                
                <div className="buttons-container">
                    <Button onClick={onSubmit}>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;