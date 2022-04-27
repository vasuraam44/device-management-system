import './UploadApk.css';
import React, { useState } from 'react';
import { Container, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';

import axios from "axios";

export function UploadApk() {

    // state={
    //     uploadedpercent:0
    // }

    const [files, setFiles] = useState([]);
    const [progress, setProgress] = useState();
    const [uploadedpercent, setUpdateProgres] = useState(0)

    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

    const uploadFileHandler = (event) => {
        //setFiles(event.target.files);

        event.preventDefault();

        // Get the actual file itself
        let file = event.target.files[0];
        //console.log(file)
        setFiles([...files, { file }]);


    };



    const fileSubmitHandler = (event) => {
        event.preventDefault();
        setFileUploadProgress(true);
        setFileUploadResponse(null);


        //console.log(files.length);
        const formData = new FormData();
        //console.log(files[0]);
        for (let i = 0; i < files.length; i++) {

            console.log(files[i].file);
            formData.append('files', files[i].file);
        }
        
        // const requestOptions = {
        //     onUploadProgress: (progressEvent) => {

        //         const {loaded,total}=progressEvent;
        //         let percent = Math.floor((loaded*100)/total);
        //         console.log(`${percent}`);
        //         setProgress(percent);
        //     },
        //     method: 'POST',
        //     body: formData,
            
        // };



        // fetch(FILE_UPLOAD_BASE_ENDPOINT + '/upload', requestOptions)
        //     .then(async response => {
        //         const isJson = response.headers.get('content-type')?.includes('application/json');
        //         const data = isJson && await response.json();

        //         // check for error response
        //         if (!response.ok) {
        //             // get error message
        //             const error = (data && data.message) || response.status;
        //             setFileUploadResponse(data.message);
        //             return Promise.reject(error);
        //         }

        //         console.log(data.message);
        //         setFileUploadResponse(data.message);
        //     })
        //     .catch(error => {
        //         console.error('Error while uploading file!', error);
        //     });
        // setFileUploadProgress(false);



        const options = {
            onUploadProgress: (progressEvent) => {
                const {loaded,total}=progressEvent;
                let percent = Math.floor((loaded*100)/total);
                //console.log(`${percent}`);
                console.log(`${loaded} in kb ${total} Size ${percent}%`);
                //setProgress(percent);

                if(percent<=100){
                        setUpdateProgres(percent);
                   
                }

            }
        }

        axios.post("http://192.168.1.180:8080/upload",formData,options)
        .then(response => {
            console.log(response);
                 //const isJson = response.headers.get('content-type')?.includes('application/json');
                 //const data = isJson && await response.json();
                    const data=response.data;
                // check for error response
                if (response.status!==200) {
                    // get error message
                    const error = (data && data.message) || response.status;
                    setFileUploadResponse(data.message);
                    return Promise.reject(error);
                }
                
                console.log(data.message);
                setFileUploadResponse(data.message);
                setFileUploadProgress(false);
                setUpdateProgres(0)
              

                // setTimeout(()=>{
                //     setUpdateProgres(0)
                // },50)
               
            }).catch(error => {
                console.error('Error while uploading file!', error);
            });

    };

    return (

        <>
            <Container fluid="md" className='uploadcntr'>
                <h2>Upload Apk</h2>
                <section className='uploadapk1'>

                    
                    <div className='uploadform'>

                        <form onSubmit={fileSubmitHandler}>

                            <div className='fileblock'>
                                <label>Choose ExcellFile </label>
                                <input type="file" id={0} onChange={uploadFileHandler} accept=".xlsx" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose APkFile</label>
                                <input type="file" id={1} onChange={uploadFileHandler} accept=".apk" required />
                                <br></br>
                            </div>
                            {uploadedpercent>0 && <ProgressBar now={uploadedpercent}  label={`${uploadedpercent}%`} />}
                            <br></br>
                            <button type='submit' className='btn btn-secondary'>Upload</button>

                            {/* {uploadedpercent>0 && <p style={{ color: 'blue' }}>Uploading Files</p>} */}
                            {fileUploadResponse != null && <p style={{ color: 'green' }}>{fileUploadResponse}</p>}
                        </form>
                    </div>

                    <div className='nxtbtn'><Link className="nav-link" to="/deviceview">Next</Link></div>
                </section>
                {/* <div><Link className="nav-link"  to="/deviceview">Next</Link></div> */}
            </Container>

        </>

    )
}

