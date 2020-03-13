import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import RegisterProducts from './components/products/RegisterProducts';
import Profile from './components/authentication/Profile';
import SpecificProduct from './components/products/SpecificProduct';
import EditProduct from './components/products/EditProduct';
import ShopProduct from './components/products/ShopProduct';

export const routes = [
      { path: '/', name: 'home', component: Home },
      { path: '/contact', name: 'component', component: Contact },
      { path: '/product/register', name: 'registerProducts', component: RegisterProducts, meta: { requiresAuthenticate: true } },
      { path: '/product/edit/:id', name: 'editProduct', component: EditProduct, params: true, meta: { requiresAuthenticate: true } },
      { path: '/product/shop', name: 'shopProduct', component: ShopProduct},
      { path: '/product/:id', name: 'specificProduct', component: SpecificProduct, params: true},
      { path: '/login', name: 'login', component: Login, meta: { requiresGuest: true } },
      { path: '/register', name: 'register', component: Register, meta: { requiresGuest: true } },
      { path: '/profile', name: 'profile', component: Profile, meta: { requiresAuthenticate: true } },
];