import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import About from "../components/About";
import Ipcheck from "../pages/Ipcheck";
import App from "../App";
import Iplist from "../components/Iplist";
import IpBlocked from "../shared/IpBlocked";
import Settings from "../components/Settings";
import Admin from "../pages/Admin";
const mainRoute = createBrowserRouter([
  {
    path: '/d',
    element: <App></App>,
    children : [
      {
        path: '/d/sss-admin',
        element: <Admin></Admin>,
    
      },
      {
        path: '/d/list',
        element: <Iplist></Iplist>,
    
      },
      {
        path: '/d/settings',
        element: <Settings></Settings>,
    
      },

    ]

  },

  {
    path: '/',
    element: <Home></Home>,

  },
  {
    path: '/about',
    element: <About></About>,

  },
  {
    path: '/ipcheck',
    element: <Ipcheck></Ipcheck>,

  },
  
  {
    path: '/ipblocked',
    element: <IpBlocked></IpBlocked>,

  },
  
  
  
 


])

export default mainRoute