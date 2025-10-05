import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { filterByCategory, getProducts } from '../../features/products';
import Container from '../../components/Container/Container';
import Sidebar from '../../components/Sidebar/Sidebar';
import Poster from '../../components/Poster/Poster';
import { useParams } from 'react-router-dom';

import FilterProductList from '../../components/FilterProductList/FilterProductList';
const CategoryPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch()
  const {filtered, products} = useSelector((state) => state.products);
  const {list} = useSelector((state) => state.categories);
  const singleCategory = list.find(item => item.id == Number(id));
  useEffect(() => {
    if (products.length == 0 ) return;
    dispatch(filterByCategory(Number(id)))
  }, [id])
  
  
  return (
     <Container>
        <section className= {styles.hero}>
          <Sidebar />
          <Poster />
        </section>
        <FilterProductList
          title={singleCategory && singleCategory.name}
          products={filtered}
        />
    </Container>
  )
}

export default CategoryPage