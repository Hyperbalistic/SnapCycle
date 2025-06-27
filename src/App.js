import react, { Component } from 'react';
import './App.css';
import Navbar from "./Navbar";
import PastItems from './Pages/Past Items';
import HowToUse from './Pages/How It Works';
import ContactUs from './Pages/Contact Us';
import Home from './Pages/Home';
import About from './Pages/About';
function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/about":
      component = <About />
      break
    case "/howitworks":
      component = <HowToUse />
      break
    case "/pastitems":
      component = <PastItems />
      break
    case "/contactus":
      component = <ContactUs />
      break
  }
  return (
    <>
      <Navbar />
      {component}
    </>
  )
}

export default App;