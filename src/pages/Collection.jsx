import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Collection = () => {
  const {products,search,showSearch} = useContext(ShopContext);

  const [showFilter,setShowFilter]=useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  // Adding logic to filter
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType] = useState('relavent');

  const toggleCateogory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=> item!=e.target.value))
    }else{
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCateogory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item=> item!=e.target.value))
    }else{
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

 const applyFilter= ()=>{
  // Creats copy of products array into productsCopy array
  let productsCopy = products.slice();
  if(showSearch && search){
     productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  }
  

  if(category.length>0){
    productsCopy = productsCopy.filter((item)=> category.includes(item.category));
  }
  if(subCategory.length>0){
    productsCopy = productsCopy.filter((item)=> subCategory.includes(item.subCategory))
  }
  setFilterProducts(productsCopy);
 }

 const sortProduct = ()=>{
  let fpCopy = filterProducts.slice();
  switch(sortType){
    case 'low-high':
      setFilterProducts(fpCopy.sort((a,b)=> (a.price-b.price)))
      break;

      case 'high-low': 
      setFilterProducts(fpCopy.sort((a,b)=> (b.price-a.price)))
      break;

      default:
        applyFilter();
        break;
  }
 }

 useEffect(()=>{
  applyFilter();
 },[category,subCategory,search,showSearch,products])

 useEffect(()=>{
  sortProduct();
 },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter? 'rotate-90': ''}`} alt="" />
        </p>
        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-xl font-medium'>Category</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCateogory}/>Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCateogory}/>WOMEN
            </p>
          </div>
        </div>
        {/* sub categoryfilter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '': 'hidden'} sm:block`}>
          <p className='mb-3 text-xl font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCateogory}/>TopWear 
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCateogory}/>Bottomwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1 '>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          {/* Product Sort */}
          <select onChange={(e)=> setSortType(e.target.value)} className='border-2 border-gray-400 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
         {/* Map Products */}
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            ))
          }
         </div>
      </div>


    </div>
  )
}

export default Collection
