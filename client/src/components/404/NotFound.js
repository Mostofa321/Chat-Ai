import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='relative'>
            <img className='w-full h-screen' src="https://i.ibb.co/8BSX5sn/error-404.png" alt="error 404"/>
            <Link to='/'><button className=' btn btn-active btn-ghost px-5 fixed bottom-[10%] left-[35%] lg:left-[45%] lg:w-[15%]'>Go To Home</button></Link>
        </div>
    );
};

export default NotFound;