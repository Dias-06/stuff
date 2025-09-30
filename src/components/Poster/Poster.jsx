import React from 'react'
import styles from './styles.module.css'
import Button from '../Button/Button'
import poster from '../../assets/poster.png'
const Poster = () => {
  return (
    <div className={styles.poster}>
        <p className={styles.subTitle}> THE BESTELLER OF 2025 </p>
        <h1 className={styles.title}>LENNON R2D2 with NVIDIA 5090 TI</h1>
        <Button>Shop now</Button>
        <img width={462} height={359} className={styles.image} src={poster} alt="" />
    </div>
  )
}

export default Poster