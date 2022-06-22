import './DeviceView.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

//import { useParams } from "react-router-dom";

export function DeviceView() {


    const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8080";

    const [eventDetails, setEventDetails] = useState([])
//let { id } = useParams();
    function getEvents() {
        axios.get(FILE_UPLOAD_BASE_ENDPOINT+"/apkdetails")
            .then(response => response.data)
            .then((data) => {
                setEventDetails(data)
            });
    }
    useEffect(() => {
        getEvents();
    }, [])

    //console.log(id);
    //console.log(eventDetails);

    return (
        <>
            <section>

                <Container>
                    <h1>Device details</h1>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr align="center">
                                <th>Device SNo</th>
                                <th>Current Version</th>
                                <th>Downloaded Version</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventDetails.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">No Details available</td>
                                </tr> :

                                eventDetails.map(
                                    apkDetail =>
                                        <tr key={apkDetail.id}>
                                            <td> {apkDetail.device.deviceNo}</td>
                                            <td> {apkDetail.current_version}</td>
                                            <td> {apkDetail.downloaded_version}</td>

                                            {
                                                (() => {
                                                    const successStyle = {
                                                        color: "green",
                                                        padding: "10px",
                                                        fontWeight: "bold",
                                                        fontFamily: "Sans-Serif"
                                                    }
                                                    const failedStyle={
                                                        color: "red",
                                                        padding: "10px",
                                                        fontWeight: "bold",
                                                        fontFamily: "Sans-Serif"

                                                    }

                                                    const pendingStyle={
                                                        color: "blue",
                                                        padding: "10px",
                                                        fontWeight: "bold",
                                                        fontFamily: "Sans-Serif"
                                                    }
                                                    if (apkDetail.status === 'success') {
                                                        return (
                                                            <td style={successStyle}>{apkDetail.status}</td>
                                                        )
                                                    } else if (apkDetail.status === "Failed") {
                                                        return (
                                                            <td style={failedStyle}>{apkDetail.status}</td>
                                                        )
                                                    } else if(apkDetail.status === "in progress"){
                                                        return (
                                                            <td style={pendingStyle}>{apkDetail.status}</td>
                                                        )
                                                    }else {
                                                        return (
                                                            <td >{apkDetail.status}</td>
                                                        )
                                                    }
                                                })()
                                            }
                                        </tr>
                                )

                            }
                        </tbody>
                    </Table>
                </Container>

            </section>
        </>

    );

}