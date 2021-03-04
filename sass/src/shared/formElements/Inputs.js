import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { validate } from '../../util/validators/validator'
import './Inputs.css';
const inputReducer = (state, action) => {
    switch(action.type){
        case 'input-change':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        default:
            return state
    }
}
const Inputs = (props) => {
    const [inputText, dispatch] = useReducer(inputReducer, {
        value: props.value || '',
        isValid: props.valid || false
    })
    const {value, isValid} = {...inputText};
    const {id, onChange} = props;
    useEffect(() => {
        onChange(id, value, isValid)
    }, [id, value, isValid, onChange])
    const inputHandler = useCallback((event) => {
        dispatch({type: 'input-change', value: event.target.value, validators: props.validators})
    }, [])
    let  element 
    switch(props.element){
        case 'input':
            element = (<input type="text" className={props.search ? 'input_search': 'input_regular'} placeholder={props.placeholder} onChange={inputHandler} value={inputText.value}/>);
            break;
        case 'dropDown':
            element = (<select onChange={inputHandler} value={inputText.value}></select>)
    }
    return (
        <React.Fragment>
            <div>
                {element}
            {!inputText.isValid && !props.search && <p>Please Enter Some Text</p>}
            </div>
            
        </React.Fragment>
    )
}

export default Inputs
