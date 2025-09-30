import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserSignUp from '../User/UserSignUp'
import { toggleForm } from '../../features/user'
import styles from '../User/styles.module.css'
import UserLogin from '../User/UserLogin'
const UserForm = () => {
  const dispatch = useDispatch()
  function closeForm(){
    dispatch(toggleForm(false))
  }
  const {showForm, formType} = useSelector((state) => state.user)
  return showForm ? <> 
    <div onClick={closeForm} className={styles.overlay}></div>
    {formType === "signUp" ? (<UserSignUp closeForm = {closeForm}/>) : (<UserLogin closeForm={closeForm} />)}
  </> : <></>;
}

export default UserForm