import React, { useEffect } from 'react'
import Container from '../../components/Container/Container'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './styles.module.css'
import Poster from '../../components/Poster/Poster'
import ProductsList from '../../components/ProductsList/ProductsList'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesList from '../../components/CategoriesList/CategoriesList'
import { filterByPrice } from '../../features/products'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    if (products.products.length == 0 ) return;
    dispatch(filterByPrice(100))
  }, [dispatch, products.products])
  return (
    <Container>
        <section className= {styles.hero}>
          <Sidebar />
          <Poster />
        </section>
        <ProductsList title={'Trending'} products={products.products} amount={5} />
        <CategoriesList title={'Categories'} products={categories.list} amount={5} />
        <ProductsList title={'Less than 100$'} products={products.filtered} amount={5} />
    </Container>
    
  )
}

export default Home