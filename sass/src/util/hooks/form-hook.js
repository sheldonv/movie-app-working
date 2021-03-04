import {useState, useCallback, useReducer, useEffect} from 'react';

const formReducer = (state, action) => {
    console.log('reached')
    let formIsValid = true
    switch(action.type){
        case 'change':
        for(const inputId in state.Inputs){
            if(!state.Inputs[inputId]){
                continue;
            }
            if(inputId === action.id){
                formIsValid = formIsValid && action.isValid
            }else{
                formIsValid = formIsValid && state.Inputs[inputId].isValid
            }
        }
        return {
            ...state,
            Inputs: {
                ...state.Inputs,
                [action.id]: {value: action.value, isValid: action.isValid}
            },
            isValid: formIsValid
        }
        case 'set-data':
            return {
                Inputs: action.Inputs,
                isValid: action.isValid
            }
    }
}
export const useForm = (initialInputs, initialFormValidity) => {
    const [formText, dispatch] = useReducer(formReducer, {
        Inputs: initialInputs,
        isValid: initialFormValidity
    })
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'change', id: id, value: value, isValid: isValid})
    }, [])
    const setFormData = useCallback((inputValues, formValidity) => {
        dispatch({type: 'set-data', Inputs: inputValues, isValid: formValidity})
    }, [])

    return [formText, inputHandler, setFormData];
}