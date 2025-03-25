import { useState } from 'react';
import './Modal.css'
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
    <div className='modal-main-div'>
        <div className="modal-close-btn" onClick={() => onClose()}>
            <IoCloseSharp />
        </div>
        <div className='modal-inp-tit-div'>
            <p className='modal-title'>Please Enter the name of city:</p>
            <input
             type="text" 
             className='modal-input' 
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
  )
}