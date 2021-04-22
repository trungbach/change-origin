import './custom.css';
import './Apps.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Men from './pages/Men';
import Home from './pages/Home';
import Women from './pages/Women';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import SearchResult from './pages/SearchResult';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ButtonScroll from './components/Button/ButtonScroll';

function App() {

 

  return (
    
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact ><Home /></Route>
          <Route path='/products' exact ><Products /></Route>
          <Route path='/products/men' exact><Men /></Route>
          <Route path='/products/women' exact><Women /></Route>
          <Route path='/cart' exact><Cart /></Route>
          <Route path='/checkout' exact><Checkout /></Route>
          <Route path='/products/:slug' exact 
                render={({match}) => <SingleProduct match={match} />}></Route>
          <Route path='/search' exact><SearchResult /></Route>
        </Switch>
        <Footer />   
        <ButtonScroll />             
      </div>
    </Router>
    
  );
}

export default App;
