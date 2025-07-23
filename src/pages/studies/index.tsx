import React from 'react'
import FormSearch from '../../components/FormSearch'


export default function Component() {
    const handleAction = () => {
    console.log('Hàm từ App được gọi!');
  };
  return (
    <div>
        <FormSearch name='Patients' studyID='dddID' studyXyz='XYZ' handleAction ={handleAction}/>
    </div>
  )
}
