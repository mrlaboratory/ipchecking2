import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='bg-gray-100'>
      <div>
      <Navbar></Navbar>
        {/* this is header section  */}

      </div>
      <div className='bg-gray-100'>
        <div className='container mx-auto'>

        </div>
        <div>
          {/* this is outlet section for conditional page components  */}
          <Outlet></Outlet>
        </div>

      </div>
      {/* this is footer section  */}
   
      <Toaster />
    </div>
  );
};

export default App;