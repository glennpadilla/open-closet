import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
// import {Alert, Button} from 'react'



function HatForm () {
    const [locations, setLocations] = useState([]);  // variable states can be used in jsx return data, initial value array [], setStates method to manipulate data for the next states value:

    const [fabric, setFabric] = useState('');      // useState hook stores "name" in the LocationForm component's state with initial value of empty string
    const [style, setStyle] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [location, setLocation] = useState('');

    const [show, setShow] = useState(false);   //alert show true on successful post create attendee


    const handleFabricChange = (event) => {    // event is triggered when user inputs types location name,
        const value = event.target.value;
        setFabric(value);                        // state's name variable is ressigned to location name
    }

    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        console.log("location state value for post request:", value)
        setLocation(value);
    }


    const handleSubmit = async (event) => {        //event triggered when user submits the form
        event.preventDefault();
        const data = {};   //create empty JSON object
        data.fabric = fabric;
        data.style = style;
        data.color = color;
        data.picture_url = picture_url
        data.location_href = location
        console.log("post request body:", data)

        const hatsUrl = `http://localhost:8090/api/hats/`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json',}
        }
        const newHatResponse = await fetch(hatsUrl, fetchConfig); //post request
        if (newHatResponse.ok) {
            const newHat = await newHatResponse.json();
            console.log("post request response:", newHat);

            setFabric('');
            setStyle('');
            setColor('');
            setPictureUrl('');
            setLocation('');

            setShow(true);
        }

    }

    const fetchData = async () => {      //gets data needed for the form select tag dropdown
        const locationUrl = 'http://localhost:8100/api/locations/';
        const response = await fetch(locationUrl);

        if (response.ok) {
            const locationsData = await response.json();
            setLocations(locationsData.locations)    //******** creates next state after initial state ******/
        }
    }
    useEffect(() =>{   //after rendering, it will run arrow function
        fetchData();    //calls fetchData function after rendering
    }, []);

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (locations.length > 0) {
      spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
      dropdownClasses = 'form-select';
    }

    return (
        // <p>A location form</p>
        <div className="row">
        {/* <div className="my-5 container"> */}
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFabricChange} value={fabric} placeholder="fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStyleChange} value={style} placeholder="style" required type="text" name="style" id="style" className="form-control"/>
                            <label htmlFor="style">Style</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="style">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={picture_url} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                            <label htmlFor="style">Picture Url</label>
                        </div>
                        <div className={spinnerClasses} id="loading-hat-spinner">
                            <div className="spinner-grow text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} value={location} required name="location" id="location" className={dropdownClasses}>
                                <option value="">Choose a location</option>
                                {locations.map(location => {

                                    return (
                                        <option key={location.href} value={location.href}>Closet: {location.closet_name}, Section: {location.section_number}, Shelf: {location.shelf_number}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                    New hat successfully created!
                </Alert>
            </div>
        </div>
    );
}
export default HatForm;
