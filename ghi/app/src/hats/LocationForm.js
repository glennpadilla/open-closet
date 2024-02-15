import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
// import {Alert, Button} from 'react'



function LocationForm () {
      // variable states can be used in jsx return data, initial value array [], setStates method to manipulate data for the next states value:

    const [closet_name, setClosetName] = useState('');      // useState hook stores "name" in the LocationForm component's state with initial value of empty string
    const [section_number, setSectionNumber] = useState('');
    const [shelf_number, setShelfNumber] = useState('');

    const [show, setShow] = useState(false);   //alert show true on successful post create attendee


    const handleClosetNameChange = (event) => {    // event is triggered when user inputs types location name,
        const value = event.target.value;
        setClosetName(value);                        // state's name variable is ressigned to location name
    }

    const handleSectionNumberChange = (event) => {
        const value = event.target.value;
        setSectionNumber(value);
    }

    const handleShelfNumberChange = (event) => {
        const value = event.target.value;
        setShelfNumber(value);
    }


    const handleSubmit = async (event) => {        //event triggered when user submits the form
        event.preventDefault();
        const data = {};   //create empty JSON object
        data.closet_name = closet_name;
        data.section_number = section_number;
        data.shelf_number = shelf_number;
        console.log("post request body:", data)

        const locationsUrl = `http://localhost:8100/api/locations/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json',}
        }
        const newLocationResponse = await fetch(locationsUrl, fetchConfig); //post request
        if (newLocationResponse.ok) {
            const newLocation = await newLocationResponse.json();
            console.log("post request response:", newLocation);

            setClosetName('');
            setSectionNumber('');
            setShelfNumber('');

            if (newLocation.href) {
                setShow(true);
            }
        }
    }

    // const fetchData = async () => {      //gets data needed for the form select tag dropdown
    //     const locationUrl = 'http://localhost:8100/api/locations/';
    //     const response = await fetch(locationUrl);

    //     if (response.ok) {
    //         const locationsData = await response.json();
    //         setLocations(locationsData.locations)    //******** creates next state after initial state ******/
    //     }
    // }
    useEffect(() =>{   //after rendering, it will run arrow function
        // fetchData();    //calls fetchData function after rendering
    }, []);

    // let spinnerClasses = 'd-flex justify-content-center mb-3';
    // let dropdownClasses = 'form-select d-none';
    // if (locations.length > 0) {
    //   spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    //   dropdownClasses = 'form-select';
    // }

    return (
        // <p>A location form</p>
        <div className="row">
        {/* <div className="my-5 container"> */}
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Location</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleClosetNameChange} value={closet_name} placeholder="closet_name" required type="text" name="closet_name" id="closet_name" className="form-control"/>
                            <label htmlFor="closet_name">Closet Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleSectionNumberChange} value={section_number} placeholder="section_number" required type="number" name="section_number" id="section_number" className="form-control"/>
                            <label htmlFor="section_number">Section Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleShelfNumberChange} value={shelf_number} placeholder="shelf_number" required type="number" name="shelf_number" id="shelf_number" className="form-control"/>
                            <label htmlFor="style">Shelf Number</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                    New Location successfully created!
                </Alert>
            </div>
        </div>
    );
}
export default LocationForm;


                        // <div className={spinnerClasses} id="loading-location-spinner">
                        //     <div className="spinner-grow text-secondary" role="status">
                        //         <span className="visually-hidden">Loading...</span>
                        //     </div>
                        // </div>
