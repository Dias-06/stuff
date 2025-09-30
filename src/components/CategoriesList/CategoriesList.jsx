import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
const CategoriesList = ({title, amount, products = []}) => {
    const list = products.filter((_, i) => i < amount)
  return (
    <section className={styles.products}>
        {
            title && <h2 className={styles.title}>{title}</h2>
        }
        <div className={styles.list}>
        {
            list.map(item => (
                <Link key={item.id} to={`/category/${item.id}`}>
                    <div className={styles.card}>
                        <div className={styles.image} style={{backgroundImage: `url(${item.image})`}}>
                        </div>
                        <h2 className={styles.cardTitle}>{item.name}</h2>
                        
                    </div>
                </Link>
                
            ))
        }
        </div>
    </section>
  )
}

export default CategoriesList