
// import Home from '../screens/Home';
import './App.css';

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  RoutesRouter,
  Route,

  Routes
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login.js';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from './screens/Signup.js';
import { CartProvider } from './components/contexReducer.js';
import Cart from './screens/Cart.js';
import MyOrders from './screens/MyOrders.js';
import Pagenot from './components/Pagenot.js';
import PriveteRoute from './components/PrivetRoute.js';
function App() {
  // const isLogin = localStorage.setItem("loggedIn")
  return (
    <CartProvider>


      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<PriveteRoute element={MyOrders} />} /> {/* Protected Route */}
            <Route path="*" element={<Pagenot />} /> {/* This should be the last route */}



          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
