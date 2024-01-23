import React from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Toaster } from 'react-hot-toast';
const Dashboard2 = () => {
    return (
        <div className='bg-gray-100'>
            <div>

                {/* this is header section  */}
                <Navbar></Navbar>
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

export default Dashboard2;