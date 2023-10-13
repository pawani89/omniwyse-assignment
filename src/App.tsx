import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/home';
import Report from './components/report'
import Favourites from './components/favourites';

function App() {

  return (
    <Router>
      <Link to="/home">Home</Link>
      <Link to="/favourites">Favourites</Link>
      <Routes>
        <Route path='/'></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/favourites' element={<Favourites></Favourites>}></Route>
        <Route path='/:id' element={<Report></Report>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
