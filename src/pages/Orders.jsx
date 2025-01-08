import React from 'react'
import { useContext } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {

  const { currency, products } = useContext(ShopContext)

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      {/* Orders Data */}
      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-cols md:flex-row   md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' />
                <div>
                  <p className='font-medium text-base'>{item.name} </p>
                  <div className='flex items-center mt-2 gap-3 text-base text-gray-700'>
                    <p className='text-lg '>{currency} {item.price}</p>
                    <p>Quantity: 1</p>
                    <p>size: M</p>
                  </div>
                  <p className='mt-4'>Date: <span className='text-gray-400'>25,July,2024</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-4'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm text-base'>Ready To Ship</p>
                </div>
                <button className='border px-4 py-4 text-sm font-medium rounded-sm '>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
