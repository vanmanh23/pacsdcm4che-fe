import axios from "axios"

const url = 'http://localhost:8081/api/dicom'

export const GetPatients = async () => {
    const res = await axios.get(`${url}/patients`)
    .then(res => res.data)
    .catch(err => console.log(err));
    return res;
}
export const GetStudiesByStudyInstanceUID = async (studyInstanceUID: string) => {
    const res = await axios.get(`${url}/studies/${studyInstanceUID}/tags`)
    .then(res => res.data)
    .catch(err => console.log(err));
    return res;
}