import React from 'react'
import styles from './styles.module.css'
const Button = ({children, onClick, style}) => {
  let styleType = {};
  if(style){
    styleType = {
      backgroundColor: '#576067',
      color: '#B8B8B8'
    }
  }
  return (
    <button style={styleType} onClick={onClick} className={styles.button}>
        {children}
    </button>
  )
}

export default Button