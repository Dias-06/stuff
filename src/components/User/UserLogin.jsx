import React, { useState } from 'react'
import styles from './styles.module.css'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { loginUser, toggleFormType } from '../../features/user'
const UserLogin = ({closeForm}) => {
  const dispatch = useDispatch()
  const [values, setvalues] = useState({
    email: '',
    password: '',
  })
  function login(){
    const isNotEmpty = Object.values(values).some((val) => val)
    if(!isNotEmpty) return;
    dispatch(loginUser(values))
    closeForm()
  }
  function handleToggleFormType(){
    dispatch(toggleFormType("signUp"));
  }
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.title}>Register</p>
        <form className={styles.form}>
            <input value={values.email} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value}) } name='email' className={styles.input} placeholder='@ivan.gmail.com' type="email" />
            <input value={values.password} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value})} name='password' className={styles.input} placeholder='password' type='password' />
        </form>
        <p onClick={handleToggleFormType} className={styles.login}>Create an acount</p>
        <Button onClick={login} className = {styles.button}>Login</Button>
      </div>
    </>
    
  )
}

export default UserLogin