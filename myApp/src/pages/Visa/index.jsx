import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchDocument } from '../../redux/visaOpt';
import axios from 'axios';
import { getJwtToken } from '../../utils/jwtTokenUtils';

import { Viewer } from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



export default function Visa() {
    const [file, setFile] = useState('');
    const{
        optDocument: {data, status}
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDocument(getJwtToken()));
    }, [dispatch]);

    useEffect(() => {
        const document = data && data['receipt.link'];
        if (document && document['data']) {
            setFile(() => {
                console.log(document['data']['data']);
                return document['data']['data']});  
        }
    }, [data])

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
                <button type="submit">upload</button>
            </div>
        </form>
        <br/>
        <div className="viewer">

        {/* render this if we have a pdf file */}
        {file&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer fileUrl={file}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!file&&<>No file is selected yet</>}

      </div>
        </>
    )
}