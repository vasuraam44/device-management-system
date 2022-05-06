
import './Availablefile.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

export function Availablefile() {

    const [fileDetails, setFileDetails] = useState([]);
    //const [i, setI] = useState(0);
    
    function getEvents() {
        axios.get("http://localhost:8080/getAvailable/allFiles")
            .then(response => response.data)
            .then((data) => {
                setFileDetails(data)
            });
    }
    useEffect(() => {
        getEvents();
    }, [])
    

    return (
        <>
            <section>

                <Container>
                    <h1>File Availble details</h1>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr align="center">
                                <th>File Type</th>
                                <th>Version</th>
                                <th>Size</th>
                                <th>Status</th>
                                <th>Link</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {fileDetails.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Details available</td>
                                </tr> :

                                fileDetails.map((fileDetail,i) =>
                                        <tr key={i}>
                                            <td> {fileDetail.file_type}</td>
                                            <td> {fileDetail.newVersion}</td>
                                            <td> {fileDetail.file_size}</td>
                                            <td> {fileDetail.file_status}</td>
                                            <td> <a href={fileDetail.file_link} >{fileDetail.file_link}</a></td>
                                            
                                        </tr>
                                )

                            }
                        </tbody>
                    </Table>
                </Container>

            </section>




        </>
    )
}