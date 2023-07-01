import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Home = () => {
	
	const {store, actions} = useContext(Context);
	const [contactList, setContactList] = useState([]);
	const navigate = useNavigate();
	
	console.log(store.agenda);

	//call the function fetchContact

	useEffect(()=>{
		fetchContacts();
	},[])

	//2 function that gets the contacts from agenda (inside the store)
	const fetchContacts = () => {
		fetch ('https://assets.breatheco.de/apis/fake/contact/agenda/'+ store.agenda, {
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
			setContactList(data);
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}

	//3 Function that deletes a contact at a time
	const deleteContact = (contactId, full_name) => {
		fetch ('https://assets.breatheco.de/apis/fake/contact/'+contactId, {
			method: "DELETE",
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
			alert(`Are you sure you want to delete ${full_name} ?`);
			alert(`Contact ${full_name} Successfully Deleted!...`);
			fetchContacts();
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}

	//1 Function that shows the contact list
	const showContacts = ()=> {
		return contactList.map((item, index)=> {
			return (
				<li
					key={index}
					className="list-group-item d-flex justify-content-between ms-4 me-4"
				>
					<div className="d-flex justify-content-between">
						<div className="pe-3">
							<img className="d-inline" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdDITXx640AH7RMi2K3rj3Btd4e8T7nwn6_DXWIv4DI7SAOPzz5570hDjZWIUwVdY5J0Q&usqp=CAU" width="150px" alt="Albert Einstein"></img>
						</div>
						<div className="ps-4">
							<div>
								<Link to= {"/contact/"+item.id}><h4>{item.full_name}</h4></Link>
							</div>
							<div className="mb-1">
								<i className="fas fa-map-marker-alt iconSort"></i>
								<p className="d-inline ps-2">{item.address}</p>
							</div>
							<div className="mb-1">
								<i className="fas fa-phone iconSort"></i>
								<p className="d-inline ps-2">{item.phone}</p>
							</div>	
							<div className="mb-2">
								<i className="fas fa-envelope iconSort"></i>
								<p className="d-inline ps-2">{item.email}</p>
							</div>	
						</div>	
					</div>
					<div className="icons">
						<i className="fas fa-pencil-alt pe-4 edit" onClick={() => navigate("/edit/"+item.id)}></i>	
						<i className="fas fa-trash-alt trash" onClick={() => deleteContact(item.id,item.full_name)}></i>	
					</div>
				</li>
			)
		})
	}
	
	return (
		<div className="container">
			<div className="d-flex justify-content-end mb-3">
				<div>
					<button className="mt-2 me-4" onClick={() => navigate("/add-contact")}>
						Add new contact
					</button>
				</div>
			</div>
			<ul className="list-group">
				{showContacts()}
			</ul>
		</div>
	)
}

export default Home;

