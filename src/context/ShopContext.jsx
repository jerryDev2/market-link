import {createContext, useContext} from "react";
import {products} from "../assets/frontend_asset/asset.js";


export const ShopContext  = createContext();

const ShopContextProvider = ({children}) => {
    const currency = '$';


    const value = {
        products, currency
    }

    return <ShopContext.Provider value={value}>

        {children}
    </ShopContext.Provider>
}

export default ShopContextProvider;