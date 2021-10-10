import React, { useState } from 'react';
import { Button, Input, Container, Flex, Paragraph} from 'theme-ui';

const ClearModal = ({handleClose, show, clearInputs}) => {
  const clearAndClose = () => {
    clearInputs()
    handleClose()
  }
  return (
    <Modal handleClose={handleClose} show={show} closeButton={false}>
      <Paragraph>Clear all input?</Paragraph>
      <Button mr={2} onClick={clearAndClose}>Ok</Button>
      <Button onClick={handleClose}>Cancel</Button>
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
      <Paragraph>Paste your tarsia code here:</Paragraph>
      <Input mb={2} id='loadStringInput' value={value} onChange={(event) => handleInputChange(event)}/>
      <Button mr={2} onClick={closeAndLoad}>Load</Button>
      <Button onClick={handleClose}>Cancel</Button>
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
      <Paragraph>Copy and store the code to come back to your tarsia later:</Paragraph>
      <Flex>
        <Input mr={2} id='saveStringInput' value={saveString} readOnly='readonly'/>
        <Button onClick={copySaveString}>Copy</Button>
      </Flex>
    </Modal>
  )
}

const Modal = ({handleClose, show, children, closeButton=true}) => {
  const modalDisplay = show ? {display:'block'} : {display:'none'}
  const closeButtonElement = () => {
    if (closeButton) {
      return (<Button mt={2} onClick={handleClose}>Ok</Button>)
    } else {
      return null
    }
  }
  return (
    <Container variant='modal' style={modalDisplay}>
      <Container variant='modalContent'>
        {children}
        {closeButtonElement()}
      </Container>
    </Container>
  )
}

export {
  Modal,
  LoadModal,
  SaveModal,
  ClearModal
}
