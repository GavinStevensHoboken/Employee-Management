import {useState} from 'react';
import axios from 'axios';
import { getJwtToken } from '../../utils/jwtTokenUtils';

export default function Visa() {
    const [file, setFile] = useState('');
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('file', file);

        try{
            const token = getJwtToken();
            await axios.post('http://localhost:3001/api/uploadFile',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('File upload successfully');
        }catch(error){
            console.error('Error:', error.message)
        }
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="file" onChange={handleFileChange}></input>
                <button type="submit" value="submit"/>
            </div>
        </form>
        </>
    )
}