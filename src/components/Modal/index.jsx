import React from 'react'
import appConfig from '../../data/config'
import './Modal.css';

const SaveModal = ({handleClose, show, saveString}) => {
  return (
    <Modal handleClose={handleClose} show={show}>
      <input value={saveString}/>
    </Modal>
  )
}

const Modal = ({handleClose, show, children}) => {
  const modalDisplay = show ? {display:'block'} : {display:'none'}
  return (
    <div className='modal' style={modalDisplay}>
      <div className='modalContent'>
        {children}
        <button onClick={handleClose}>Ok</button>
      </div>
    </div>
  )
}

export {
  Modal,
  SaveModal
}