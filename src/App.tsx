import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { User } from './types';
import Home from './pages/Home/Home';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products/Products';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart';
import loadPageTheme from './utils/loadPageTheme';
import 'bootstrap/dist/css/bootstrap.min.css';

loadPageTheme();

function App() {
  const [user, setUser] = useState<User | null>({
    username: 'Username123',
    isAdmin: true,
  });

  return (
    <>
      <Header
        user={user}
        logout={() => {
          setUser(null);
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products />} />
        <Route path="/produtos/:slug" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
