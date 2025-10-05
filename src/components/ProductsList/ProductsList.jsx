import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ProductsList = ({title, amount, products = []}) => {
    const list = products.filter((_, i) => i < amount);
    
    const {isLoading} = useSelector((state) => state.products);

  return (
    <section className={styles.products}>

        {
            title && <h2 className={styles.title}>{title}</h2>
        }
        {
            isLoading == true ? (<p className={styles.loading}>Loading...</p>) : 
        
        (<div className={styles.list}>
        {
            list.map(item => (
                <Link key={item.id} to={`/products/${item.id}`}>
                    <div className={styles.card}>
                        <div className={styles.image} style={{backgroundImage: `url(${item.images[0]})`}}>
                        </div>
                        <div className={styles.info}>
                            <p className={styles.cardTitle}>{item.title}</p>
                            <p className={styles.category}>{item.category.name}</p>
                            <span className={styles.price}>{item.price}$</span>
                        </div>
                        
                    </div>
                </Link>
                
            ))
        }
        </div>)}
    </section>
  )
}

export default ProductsList
