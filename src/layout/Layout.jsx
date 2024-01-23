import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';


const Layout = () => {
    return (
        <div className='bg-gray-100'>
            <div className=' text-gray-600 rounded-lg '>
                <Header></Header>
            </div>

            <div>
                <Outlet></Outlet>
            </div>


        </div>
    );
};

export default Layout;