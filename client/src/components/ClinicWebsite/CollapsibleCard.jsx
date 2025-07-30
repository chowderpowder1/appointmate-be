import React from 'react'
import { useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";

const CollapsibleCard = ({title, body, children}) => {
    const [isExpanded, setIsExpanded] = useState(null);

    const toggleClass = () =>{
        setIsExpanded(!isExpanded);
    }
  return (
      <div onClick={toggleClass} className={ isExpanded ? 'collapsible-card selected-card' : 'collapsible-card '}> 
        {title}
         <p className={ isExpanded ? 'collapsible-card-text active' : 'collapsible-card-text hidden'}> {children} </p>
        <button className={ isExpanded ? 'faq-btn active': 'faq-btn'} >
            <IoIosArrowUp />
        </button>
    </div>
  )
}

export default CollapsibleCard
