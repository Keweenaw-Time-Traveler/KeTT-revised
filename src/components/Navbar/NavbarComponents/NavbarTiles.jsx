import React, { useContext } from 'react';
import { Tiles } from '../index';
import { useSelector } from 'react-redux';
import NavbarData from '../../../assets/data/Navbar/Tiles.json';

const NavbarTiles = ({ view }) => {
    const { tiles } = useContext(Tiles);
    return (
        <div className={`flex space-between md:mx-auto md:inline-block ${tiles ? 'hidden' : 'inline-block'}`}>
            <div className={`flex flex-wrap justify-center pl-4 mx-auto text-base lg:mr-auto lg:ml-4`}>
                {NavbarData.Tiles.map((item) => (
                    <button
                        className="p-1 px-4 mr-5 font-medium text-black bg-white border-gray-300 rounded-full shadow-lg cursor-pointer btn hover:text-gray-900"
                        key={item.id}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default NavbarTiles
