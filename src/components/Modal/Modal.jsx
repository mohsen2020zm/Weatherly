import './Modal.css'
import { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({onAdd, onClose}) {

    const [cityNameInput, setCityNameInput] = useState('')

    const addHandler = () => {
        if(cityNameInput){
            onAdd(cityNameInput)
            onClose()
        }
    }

  return (
    <div className='modal-blur-background' onClick={() => onClose()}>
        <div className='modal-main-div' onClick={e => e.stopPropagation()}>
            <div className="modal-close-btn" onClick={() => onClose()}>
                <IoCloseSharp />
            </div>
            <div className='modal-inp-tit-div'>
                <p className='modal-title'>Please enter the name of city:</p>
                <input
                type="text" 
                className='modal-input' 
                autoFocus
                value={cityNameInput}
                onChange={e => setCityNameInput(e.target.value)}
                onKeyDown={e => e.key == 'Enter' && addHandler()}/>
                <button
                className='modal-add-btn'
                onClick={() => addHandler()}>
                Add
                </button>
            </div>
        </div>
    </div>
  )
}