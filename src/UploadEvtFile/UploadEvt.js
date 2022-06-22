import './UploadEvt.css';
import React, { useState, useRef } from 'react';
import { Container, ProgressBar } from "react-bootstrap";
import { Link } from 'react-router-dom';

import axios from "axios";

export function UploadEvt() {

    const inputEl = useRef('')
    const [evtfile, setEvtfile] = useState();
    const [excelfile, setExcelfile] = useState();
    const [version, setVersion] = useState('');
    const [note, setNote] = useState('');

    const [progress, setProgress] = useState();
    const [uploadedpercent, setUpdateProgres] = useState(0)

    // for file upload progress message
    const [fileUploadProgress, setFileUploadProgress] = useState(false);
    //for displaying response message
    const [fileUploadResponse, setFileUploadResponse] = useState(null);
    //base end point url
    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

    const uploadExcelFileHandler = (event) => {
        event.preventDefault();
        setExcelfile(event.target.files[0]);
    };
    const uploadEvtFileHandler = (event) => {
        event.preventDefault();
        setEvtfile(event.target.files[0]);
    };

    const versionHandler = (event) => {
        setVersion(event.target.value)
    }

    const noteHandler = (event) => {
        setNote(event.target.value)
    }


    const resetHandler = () => {
        setExcelfile();
        setEvtfile();
        setVersion('');
        setNote('');
        setUpdateProgres(0);
        inputEl.current.value = '';
        setFileUploadResponse('');

    }


    const fileSubmitHandler = (event) => {
        event.preventDefault();
        setFileUploadProgress(true);
        setFileUploadResponse(null);

        const formData = new FormData();
        formData.append('evtfile', evtfile);
        formData.append('excelfile', excelfile);
        formData.append('version', version);
        formData.append('notemessage', note);

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

        axios.post(FILE_UPLOAD_BASE_ENDPOINT + "/file/uploadevt", formData, options)
            .then(response => {
                console.log(response);
                const data = response.data;
                // check for error response
                if (response.status !== 200) {
                    // get error message
                    const error = (data && data.message) || response.status;
                    setFileUploadResponse(data.message);
                    return Promise.reject(error);
                }

                console.log(data.message);

                setFileUploadResponse(data.message);
                setFileUploadProgress(false);
                setUpdateProgres(0);

                resetHandler();
            }).catch(error => {
                console.error('Error while uploading file!', error);
            });
    };

    return (

        <>
            <Container fluid="md" className='uploadcntr'>
                <h2>Upload EVT</h2>
                <section className='uploadapk1'>

                    <div className='uploadform'>
                        <form onSubmit={fileSubmitHandler}>
                            <div className='fileblock'>
                                <label>Choose ExcellFile </label>
                                <input type="file" id={0} ref={inputEl} onChange={uploadExcelFileHandler} accept=".xlsx" required />
                                <br></br>
                            </div>

                            <div className='fileblock'>
                                <label>Choose EVT File</label>
                                <input type="file" id={1} ref={inputEl} onChange={uploadEvtFileHandler} accept=".evt, .evtp, .evtps " required />
                                <br></br>
                            </div>
                            <div className='fileblock'>
                                <label>Enter Version</label>
                                <input type="text" id={2} className="form-control" onChange={versionHandler} placeholder='Enter Version' required />
                            </div>

                            <div className='fileblock'>
                                <label>Enter Release Note</label>
                                <input type="text" id={3} className="form-control" onChange={noteHandler} placeholder='Enter Release Note' required />
                            </div>

                            {uploadedpercent > 0 && <ProgressBar now={uploadedpercent} label={`${uploadedpercent}%`} />}
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

