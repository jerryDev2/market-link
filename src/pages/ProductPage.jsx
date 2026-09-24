import {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ShopContext} from "../context/ShopContext.jsx";

const ProductPage = () => {
    const {productId} = useParams()
    const {currency, products} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');

    const fetchProductData = async () => {

        products.map((item) => {
            if (item.id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
        })

    }

    useEffect(() => {
        fetchProductData()

    }, [productId])

    return (<div>

    </div>);
};

export default ProductPage;