import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';
import axios from 'axios';

export default function Products({d, index}) {
    const [editable, setEditable] = useState(false);
    const [prodPrice, setProdPrice] = useState(d.product_price);
    const [sellPrice, setSellPrice] = useState(d.sell_price);
    const [stockQty, setStockQty] = useState(d.stock_quantity);
    const dispatch = useDispatch();

    const changeEditable = ()=>{
        setEditable(!editable);
        console.log(editable)
    }
    const onSave = async (id)=>{
        await axios.put(`http://localhost:8000/api/v1/data/${id}`, {productPrice: prodPrice, sellPrice, stockQuantity: stockQty})
        
        alert(`Product-${id} updated`);
        dispatch(fetchData());
    }
    const onDelete = async (id)=>{
        await axios.delete(`http://localhost:8000/api/v1/data/${id}`);
        alert(`product-${id} deleted!`);
        dispatch(fetchData());
    }
  return (
    <>
        <tr key={d.product_id} style={{backgroundColor: d.updated?'#342975': 'grey', color: d.updated?'white': 'black'}}>
            <td>{index+1}</td>
            <td>{d.product_id}</td>
            <td>{d.listing_time}</td>
            <td>{d.product_sku}</td>
            <td>{editable?<input type="number" 
            id="product-price" 
            value={prodPrice}
            onChange={(e)=>setProdPrice(e.target.value)}
            />
                :d.product_price
            }</td>
            <td>{editable?<input type="number"
             id="sell-price"
             value={sellPrice}
             onChange={(e)=>setSellPrice(e.target.value)}
             />
                :d.sell_price}</td>
            <td>{editable?<input type="number"
             id="stock-qty"
             value={stockQty}
             onChange={(e)=>setStockQty(e.target.value)}
            />
            :d.stock_quantity}</td>
            <td>
                {editable?(
                    <>
                        <button onClick={()=>onSave(d._id)}>Save</button>
                        <button onClick={changeEditable}>Cancel</button>
                    </>
                ):(
                    <>
                        <button onClick={changeEditable}>Edit</button>
                        <button onClick={()=>onDelete(d._id)}>Delete</button>
                    </>
                )}
            </td>
        </tr>
    </>
  )
}
