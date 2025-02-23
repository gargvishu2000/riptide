import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const RelatedProducts = ({category, subCategory}) => {
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory])

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={"PRODUCTS"}/>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {related.map((item, index) => (
                        <Link 
                            to={`/product/${item._id}`}
                            key={index}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <div className="cursor-pointer">
                                <img 
                                    src={item.image[0]} 
                                    alt={item.name} 
                                    className="w-full h-64 object-cover"
                                />
                                <h3 className="mt-2 font-medium">{item.name}</h3>
                                <p className="text-gray-600">₹ {item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProducts