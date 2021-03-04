import React from 'react'
import Input from '../../shared/formElements/Inputs';
import { useForm } from '../../util/hooks/form-hook';
import { REQUIRE } from '../../util/validators/validator';
import './SignUp.scss';
import {useContext, useCallback} from 'react';
import {AuthContext} from '../../util/context/auth-context';
import ImageUpload from '../../shared/formElements/ImageUpload'
import {useHttpClient} from '../../util/hooks/http-hook'
import {useParams} from 'react-router-dom';

const SignUp = (props) => {
    const {sendRequest} = useHttpClient();
    const profileId = useParams().profileId;
    const auth = useContext(AuthContext);
    const http = useCallback(async (url, method = 'GET', body = null, headers = {'Authorization': 'Bearer ' + auth.token}) => {
        const response = await fetch(url, {
            method,
            body,
            headers
        })
        const responseData = await response.json()
        console.log(responseData)
        return responseData;
    }, [])
    const [formText, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        name: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
        
    })
    const signUp = async (event) => {
        event.preventDefault();
        console.log(formText.Inputs.name.value);
        let formData = new FormData();
        if(!profileId){

        }
        formData.append('name', formText.Inputs.name.value);
        formData.append('email', formText.Inputs.email.value);
        formData.append('password', formText.Inputs.password.value);
        formData.append('image', formText.Inputs.image.value)
        if(!profileId){
                try{
                
                console.log(formData)
            
                for (var key of formData.entries()) {
                    console.log(key[0] + ', ' + key[1]);
                }
                
                /*const responseData = await sendRequest(
                    'http://localhost:3000/signup',
                    'POST',
                    formData
                );*/
                /*const response = await useCallback(fetch('http://localhost:3000/signup',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }), []) 
                const responseData = await response.json()*/
                const responseData = await http(`${process.env.REACT_APP_BACKEND_URL}/signup`, 'POST', formData)
                if(responseData.auth){
                    auth.login();
                }
                
            }catch{
                console.log('Invalid entry')
            } 
        }else{
            console.log('reached')
            const responseData = await http(`${process.env.REACT_APP_BACKEND_URL}/update/${profileId}`, 'PATCH', formData)
            console.log(responseData)
        }
          
    }
    return (
        <form class="form">
            <label>Name</label>
            <div className="form-element-div">
                <Input type="text" id="name" element="input" onChange={inputHandler} validators={[REQUIRE()]}/>
            </div>
            <label>Email</label>
            <div className="form-element-div"> 
                <Input type="text" id="email" element="input" onChange={inputHandler} validators={[REQUIRE()]}/>
            </div>
            <label>Password</label>
            <div className="form-element-div">
                <Input type="text" id="password" element="input" onChange={inputHandler} validators={[REQUIRE()]}/>
            </div>
            <div className="form-element-div">
                <ImageUpload  id="image" onInput={inputHandler} />
            </div>
            
            <div className="form-element-div">
                <button onClick={signUp} disabled={!formText.isValid}>SIGN UP</button>
            </div>
            
        </form>
    )
}

export default SignUp
