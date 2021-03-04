import React from 'react'
import './SideDrawer.css';
import {CSSTransition} from 'react-transition-group';

const SideDrawer = (props) => {
    return (
        <CSSTransition onClick={props.onClick} in={props.show} classNames="side-drawer" unmountOnExit mountOnEnter timeout={200}>
            <div className="side-drawer">
                {props.children}
            </div>
        </CSSTransition>
        
    )
}

export default SideDrawer
