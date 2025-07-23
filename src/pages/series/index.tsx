import React from 'react'
import FormSearch from '../../components/FormSearch'
import TableData from '../../components/TableData';

export default function Component() {
  const handleAction = () => {
    console.log('Hàm từ App được gọi!');
  };
  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <FormSearch name='series' studyID='dddID' studyXyz='XYZ' handleAction ={handleAction}/>
        <TableData />
    </div>
  )
}