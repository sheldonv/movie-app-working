import React from 'react'
import './MainHeader.css'

const MainHeader = (props) => {
    return (
        <nav className={`main-header ${props.className}`}>
           {props.children} 
        </nav>
    )
}

export default MainHeader
