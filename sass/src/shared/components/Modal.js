import React from 'react'
import './Modal.scss';
import {CSSTransition} from 'react-transition-group';
const Modal = (props) => {
    const element = (
        <div className={`modal ${props.modalClass}`} onClick={props.onClick}>
            <div className={`modal-header ${props.headerClass}`}>
                <h1>{props.header}</h1>
            </div>
            <div className={`modal-content ${props.contentClass}`}>
                {props.children}
            </div>
            <footer className={`modal-footer ${props.footerClass}`}>
                {props.footer}
            </footer>
        </div>
    )
    return (
        <CSSTransition classNames="modal" in={props.show} mountOnEnter unmountOnExit timeout={200}>
            {element}
        </CSSTransition>
    )
}

export default Modal
