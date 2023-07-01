import React, { useState, useEffect } from "react";
import "../../styles/singlecontact.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SingleContact = () => {

    const params = useParams();
    const [contact, setContact] = useState();

    useEffect(()=> {
        fetchSingleContact();

    },[])

    //Function that gets a single contact
    const fetchSingleContact = () =>{

        fetch('https://assets.breatheco.de/apis/fake/contact/'+ params.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp); // will try return the exact result as string
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is where your code should start after the fetch finishes
			console.log(data); //this will print on the console the exact object received from the server
			setContact(data);
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
    }

    return (
        <div className="container">
            <h2 className="ms-2 text-center fw-bold">Contact:</h2>
            {contact?  (
                    <div className="bg-light rounded">
                        <div className="row g-3 mt-2 ms-2 me-2 border border-primary border-3 rounded">
                            <div className="col-11 border border-secondary rounded mx-auto">
                                <label htmlFor="fullName" className="form-label fw-bold text-primary">Full Name:</label>
                                    <h5>{contact.full_name}</h5>
                            </div>
                            <div className="col-11 border border-secondary rounded mx-auto">
                                <label htmlFor="email" className="form-label fw-bold text-primary">Email:</label>
                                    <h5>{contact.email}</h5>
                            </div>
                            <div className="col-11 border border-secondary rounded mx-auto">
                                <label htmlFor="phone" className="form-label fw-bold text-primary">Phone Number:</label>
                                    <h5>{contact.phone}</h5>
                            </div>
                            <div className="col-11 border border-secondary rounded mx-auto">
                                <label htmlFor="address" className="form-label fw-bold text-primary">Address:</label>
                                    <h5>{contact.address}</h5>
                            </div>
                            <div className="col-11 mb-3 border border-secondary rounded mx-auto">
                                <h5>{contact.agenda_slug}</h5>
                            </div>
                        </div>
                            
                            <div className="ms-2">
                                <Link to="/">or get back to contacts</Link>
                            </div>
                    </div>                                           
                
            ):(
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

            )}
        </div>
    )
}

export default SingleContact;