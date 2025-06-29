import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const [openAddress,setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectedAddress,setSelectedAddress] = useState(0)

  console.log(addressList[selectedAddress])

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-4 justify-between">
        <div className="w-full">
          <h1 className="font-bold text-lg">Choose Your Addresses</h1>
          
          <div className="bg-white p-2 grid gap-4">
            {
              addressList.map((address,index)=>{
                return (
                  <label htmlFor={"address"+index}>
                  <div className="rounded border p-3 flex gap-2 hover:bg-green-50">
                    <div>
                      <input id={"address"+index} type="radio" value={index} onChange={(e)=>setSelectedAddress(e.target.value)} name="address" />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.country} - {address.pincode}</p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                  </label>
                )
              })
            }
            <div onClick={()=>setOpenAddress(true)} className="h-16 bg-blue-50 border-dotted border-2 flex justify-center items-center">
            Add Address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white p-4">
          <h3 className="font-bold text-lg">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Total Quantity</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded ">Online Payment </button>
            <button className="py-2 px-4 border border-green-600 hover:bg-green-600 hover:text-white text-green-600 font-semibold rounded ">Cash On Delivery </button>
          </div>
        </div>
      </div>

      {
        openAddress && (
          <AddAddress close={()=>setOpenAddress(false)}/>
        )
      }
    </section>
  );
};

export default CheckoutPage;
