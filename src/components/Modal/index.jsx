import React from 'react'
import appConfig from '../../data/config'
import './Modal.css';

const SaveModal = ({handleClose, show, saveString}) => {
  const copySaveString = () => {
    saveString = document.getElementById('saveStringInput')
    saveString.select();
    saveString.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy")
  }

  return (
    <Modal handleClose={handleClose} show={show}>
      <p>Copy and store the code to come back to your tarsia later:</p>
      <div className='saveModalContent'>
        <input id='saveStringInput' value={saveString} readOnly='readonly' className='saveStringInput'/>
        <button onClick={copySaveString}>
          Copy
        </button>
      </div>
    </Modal>
  )
}

const Modal = ({handleClose, show, children}) => {
  const modalDisplay = show ? {display:'block'} : {display:'none'}
  return (
    <div className='modal' style={modalDisplay}>
      <div className='modalContent'>
        {children}
        <div>
          <button onClick={handleClose}>Ok</button>
        </div>
      </div>
    </div>
  )
}

export {
  Modal,
  SaveModal
}
