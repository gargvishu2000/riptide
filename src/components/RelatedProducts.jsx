import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]);

    return (
        <div className="my-16 px-4 sm:px-8">
            <div className="flex items-center text-center text-2xl sm:text-3xl py-4">
                <Title text1="RELATED" text2="PRODUCTS" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {related.map((item, index) => (
                    <Link
                        to={`/product/${item.productId}`}
                        key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setTimeout(() => { window.location.href = `/product/${item.productId}`; }, 100);
                        }}
                        className="block"
                    >
                        <div className="cursor-pointer text-center">
                            <img
                                src={item.image[0]}
                                alt={item.name}
                                className=" object-cover"
                            />
                            <h3 className="mt-2 font-medium text-sm sm:text-base">{item.name}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">₹ {item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
