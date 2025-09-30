import React, { useState } from 'react'
import styles from './styles.module.css'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { createUser, toggleFormType } from '../../features/user'
const UserSignUp = ({closeForm}) => {
  const dispatch = useDispatch()
  const [values, setvalues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: ''
  })
  function register(){
    const isNotEmpty = Object.values(values).some((val) => val)
    if(!isNotEmpty) return;
    dispatch(createUser(values))
    closeForm()
  }
  function handleToggleFormType(){
    console.log('changed')
    dispatch(toggleFormType("login"));
    
  }
  return (
    <>
      <div className={styles.modal}>
        <p className={styles.title}>Register</p>
        <form className={styles.form}>
            <input value={values.email} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value}) } name='email' className={styles.input} placeholder='@ivan.gmail.com' type="email" />
            <input value={values.password} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value})} name='password' className={styles.input} placeholder='password' type='password' />
            <input value={values.name} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value})} name='name' className={styles.input} placeholder='Ivan' type="text" />
            <input value={values.avatar} onChange={(e) => setvalues({...values, [e.target.name]: e.target.value})} name='avatar' className={styles.input} placeholder='avatar-link' type="text" />
        </form>
        <p className={styles.login} onClick={handleToggleFormType}>I already have an account</p>
        <Button onClick={register} className = {styles.button}>Create an account</Button>
      </div>
    </>
    
  )
}

export default UserSignUp