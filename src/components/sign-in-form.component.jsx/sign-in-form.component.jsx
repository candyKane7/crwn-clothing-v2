import { useState, useContext } from "react";
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
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Please fill in email or password");
            return;
        }
        try {
            // Sign in
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (e) {
            console.error('Failed to sign in', e.message);
        }
    }
    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
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
            <form onSubmit={handleSubmit}>
                <FormInput label='Email'
                    type="text"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;