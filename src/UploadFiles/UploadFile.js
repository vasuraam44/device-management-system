
import './UploadFile.css';
import React, { useState, useRef } from 'react';
import { Container, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';

import axios from "axios";

export function UploadFile() {

    const inputEl = useRef();

    const [excelfile, setExcelfile] = useState();
    const [apkfile, setApkfile] = useState();
    const [evtfile, setEvtfile] = useState();
    const [evtpfile, setEvtpfile] = useState();
    const [evtpsfile, setEvtpsfile] = useState();

    const [progress, setProgress] = useState();
    const [uploadedpercent, setUpdateProgres] = useState(0);

    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);

    const [version, setVersion] = useState('');

    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";
    
    const versionHandler = (event) => {
        setVersion(event.target.value);
    }

    const ExcelFileHandler = (event) => {
        event.preventDefault();
        setExcelfile(event.target.files[0]);

    }

    const ApkFileHandler = (event) => {
        event.preventDefault();
        setApkfile(event.target.files[0]);
    }
    const EvtFileHandler = (event) => {
        event.preventDefault();
        setEvtfile(event.target.files[0]);

    }

    const EvtpFileHandler = (event) => {
        event.preventDefault();
        setEvtpfile(event.target.files[0]);

    }
    const EvtpsFileHandler = (event) => {
        event.preventDefault();
        setEvtpsfile(event.target.files[0]);

    }

    const resetHandler = () => {
        setExcelfile();
        setApkfile();
        setEvtfile();
        setEvtpfile();
        setEvtpsfile();
        setVersion('');
        setUpdateProgres(0);
        inputEl.current.value = '';
        setFileUploadResponse('');

    }


    const fileSubmitHandler = (event) => {
        event.preventDefault();

        console.log(excelfile);
        console.log(apkfile);
        console.log(evtfile);
        console.log(evtpfile);
        console.log(evtpsfile);
        console.log("VERSION:" + version)

        const formData = new FormData();
        formData.append('version', version);
        formData.append('excelfile', excelfile);
        formData.append('apkfile', apkfile);
        formData.append('evtfile', evtfile);
        formData.append('evtpfile', evtpfile);
        formData.append('evtpsfile', evtpsfile);


        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                //console.log(`${percent}`);
                console.log(`${loaded} in kb ${total} Size ${percent}%`);
                //setProgress(percent);

                if (percent <= 100) {
                    setUpdateProgres(percent);

                }
            }
        }

        axios.post("http://localhost:8080/files/upload", formData, options)
            .then(response => {
                console.log(response);
                
                const data = response.data;
                // check for error response
                if (response.status !== 200) {
                    // get error message
                    console.log(response);
                    const error = (data && data.message) || response.status;
                    setFileUploadResponse(data.message);
                    return Promise.reject(error);
                }

                console.log(data.message);
                setFileUploadResponse(data.message);
                //setFileUploadProgress(false);
                //setUpdateProgres(0);

                 setTimeout(()=>{
                     setUpdateProgres(0);
                     resetHandler();
                 },1000)

                 document.getElementById("0").value = "";
                 document.getElementById("1").value = "";
                 document.getElementById("2").value = "";
                 document.getElementById("3").value = "";
                 document.getElementById("4").value = "";

                resetHandler();

            }).catch(error => {
                console.error('Error while uploading file!', error);
            });




    }


    return (
        <>
            <Container fluid="md" className='uploadcntr'>
                <h2>Upload Apk</h2>
                <section className='uploadapk1'>


                    <div className='uploadform'>

                        <form onSubmit={fileSubmitHandler}>
                            <div className='fileblock'>
                                <label>Choose ExcellFile </label>
                                <input type="file" id={0} ref={inputEl} onChange={ExcelFileHandler} accept=".xlsx" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose APkFile</label>
                                <input type="file" id={1} ref={inputEl} onChange={ApkFileHandler} accept=".apk" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose EVT File</label>
                                <input type="file" id={2} ref={inputEl} onChange={EvtFileHandler} accept=".evt" required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Choose EVTP File</label>
                                <input type="file" id={3} ref={inputEl} onChange={EvtpFileHandler} accept=".evtp" required />
                                <br></br>
                            </div>

                            <div className='fileblock'>
                                <label>Choose EVTPS File</label>
                                <input type="file" id={4} ref={inputEl} onChange={EvtpsFileHandler} accept=".evtps" required />
                                <br></br>

                                <br></br>

                                <input type="text" id={5} className="form-control" onChange={versionHandler} placeholder='Enter Version' required />

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
