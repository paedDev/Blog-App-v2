import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div className='flex justify-between items-center p-10 shadow-xl mb-5 bg-gradient-to-r from-sky-300 via-sky-300/80 to-red-300 text-white font-bold w-[90%] mx-auto'>
            <Link to={"/"}>
                <h3 className='text-2xl tracking-widest italic'>Blog App</h3>
            </Link>

            <div >
                <ul className='flex space-x-6'>
                    <Link to={"/"}>
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to={"/add-blog"}>
                        <li>
                            Add Blog
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Header;