import React, {useRef, useState, useEffect} from 'react'

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const filePickerRef = useRef();
    useEffect(() => {
        if(!file){
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file])
    const filePickerHandler = () => {
        filePickerRef.current.click();
    }
    const pickedHandler = (event) => {
        let pickedImage 
        let fileIsValid;
        const file = event.target.files
        if(file && file.length === 1){
            pickedImage = file[0]
            setFile(pickedImage);
            setIsValid(true)
            fileIsValid = true
        }else{
            fileIsValid = false;
            setIsValid = false;
        }
        props.onInput(props.id, pickedImage, fileIsValid)
    }
    return (
        <div className="image-upload">
            <input 
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={pickedHandler}
                ref={filePickerRef}
                style={{display: 'none'}}
                id={props.id}
            />
            <div className="image-upload__preview">
                <img src={previewUrl} alt="preview"/>
            </div>
            <button type="button" onClick={filePickerHandler}>PICK IMAGE</button>
        </div>
    )
}

export default ImageUpload
