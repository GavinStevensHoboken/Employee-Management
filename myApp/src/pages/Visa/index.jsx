import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchDocument } from '../../redux/visaOpt';
import axios from 'axios';
import { getJwtToken } from '../../utils/jwtTokenUtils';

import PdfViewer from './PdfViewer';

import '@react-pdf-viewer/core/lib/styles/index.css';

import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { fetchUserRole } from '../../utils/userIdUtils';
import { useNavigate } from 'react-router-dom';

export default function Visa() {
    const [file, setFile] = useState(''); // For uploading
    const [view, setView] = useState(''); // For preview
    const [title, setTitle] = useState('Visa');
    const [enableForm, setEnableForm] = useState(true);
    const [docType, setDocType] = useState(undefined);
    const [pdfError, setPdfError]=useState('');
    const navigate = useNavigate();
    // const visaType = {1:'receipt',2:'ead',3:'i983',4:'i20'};
    // const approalStatus = {0:'new',1:'approved',2:'submitted',3:'rejected'};

    const{
        data
    } = useSelector((state) => state.optDocument);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUserRole()
        .then(role => {
            if (role === "hr") {
                navigate('/employees')
            }
        })

        dispatch(fetchDocument(getJwtToken()));
    }, [dispatch]);

    useEffect(() => {
        if(data){
            if(data.status === 1) 
            {
                setTitle('All documents have been approved');
                setEnableForm(false);
            }else if(!data['receipt.status'] || data['receipt.status'] === 0){
                setTitle('Plase upload opt receipt');
                setDocType(1);
            }else if(data['receipt.status'] === 2){
                setTitle('Waiting for Approval');
                setEnableForm(false);
                setDocType(1);
                let document = data && data['receipt.link'];
                if (document && document['data']) {
                    setView(document['data']['data']); 
                }
            }
             else if(data['receipt.status'] === 3){
                setTitle('Plase modify your opt receipt');
                setDocType(1);
            }
            else if(!data['ead.status'] || data['ead.status'] === 0){
                setTitle('Plase upload opt ead');
                setDocType(2);
            }else if(data['ead.status'] === 2){
                setTitle('Waiting for Approval');
                setEnableForm(false);
                setDocType(2);
                let document = data && data['ead.link'];
                if (document && document['data']) {
                    setView(document['data']['data']); 
                }
            }else if(data['ead.status'] === 3){
                setTitle('Plase modify your ead');
                setDocType(2);
            }
            else if(!data['i983.status'] || data['i983.status'] === 0){
                setTitle('Plase upload i983');
                setDocType(3);
            }else if(data['i983.status'] === 2){
                setTitle('Waiting for Approval');
                setEnableForm(false);
                setDocType(3);
                let document = data && data['i983.link'];
                if (document && document['data']) {
                    setView(document['data']['data']); 
                }
            }else if(data['i983.status'] === 3){
                setTitle('Plase modify your i983');
                setDocType(3);
            }
            else if(!data['i20.status'] || data['i20.status'] === 0){
                setTitle('Plase upload i20');
                setDocType(4);
            }else if(data['i20.status'] === 2){
                setTitle('Waiting for Approval');
                setEnableForm(false);
                setDocType(4);
                let document = data && data['i20.link'];
                if (document && document['data']) {
                    setView(document['data']['data']); 
                }
            }else if(data['i20.status'] === 3){
                setTitle('Plase modify your i20');
                setDocType(4);
            }
            
        }
        
    }, [data])


    const allowedFiles = ['application/pdf'];
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile);
        if(selectedFile){
            if(selectedFile&&allowedFiles.includes(selectedFile.type)){
              let reader = new FileReader();
              reader.readAsDataURL(selectedFile);
              reader.onloadend=(e)=>{
                setPdfError('');
                setView(e.target.result);
              }
            }
            else{
              setPdfError('Not a valid pdf: Please select only PDF');
              setView('');
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!file) alert('Please choose a file!');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', docType);

        try{
            const token = getJwtToken();
            await axios.post('http://localhost:3001/api/uploadFile',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('File upload successfully');
            setTitle('Waiting for Approval');
            setEnableForm(false);
        }catch(error){
            console.error('Error:', error.message);
            alert('upload failed');
        }
    }

    return(
        <div style={{ marginTop: '64px' }}>
        <h1>{title}</h1>
        {enableForm && <form onSubmit={handleSubmit}>
            <div>
                <input type="file" onChange={handleFileChange}></input>
                <button type="submit">upload</button>
            </div>
            {pdfError&&<span className='text-danger'>{pdfError}</span>}
        </form>}
        <br/>
        <div className="viewer">

        {/* render this if we have a pdf file */}
        
        {view&&(
          <PdfViewer base64String={view}/>
        )}
        {!view&&<>No file is selected yet</>}

      </div>
        </ div>
    )
}