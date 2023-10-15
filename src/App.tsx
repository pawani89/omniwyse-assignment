import './App.css';
import { Route, Routes, NavLink, useNavigate } from "react-router-dom";
import Home from './components/home';
import Report from './components/report'
import Favourites from './components/favourites';
import {
  AppBar,
  AppBarSection,
  Menu,
  MenuItem,
  MenuSelectEvent,
} from "@progress/kendo-react-layout";
import { useEffect, useState } from 'react';
import { Label } from '@progress/kendo-react-labels';

function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const navigate = useNavigate();
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const onSelect = (event: MenuSelectEvent) => {
    navigate(event?.item?.data?.route)
  }
  return (
    <>
      {width < breakpoint ? (
        <><Menu onSelect={(e) => onSelect(e)}>
          <MenuItem text="Menu">
            <MenuItem text="Home" data={{ route: '/home' }} />
            <MenuItem text="Favourites" data={{ route: '/favourites' }} />
          </MenuItem>
        </Menu>
          <Label>Food Site!!</Label>
        </>) : (<><AppBar>
          <AppBarSection>
            <NavLink to="/home">Home</NavLink>
          </AppBarSection>
          <AppBarSection>
            <NavLink to="/favourites">Favourites</NavLink>
          </AppBarSection>
        </AppBar>
          <Label>Food Site!!</Label>
        </>

      )}


      <Routes>
        <Route path='/'></Route>
        <Route index path='/home' element={<Home></Home>}></Route>
        <Route path='/favourites' element={<Favourites></Favourites>}></Route>
        <Route path='/:id' element={<Report></Report>}></Route>
      </Routes>
    </>
  );
}

export default App;
