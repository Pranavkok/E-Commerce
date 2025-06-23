import { createContext , useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../store/cartProduct";
import { useDispatch } from "react-redux";

export const GlobalContext = createContext(null)

export const useGlobalContext = ()=>useContext(GlobalContext)

const GlobalProvider = ({children})=>{
    const dispatch = useDispatch()

    const fetchCartItem = async()=>{
        try {
          const response = await Axios({
            ...SummaryApi.getCartItem
          })
          const { data : responseData } = response
    
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
    
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(()=>{
        fetchCartItem()
    },[])

    return (
        <GlobalContext.Provider value={
            fetchCartItem
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider