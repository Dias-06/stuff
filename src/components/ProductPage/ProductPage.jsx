import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Container from '../Container/Container'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import { addToCart, addToFavorites } from '../../features/user'
import { relatedProducts } from '../../features/products'
import ProductsList from '../ProductsList/ProductsList'
const ProductPage = () => {
    const {id} = useParams()
    
    const { products, related } = useSelector((state) => state.products)
    const favorites = useSelector((state) => state.user.favorites)
    const singleProduct = products.find(item => item.id == id);
    const [currentImage, setCurrentImage] = useState('');
    const isFavorite = favorites.find(item => item.id == singleProduct.id)
    const dispatch = useDispatch()
    useEffect(() => {
        if(singleProduct){
            dispatch(relatedProducts(singleProduct.category.id))
            setCurrentImage(`${singleProduct.images[0]}`)
        }
        
    },[id, dispatch, singleProduct])
    
    const addItemToCart = () =>{
        dispatch(addToCart(singleProduct))
    }
    const addItemToFav = () =>{
        dispatch(addToFavorites(singleProduct))
        console.log(favorites)
    }
    if (!singleProduct) {
        return <h2>Товар не найден...</h2>
    }
    
  return (
    <Container>
        <div className={styles.wrapper}>
            <Sidebar />
             <section className={styles.product}>
                <div className={styles.images}>
                    <div style={{backgroundImage: `url(${currentImage})`}} className={styles.mainImage}></div>
                    <div className={styles.extraImages}>
                        {
                            singleProduct.images.map((item, i) => (
                                <div onClick={() => setCurrentImage(item)} style={{backgroundImage: `url(${item})`}} key={i} className={styles.extraImage}></div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>{singleProduct.title}</p>
                    <p className={styles.category}>Category: {singleProduct.category.name}</p>
                    <span className={styles.price}>{singleProduct.price}$</span>
                    <p className={styles.description}>{singleProduct.description}</p>
                    <div className={styles.buttons}>
                        <Button onClick = {addItemToCart} children={'Add to cart'} />
                        <Button style = {isFavorite} onClick={addItemToFav} children={'Add to favorites'} />
                    </div>
                </div>
            </section>
        </div>
       <ProductsList products={related} title={'Related'} amount={5}  />
    </Container>
    
  )
}

export default ProductPage