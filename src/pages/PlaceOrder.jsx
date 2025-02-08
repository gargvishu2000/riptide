import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = async (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    // Don't let the page re-load
    e.preventDefault();
    try {
      let orderItem = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        // Api calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.success) {
            setCartItem({});
            navigate('/orders')
          } else {
            toast.error(response.data.message);
          }
          break;
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'Delivery'} text2={'Information'} />
        </div>
        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3' >
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zip Code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-5'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>
        <div className='flex items-center border p-2 px-3 cursor-pointer'>
          <div onClick={() => setMethod('stripe')} className='flex gap-4 flex-col lg:flex-row'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
          </div>
          <div onClick={() => setMethod('razorpay')} className='flex items-center border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
            <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
          </div>
          <div onClick={() => setMethod('cod')} className='flex items-center border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>Cash On Delivery</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white text-sm my-8 px-8 py-3'>Place Order</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
