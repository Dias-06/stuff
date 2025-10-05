import React, { useEffect, useState } from 'react'
import styles from '../ProductsList/styles.module.css'
import { Link } from 'react-router-dom'
const FilterProductList = ({title, products = []}) => { 
    const [searchValue, setSearchValue] = useState('')
    const [priceValue, setPriceValue] = useState(0)
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        setFiltered(products)
    }, [products])
    useEffect(() =>{
        const filteredProducts = products.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()) && item.price >= priceValue)
        setFiltered(filteredProducts)
    }, [searchValue, priceValue])
    
  return (
    <section className={styles.products}>

        {
            title && <h2 className={styles.title}>{title}</h2>
        }
        <div className={styles.filter}>
            <input onChange={(e) => setSearchValue(e.target.value)} placeholder='search...' type="text" className={styles.search}/>
            <input onChange={(e) => setPriceValue(e.target.value)} placeholder='price from' type='number' className={styles.filterPrice}/>
        </div>
        {
            products.length== 0 ? (<p className={styles.loading}>Loading...</p>) : 
        
        (<div className={styles.list}>
        {
            filtered.map(item => (
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

export default FilterProductList