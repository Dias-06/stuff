import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Sidebar = () => {
    const {list} = useSelector(({categories}) => categories)
  return (
    <section className={styles.sidebar}>
        <h2 className={styles.title}>CATEGORIES</h2>
        <ul className={styles.list}>
            {list.map((item, index) => index < 5 && (
                <li key={item.id} className={styles.listItem}>
                    <Link to={`/categories/:${item.id}`} className={styles.link}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Sidebar