import React from 'react'
import './Login';
import Inputs from '../../shared/formElements/Inputs';
import { REQUIRE } from '../../util/validators/validator';
import { useForm } from '../../util/hooks/form-hook';
import {AuthContext} from '../../util/context/auth-context';
import {useContext} from 'react';
import ImageUpload from '../../shared/formElements/ImageUpload';

const Login = () => {
    const auth = useContext(AuthContext)
    const [formText, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)
    const login = async (event) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formText.Inputs.email.value,
                password: formText.Inputs.password.value
            })
        })
        const responseData = await response.json();
        console.log(responseData);
        console.log(responseData)
        if(responseData.auth){
            await auth.login(responseData.profile._id, responseData.profile.name, responseData.token);
        }
        
    }
    const printUser = (event) => {
        event.preventDefault();
        console.log(auth.userId)
    }
    return (
        <form className="form">
            
            <div className="form-element-div">
                <label>Email</label>
                <Inputs element="input" id="email" onChange={inputHandler} validators={[REQUIRE()]} />
            </div>
            <div className="form-element-div">
                <label>Password</label>
                <Inputs element="input" id="password" onChange={inputHandler} validators={[REQUIRE()]} />
            </div>
            
            <div className="form-element-div">
                <button onClick={login} disabled={!formText.isValid}>Login</button>
                <button onClick={printUser}>USER</button>
            </div>
            
        </form>
    )
}

export default Login
