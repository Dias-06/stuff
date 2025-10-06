import React from 'react'
import Container from '../Container/Container'
import styles from './header.module.css'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import search from '../../assets/search.svg'
import like from '../../assets/like.svg'
import shop from '../../assets/shop.svg'
import { useState, useEffect } from "react";
import avatar from '../../assets/avatar.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectTotalAmount, toggleForm } from '../../features/user'
const Header = () =>{
  const {products} = useSelector((state) => state.products);
  const [filterdProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState(''); 
  const [values, setValues] = useState({name: 'Guest', avatar: avatar})
  const dispatch = useDispatch()
  const {currentUser, favorites} = useSelector((state) => state.user);
  const totalAmount = useSelector(selectTotalAmount)
  useEffect(() =>{
    if(!currentUser) return;
    setValues(currentUser)
  }, [currentUser])
  function handleClick(){
    if(!currentUser) dispatch(toggleForm(true))
  }
  useEffect(() =>{
    if(!searchValue.trim()){
      setFilteredProducts([]);
      return;
    }
    const res = products.filter(item => item.title.toLowerCase().includes(searchValue));
    setFilteredProducts(res);
  },[searchValue])
  return (
    <Container>
        <div className={styles.header}>
            <NavLink to={'/'}>
              <img src={logo} alt="" />
            </NavLink>
            <NavLink>
              <div onClick={handleClick} className={styles.user}>
                <div className={styles.avatarWrapper}>
                  <img className={styles.avatar} src={values.avatar} alt="" />
                </div>
                <p className={styles.userInfo}>{values.name}</p>
              </div>
              
            </NavLink>
            <div className={styles.search}>
              <img src={search} alt="" />
              <input onChange={(e) => setSearchValue(e.target.value)} type="text" className={styles.searchInput} placeholder='Search for anything...' />
                  {
                    filterdProducts.length > 0 && (
                      <div className={styles.searchRes}>
                        {
                          filterdProducts.map(item => (
                            <Link to={`/products/${item.id}`}>
                                <div className={styles.product}>
                                  <img className={styles.productImage} src={item.images[0]} alt="product" />
                                  <p className={styles.productTitle}>{item.title}</p>
                                </div>
                            </Link>
                          ))
                        }
                      </div>
                    )
                  }
            </div>
            <div className={styles.controls}>
              <div className={styles.cartWrapper}>
                  <NavLink to={'/saved'}>
                    <img src={like} alt="" />
                  </NavLink>
                  <span className={styles.countCart}>{favorites.length}</span>
              </div>   
              <div className={styles.cartWrapper}>
                <NavLink to={'/cart'}>
                  <img src={shop} alt="" />
                </NavLink>
                <span className={styles.countCart}>{totalAmount}</span>
              </div>
              
              
            </div>
        </div>
    </Container>
    
  )
}

export default Header