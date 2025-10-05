import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Container from '../../components/Container/Container';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, delFromCart } from '../../features/user';
const CartPage = () => {
    const dispatch = useDispatch()
    const {cart} = useSelector((state) => state.user)
    const [totalPrice, setTotalPrice] = useState(0)
    function countTotal(){
        let res = 0
        cart.map(item =>{
            res+=item.quntity * item.price
        })
        setTotalPrice(res);
    }
    function changeQuantity(item ,newQuantity){
        newQuantity > 0 && dispatch(addToCart({...item, quntity: newQuantity}))
    }
    function delItemFromCart(item){
        dispatch(delFromCart(item))
    }
    useEffect(() => {
        countTotal()
    }, [cart])
  return (
     <Container>
        <section className= {styles.wrapper}>
          <Sidebar />
          <div className={styles.cart}>
            {
                cart.length == 0 ? (<p className={styles.empty}> Here is empty </p>) : (
                    <ul className={styles.cartElements}>
                        {cart.map(item => (
                            <li key={item.id} className={styles.cartElement}>
                            <div className={styles.leftSide}>
                                <div style={{backgroundImage: `url(${item.images[0]})`}} className={styles.image}></div>
                                <div className={styles.info}>
                                    <p className={styles.title}>{item.title}</p>
                                    <span className={styles.type}>{item.category.name}</span>
                                </div>
                            </div>
                            <div className={styles.rightSide}>
                                <span className={styles.price}>{item.price}$</span>
                                <div className={styles.actions}>
                                    <span onClick={() => changeQuantity(item, item.quntity - 1)} className={styles.plus}>
                                        <svg width="15" height="3" viewBox="0 0 15 3" fill="Inherit" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.4895 0.3125H1.51055C0.883398 0.3125 0.375 0.843164 0.375 1.5C0.375 2.15684 0.883398 2.6875 1.51055 2.6875H13.4895C14.1166 2.6875 14.625 2.15684 14.625 1.5C14.625 0.843164 14.1166 0.3125 13.4895 0.3125Z" fill="white" fill-opacity="0.5"/>
                                        </svg>
                                    </span>
                                    <input value={item.quntity} type="number" className={styles.count}/>
                                    <span onClick={() => changeQuantity(item, item.quntity + 1)} className={styles.minus}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="Inherit" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.125 6.5625H8.4375V1.875C8.4375 1.3575 8.0175 0.9375 7.5 0.9375C6.9825 0.9375 6.5625 1.3575 6.5625 1.875V6.5625H1.875C1.3575 6.5625 0.9375 6.9825 0.9375 7.5C0.9375 8.0175 1.3575 8.4375 1.875 8.4375H6.5625V13.125C6.5625 13.6425 6.9825 14.0625 7.5 14.0625C8.0175 14.0625 8.4375 13.6425 8.4375 13.125V8.4375H13.125C13.6425 8.4375 14.0625 8.0175 14.0625 7.5C14.0625 6.9825 13.6425 6.5625 13.125 6.5625Z" fill="white"/>
                                        </svg>
                                    </span>
                                </div>
                                <span className={styles.totalPrice}>{item.price * item.quntity}$</span>
                            </div>
                            <span onClick={() => delItemFromCart(item)} width={30} height = {30} className={styles.delete}>
                                <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="Inherit" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"/>
                                </svg>
                            </span>
                        </li>
                        ))}
                        
                    </ul>)
            }
           <div className={styles.bottom}>
            <span className={styles.total}>TOTAL PRICE: {totalPrice}$</span>
           </div>
          </div>
        </section>
    </Container>
  )
}

export default CartPage