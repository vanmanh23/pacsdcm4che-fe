import React from 'react'
import FormSearch from '../../components/FormSearch'
import TableData from '../../components/TableData';

export default function Component() {
  const handleAction = () => {
    console.log('Hàm từ App được gọi!');
  };
  return (
    <div>
        <FormSearch name='Patients' studyID='' studyXyz='' handleAction ={handleAction}/>
        <TableData />
    </div>
  )
}