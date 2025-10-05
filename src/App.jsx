import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useDispatch } from "react-redux"
import { getCategories } from "./features/categories"
import { useEffect } from "react"
import { getProducts } from "./features/products"
import ProductPage from "./components/ProductPage/ProductPage"
import UserForm from "./components/UserForm/UserForm"
import CategoryPage from "./pages/CategoryPage/CategoryPage"
import CartPage from "./pages/CartPage/CartPage"
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  return (
    <>
      <Header />
      <UserForm />
      <Routes>
        <Route path="/" element = {<Home />}/>
        <Route path="/products/:id" element = {<ProductPage />}/>
        <Route path="/category/:id" element = {<CategoryPage />}/>
        <Route path="/cart" element = {<CartPage />}/>
      </Routes>
      <Footer />
    </>
    
    
  )
}

export default App
