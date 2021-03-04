import React, {useState} from 'react'
import './Videos.css'
import Modal from '../../shared/components/Modal';
const Videos = (props) => {
    const [show, setShow] = useState(false)
    const playVideo = () => {
        setShow(true)
    }
    const closeVideo = (event) => {
        event.preventDefault();
        setShow(false) 
        console.log('reached')
        console.log(show)
    }
    return (
        <div id={props.movieId}>
            {!show && <img onClick={playVideo} src={`https://img.youtube.com/vi/${props.id}/default.jpg`} />}
            <Modal show={show} header={props.title} modalClass="modalClass" footerClass="footerClass" headerClass="headerClass" contentClass="contentClass" footer={<button onClick={closeVideo}>CLOSE</button>}>
                    <iframe width="420" height="345" src={`https://www.youtube.com/embed/${props.id}?autoplay`} frameborder="0" allowFullScreen>
                    </iframe>
                </Modal>
        </div>
    )
}

export default Videos
