import './UploadApk.css';
import React, { useState,useRef } from 'react';
import { Container, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';

import axios from "axios";

export function UploadApk() {

    // state={
    //     uploadedpercent:0
    // }

    const inputEl = useRef('')
    const [files, setFiles] = useState([]);
    const [version, setVersion] = useState('');
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

    const versionHandler = (event) => {
       setVersion(event.target.value)
    }

    const resetHandler=()=>{
        setFiles([]);
        setVersion('');
        setUpdateProgres(0);
        inputEl.current.value = '';
        setFileUploadResponse('');

    }


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
        formData.append('version',version);

        
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
                
                resetHandler();
               
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
                                <input type="file" id={0} ref={inputEl} onChange={uploadFileHandler} accept=".xlsx" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose APkFile</label>
                                <input type="file" id={1} ref={inputEl} onChange={uploadFileHandler} accept=".apk" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose EVT File</label>
                                <input type="file" id={2} ref={inputEl} onChange={uploadFileHandler} accept=".evt, .evtp, .evtps " required />
                                <br></br>
                                <br></br>
                                
                                <input type="text" id={2} className="form-control" onChange={versionHandler} placeholder='Enter Version' required />
                               
                            </div>
                           
                            {uploadedpercent>0 && <ProgressBar now={uploadedpercent}  label={`${uploadedpercent}%`} />}
                            <br></br>
                            <button type='submit' className='btn btn-secondary'>Upload</button>
                            <button type='reset' className='btn btn-secondary resetbtn' onClick={resetHandler}>Reset</button>

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

