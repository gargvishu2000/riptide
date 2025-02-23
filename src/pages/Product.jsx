import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {products} from '../assets/assets.js'
import {assets} from '../assets/assets.js';
import ScrollToTop from '../ScrollToTop.jsx';
import { Link } from 'react-router-dom';

const Product = () => {
  const {productId} = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }

  useEffect(() => {
    fetchProductData();
    console.log(products);
    
  }, []);

  if (!productData) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setImage(item)}
                className={`sm:m-full sm:mb-3 flex-shrink-0 cursor-pointer w-20 h-20 object-cover 
                  ${image === item ? 'border-2 border-orange-500' : ''}`}
                alt={`${productData.name} view ${index + 1}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto object-cover' alt={productData.name} />
          </div>
        </div>

        {/* Product details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-3'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-3'>(122)</p>
          </div>
          <p className='mt-3 text-3xl font-medium'>&#8377;  {productData.price}</p>
          <p className='mt-3 text-gray-400 md:w-4/5'>{productData.description}</p>
          
          <div className='flex flex-col gap-4 my-8'>
            <p>Available Sizes</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <span key={index} className='border py-3 px-4 bg-gray-200'>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>COD available</p>
            <p>Easy return & exchange policy in 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review section */}
      <div className='mt-3'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, non?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa animi possimus necessitatibus, veniam laudantium quidem inventore delectus earum distinctio? Velit?</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-medium mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products
            .filter(item => 
              item.category === productData.category && 
              item._id !== productData._id
            )
            .slice(0, 4)
            .map(item => (
              <Link 
                to={`/product/${item._id}`} 
                key={item._id} 
                onClick={() => {
                  window.scrollTo(0, 0);
                  fetchProductData();
                }}
              >
                <div className="cursor-pointer">
                  <img src={item.image[0]} alt={item.name} className="w-full h-64 object-cover"/>
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

export default Product;