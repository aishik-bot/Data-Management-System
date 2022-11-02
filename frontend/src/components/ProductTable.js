import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';
import Table from 'react-bootstrap/Table'
import axios from 'axios';

export default function ProductTable() {
    const dispatch = useDispatch();
    const stateData = useSelector(state=>state);
    console.log(stateData.data.count);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);

    const productData = stateData.data.data;

    useEffect(()=>{
        dispatch(fetchData());
    },[])

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentData = productData.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(stateData.data.count / recordsPerPage)

    const onDelete = async (id)=>{
        await axios.delete(`http://localhost:8000/api/v1/data/${id}`);
        alert(`product-${id} deleted!`);
        dispatch(fetchData());
    }
  return (
    <div>
        {stateData.loading? <div>Loading...</div>: null}
        {!stateData.loading && stateData.error? <div>Error: {stateData.error}</div>: null}
        {!stateData.loading && stateData.data.count? (
            <div>
                <Table responsive="md">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Id</th>
                            <th>Listing Time</th>
                            <th>Product SKU</th>
                            <th>Product Price</th>
                            <th>Sell Price</th>
                            <th>Stock Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((d, index)=>(
                            <tr key={d.product_id} style={{backgroundColor: d.updated?'#342975': 'grey', color: d.updated?'white': 'black'}}>
                                <td>{index+1}</td>
                                <td>{d.product_id}</td>
                                <td>{d.listing_time}</td>
                                <td>{d.product_sku}</td>
                                <td>{d.product_price}</td>
                                <td>{d.sell_price}</td>
                                <td>{d.stock_quantity}</td>
                                <td>
                                    <button>Edit</button>
                                    <button onClick={()=>onDelete(d._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        ):null}
    </div>
  )
}
