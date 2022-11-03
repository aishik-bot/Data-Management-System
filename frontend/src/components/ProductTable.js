import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/dataSlice';
import Table from 'react-bootstrap/Table';
import Products from './Products'
import Pagination from './Pagination';

export default function ProductTable() {
    const dispatch = useDispatch();
    const stateData = useSelector(state=>state);
    //console.log(stateData.data.count);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(50);
    
    const productData = stateData.data.data;

    const fetchDb = ()=>{
        //console.log("Interval")
        dispatch(fetchData())
    }

    const hours = 1;
    const interval = hours*60*60*1000;

    useEffect(()=>{
        dispatch(fetchData());
        const fetchInterval = setInterval(fetchDb,interval);

        return ()=>{
            clearInterval(fetchInterval);
        }
    },[])
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentData = productData.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(stateData.data.count / recordsPerPage)

    
  return (
    <div>
        {stateData.loading? <div>Loading...</div>: null}
        {!stateData.loading && stateData.error? <div>Error: {stateData.error}</div>: null}
        {!stateData.loading && stateData.data.count? (
            <>
                <div>{indexOfFirstRecord}-{indexOfLastRecord<stateData.data.count? indexOfLastRecord: stateData.data.count} of {stateData.data.count}</div>
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
                                <Products key={index} d={d} index={index}/>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div>
                    <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}/>
                </div>
            </>
        ):null}
    </div>
  )
}
