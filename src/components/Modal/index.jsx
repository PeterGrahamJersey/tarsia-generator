import React, { useState } from 'react'
import './Modal.css';

const ClearModal = ({handleClose, show, clearInputs}) => {
  const clearAndClose = () => {
    clearInputs()
    handleClose()
  }
  return (
    <Modal handleClose={handleClose} show={show} closeButton={false}>
      <p>Clear all input?</p>
      <button onClick={clearAndClose} className='clearModalButton'>Ok</button>
      <button onClick={handleClose} className='clearModalButton'>Cancel</button>
    </Modal>
  )
}

const LoadModal = ({handleClose, show, loadFromText}) => {
  const [value, setValue] = useState()
  const closeAndLoad = () => {
    loadFromText(value)
    handleClose()
  }
  const handleInputChange = (event) => {
    setValue(event.target.value);
    //onChange({name:name, questionNumber:questionNumber, value:event.target.value}); // pass back to parent
  }

  return (
    <Modal handleClose={handleClose} show={show} closeButton={false}>
      <p>Paste your tarsia code here:</p>
      <div className='loadModalContent'>
        <input id='loadStringInput' value={value} onChange={(event) => handleInputChange(event)} className='loadModalInput'/>
      </div>
      <div>
        <button onClick={closeAndLoad} className='loadModalButton'>Load</button>
        <button onClick={handleClose} className='loadModalButton'>Cancel</button>
      </div>
    </Modal>
  )
}

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

const Modal = ({handleClose, show, children, closeButton=true}) => {
  const modalDisplay = show ? {display:'block'} : {display:'none'}
  const closeButtonElement = () => {
    if (closeButton) {
      return (<button onClick={handleClose}>Ok</button>)
    } else {
      return null
    }
  }

  return (
    <div className='modal' style={modalDisplay}>
      <div className='modalContent'>
        {children}
        {closeButtonElement()}
      </div>
    </div>
  )
}

export {
  Modal,
  LoadModal,
  SaveModal,
  ClearModal
}
