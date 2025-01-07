import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const {productId} = useParams();
  const {products ,currency, addToCart} =useContext(ShopContext)
  const [productData,setProductData] = useState(null);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = async()=> {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product); // Store the product object
      setImage(product.image[0]);
      console.log(product);
    }
  }

  useEffect(()=>{
    fetchProductData();
  },[products])

  if (!productData) {
    return <div className='opacity-0'></div>; // Loading or no data found
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 flex-col sm:flex-row '>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
          {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={()=> setImage(item)}
                className='sm:m-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* Product details */}
        <div className='flex-1 '>
          <h1 className='font-medium text-2xl mt-3'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-3'>(122)</p>
          </div>
          <p className='mt-3 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-3 text-gray-400 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=> (
                  <button
                  onClick={()=> setSize(item)}
                  key={index} className={`border py-3 px-4 bg-gray-200 ${item==size? 'border-orange-500': ''}`}
                  >{item}
                  </button>
              ))
              }
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white text-xl px-10 py-4 text-sm active:bg-gray-700'>Add To Cart</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>COD available</p>
            <p>Easy return & exchange policy in 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review section */}
      <div className='mt-3'>
        <div className='flex '>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, non?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa animi possimus necessitatibus, veniam laudantium quidem inventore delectus earum distinctio? Velit?</p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  )
}

export default Product
