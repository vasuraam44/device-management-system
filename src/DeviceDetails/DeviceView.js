import './DeviceView.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

//import { useParams } from "react-router-dom";

export function DeviceView() {

    const [eventDetails, setEventDetails] = useState([])
    //let { id } = useParams();
    function getEvents() {
        axios.get("http://localhost:8080/apkdetails")
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
                                            <td> {apkDetail.status}</td>
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