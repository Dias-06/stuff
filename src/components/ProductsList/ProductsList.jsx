import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filterByPriceRange, filterByTitle } from '../../features/products'
const ProductsList = ({title, amount, products = []}) => {
    const dispatch = useDispatch();
    const list = products.filter((_, i) => i < amount);
    const location = useLocation();
    const [searchValue, setSearchValue] = useState('');
    const [priceRange, setPriceRange] = useState({min: 0, max: 500})
    const {isLoading} = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(filterByTitle(searchValue));
    }, [searchValue])
    useEffect(() => {
        dispatch(filterByPriceRange(searchValue.min, searchValue.max))
    })
  return (
    <section className={styles.products}>

        {
            title && <h2 className={styles.title}>{title}</h2>
        }
        {
            location.pathname.includes('category') && (
                <div className={styles.filter}>
                    <input onChange={(e) => setSearchValue(e.target.value)} placeholder='search...' type="text" className={styles.search} />
                    <input onChange={(e) => setPriceRange({...prev, min: e.target.value})} placeholder='0$' type='number' className={styles.filterPrice} />
                    <input onChange={(e) => setPriceRange({...prev, max: e.target.value})} placeholder='999$' type='number' className={styles.filterPrice}/>
                </div>  
            )
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