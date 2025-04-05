'use client'

import Image from "next/image";
import './Spinner.scss'

const Spinner = () => {

  return (
    <div className="spinner">
      <Image className="spinner__loading" src='/images/tube-spinner.svg' width={100} height={100} alt="loading..." />
      <div className="spinner__container"></div>
    </div>
  )
  
}

export default Spinner;