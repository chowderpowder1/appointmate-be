import { useState } from 'react'
import SessionStyles from './OpenPatientSession.module.css'
import Button from '@mui/material/Button';
import Modal from '../../Ui/Modal'
import SessionModal from './SessionModal';
const OpenPatientSession = ({apptData, serviceData}) => {
    const [isOpen, setIsOpen] = useState(null);
  
    const handleOpenModal = (user) => {
    setIsOpen(true);  
  }

  return (
    <div className={SessionStyles.container}>
        <p className={SessionStyles.headerText}>Patient Session</p>
        <Button onClick={() => handleOpenModal(true)} sx={{ borderRadius:'10px', boxShadow:'none'}}variant="contained"> Open Patient Session</Button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <SessionModal apptData={apptData} serviceData={serviceData}></SessionModal>
        </Modal>
    </div>
  )
}

export default OpenPatientSession
