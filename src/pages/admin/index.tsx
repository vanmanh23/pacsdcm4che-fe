import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { setOption } from '../../features/navbarsection/navbarSection';

export default function Component() {
  const dispatch = useDispatch<AppDispatch>();
dispatch(setOption("option1"));
const layDuLieu = useSelector((state: RootState) => state.option.valueOption);
console.log("layDuLieu==========: ",layDuLieu);
  return (
    <div>dashboard page</div>
  )
}
