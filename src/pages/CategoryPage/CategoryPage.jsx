import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { filterByCategory, getProducts } from '../../features/products';
import Container from '../../components/Container/Container';
import Sidebar from '../../components/Sidebar/Sidebar';
import Poster from '../../components/Poster/Poster';
import { useParams } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList';
const CategoryPage = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const {products,filtered} = useSelector((state) => state.products);
  const {list} = useSelector((state) => state.categories);
  const singleCategory = list.find(item => item.id == Number(id));
  // const filtered = products.filter(item => item.category.id == id);
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [products.length, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      dispatch(filterByCategory(Number(id)));
    }
  }, [id, products, dispatch]);
  return (
     <Container>
        <section className= {styles.hero}>
          <Sidebar />
          <Poster />
        </section>
        <ProductsList title={singleCategory && singleCategory.name} products={filtered} amount={filtered.length} />
    </Container>
  )
}

export default CategoryPage