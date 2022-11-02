import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { fetchData } from '../store/dataSlice';

export default function Table() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchData());
    },[])
  return (
    <div>
      Hello
    </div>
  )
}
