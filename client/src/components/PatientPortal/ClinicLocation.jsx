import { useState, React} from 'react'
import LocationStyles from './ClinicLocation.module.css'
import { IoLocation } from "react-icons/io5";
import Modal from '../../components/Ui/Modal'
import ClinicPhoto from '../../assets/AwZabarte.jpg'
const ClinicLocation = () => {

    const [isOpen, setIsOpen] = useState(false);

    // const activeModal = () => {
    //     setModal(!isOpen);
    // }
    
  return (

    <div className={LocationStyles.locationContainer}>
      
      <Modal open={isOpen} onClose={() => setIsOpen(false)}> 
      <img src={ClinicPhoto} alt="" />
          {/* <button onClick={activeModal}>close</button> */}
      </Modal>

        
      <div className={LocationStyles.locationTitleContainer}>
            <IoLocation className={LocationStyles.locationIcon}/>
            <h1 className={LocationStyles.locationTitle}>Clinic Location</h1>
      </div>
        <div className="divider"></div>
      <div className={LocationStyles.locationDataContainer}>

        <div className={LocationStyles.locationDataItem}>
            <p className={LocationStyles.locationDataItemTitle}>Branch Name:</p>
            <p className={LocationStyles.locationDataItemText}>Accelerated Wellness Zabarte Road Quezon City</p>
            <button onClick={() => setIsOpen(true)} className={LocationStyles.viewBtn}>View Clinic</button>
        </div>

        <div className={LocationStyles.locationDataItem}>
            <p className={LocationStyles.locationDataItemTitle}>Full Address:</p>
            <p className={LocationStyles.locationDataItemText}>JDC Building Blk 5 Lot 9 Zabarte Road, Hobart Village, Brgy Kaligayahan, Novaliches, Quezon City</p>
            <button className={LocationStyles.viewBtn}>View Location</button>
        </div>

        <div className={LocationStyles.locationDataItem}>
            <p className={LocationStyles.locationDataItemTitle}>Nearby Landmarks:</p>
            <p className={LocationStyles.locationDataItemText}>Located near Don Ramon Street and Gordo’s Crispy Pata</p>
        </div>

      </div>

    </div>
  )
}
export default ClinicLocation
