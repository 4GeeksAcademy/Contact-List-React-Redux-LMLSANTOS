import React, { useContext, useEffect, useState } from "react";
import "../../styles/addcontact.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const EditContact = () => {

	const params = useParams();
    console.log("I want to change this id", params.id);
    
    const {store, actions} = useContext(Context);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

    //Hook that calls the fetchSingleContact function
    useEffect (()=> {
        fetchSingleContact();

    },[])

    //Function that will edit a contact
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
			setFullName(data.full_name);
            setEmail(data.email);
            setPhone(data.phone);
            setAddress(data.address);
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
    }

	// function that validates the contact form
	const onSubmit = ()=>{
		if(fullName ===""){
			alert ("Enter Full Name!");
		} else if (email === ""|| !email.includes('@')){
			alert ("Enter a Valid Email Format!")
		} else if (phone === ""|| phone.length !== 10){
			alert ("Enter a correct phone number!")
		}  else if (address === ""){
			alert ("Enter your address!")
		} else {
			
			//create contact api here
			const contact = {
				"full_name": fullName,
				"email": email,
				"agenda_slug": store.agenda,
				"address":address,
				"phone":phone,
			}
			fetch('https://assets.breatheco.de/apis/fake/contact/'+ params.id, {
				method: "PUT",
				body: JSON.stringify(contact),
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
					setFullName("");
					setEmail("");
					setPhone("");
					setAddress("");
					alert(`Contact ${fullName} Successfully Updated!`)
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
		}
	}

	return (
		<div className="container">
			<div className="row g-3 mt-5">
				<h2 className="mt-4 text-center fw-bold">Edit contact:</h2>
					<div className="mx-auto col-11">
						<label htmlFor="fullName" className="form-label fw-bold">Full Name:</label>
						<input 
							type="text" 
							className="form-control" 
							id="fullName"
							value = {fullName}
							onChange={(e)=> setFullName(e.target.value)} 
							placeholder="Insert your complete name..."
						/>
					</div>
					<div className="mx-auto col-11">
						<label htmlFor="email" className="form-label fw-bold">Email:</label>
						<input 
							type="text" 
							className="form-control"
							id="email" 
							value = {email}
							onChange={(e)=> setEmail(e.target.value)} 
							placeholder="Insert your email here..."
						/>
					</div>
					<div className="mx-auto col-11">
						<label htmlFor="phone" className="form-label fw-bold">Phone Number:</label>
						<input 
							type="text" 
							className="form-control" 
							id="phone" 
							value = {phone}
							onChange={(e)=> setPhone(e.target.value)} 
							placeholder="Insert your phone number here..."
						/>
					</div>
					<div className="mx-auto col-11">
						<label htmlFor="address" className="form-label fw-bold">Address:</label>
						<input 
							type="text" 
							className="form-control" 
							id="address"
							value = {address}
							onChange={(e)=> setAddress(e.target.value)} 
							placeholder="Insert your address here..."	
						/>
					</div>
			</div>
			<div className="row mt-2">
				<div className="mx-auto col-11">
					<button onClick={onSubmit} className="col-12 btn btn-primary fw-bold">Update Contact</button>
				</div>
				<div className="mx-auto mt-1 col-11">
					<Link to="/">or get back to contacts</Link>
				</div>	
			</div>	
		</div>
		
	);
};

export default EditContact;