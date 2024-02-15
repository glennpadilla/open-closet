import React, {useState, useEffect} from 'react';
// import {Alert, Button} from 'react'
import Alert from 'react-bootstrap/Alert';


function HatsList() {
    const [hats, setHats] = useState([])
    const [locations, setLocations] = useState([])

    const [show, setShow] = useState(false);

    const [stop, setStop] = useState(false);
    const [stop2, setStop2] = useState(false);

    // const[locationHrefObject, setLocationHrefObject] = useState({});    //location.href as key and value, state from hat location change dropdown selection,  use locationHref[locationhref] as value for form select tag submit
    const[locationhref, setLocationhref] = useState('')     // key for above object to access the location href for put request
    // const[location, setLocation] = useState('')

    const handleLocationChange = (event) => {
        console.log("event:", event)
        console.log("target:", event.target)
        console.log("value:", event.target.value)
        const value = event.target.value;
        setLocationhref(value)
    }

    async function handleHatLocationSubmit(event, hatId)  {    //send put request to update hat with location href, that will be used to update hat with location VO
        event.preventDefault();
        console.log("event:", event)
        console.log("event.target:", event.target)  //form tag value, hat.href, use this for the put request api url
        console.log("event.target.value:", event.target.value) // undefined
        console.log("event.value:", event.value)

        const putBody = {};
        putBody.location_href = locationhref
        console.log("put request body:", putBody)

        const fetchOptions = {
            method: "put",
            body: JSON.stringify(putBody),
            headers: {'Content-Type': 'application/json'}
        }
        // put request need location href and hat id
        const hatUrl = `http://localhost:8090/api/hats/${hatId}/`
        const newLocationUpdate = await fetch(hatUrl, fetchOptions);
        if (newLocationUpdate.ok) {
            const hatLocationUpdated = await newLocationUpdate.json();
            console.log("put request response:", hatLocationUpdated);

        }
    }

    const getLocationsData = async () => {
        const response = await fetch('http://localhost:8100/api/locations/');
        if (response.ok) {
            const locationsData = await response.json();
            setLocations(locationsData.locations)
            console.log("locations:", locations)
            // console.log("filter:", locations.filter(location => location.href===hats[1].location.import_href)[0])
            setStop(true)
        }else{
            console.error("An error occurred while fetching the data");
        }
    }
    const getHatsData = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');

        if (response.ok) {
            const hatsData = await response.json();
            setHats(hatsData.hats)
            console.log("hats:", hats)
            setStop2(true)
        }else{
            console.error("An error occurred while fetching the data");
        }
    }
    if (stop === false){
        getLocationsData(); //initial quick load first render, setStop(true) will stop this from repeating
    }
    if (stop2 === false){  //initial quick load first render, setStop2(true) will stop this from repeating
        getHatsData()
    }

    useEffect(() => {

        let timer1 = setTimeout(() => {     //developer mode, continuously updates with delay,

        getLocationsData()                  //1000=1sec, will update when using APIs to create and delete
        getHatsData()

        }, 3000);  //3secs delay for every update
        return () => clearTimeout(timer1)
    }, [hats, locations]);


    const handleDelete = async (event) => {
        event.preventDefault();
        const fetchConfig = {method: "delete"}
        // console.log(event)
        // console.log(event.target)
        console.log("hat ID:", event.target.value)
        // console.log({...hatobject})
        const hatId = event.target.value
        if (window.confirm("Confirm Delete!") === true) {  // send delete request
            const response = await fetch(`http://localhost:8090/api/hats/${hatId}/`, fetchConfig)    // hat id       //have to send as DELETE
            const deleteResponse = await response.json()    //response for delete request will always be ok
            console.log(deleteResponse)
            alert("Successfully Deleted!")

            setShow(true);
        } else { //false
            alert("Hat has not been deleted")
        }
    }

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (locations.length > 0) {
      spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
      dropdownClasses = 'form-select';
    }

    return (
        <>
            <h1 style={{textAlign: 'var(--bs-body-text-align)'}}>Hats List</h1>
            <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                Hat Deleted!
            </Alert>
            <table className="table table-striped">
                <thead style={{boxSizing:'content-box', height:'80px'}}>
                    <tr>
                        <th></th>
                        <th>fabric</th>
                        <th>Style</th>
                        <th>Color</th>
                        <th>Picture</th>
                        <th>Current Location</th>
                        <th>Change Location</th>
                        <th>Delete Hat</th>
                    </tr>
                </thead>
                <tbody>
                    {hats.map(hat => {
                        // let rand = Math.random()
                        // let j = rand.toString()
                        // console.log(hat)  // hat.href didn't get passed from api, check model needed def get_api_url reverse to pass href
                        return (                    //each needs unique key
                            <>
                                <tr key={ hat.href }>
                                    <td><b>Hat:</b><hr size={5} /></td>
                                    <td>{hat.fabric}<hr size={5} /></td>
                                    <td>{ hat.style }<hr size={5} /></td>
                                    <td>{ hat.color }<hr size={5} /></td>
                                    <td><img style={{width: "150px"}} alt={`${hat.color} ${hat.fabric} ${hat.style} hat`} src={hat.picture_url}/></td>
                                    <td>{ (locations.filter(location => location.href===hat.location.import_href)).map(location => `Closet: ${location.closet_name} Section: ${location.section_number} Shelf: ${location.shelf_number}`) }<hr size={5}/></td>
                                    <td>
                                        <form onSubmit={(event) => handleHatLocationSubmit(event, hat.id)} value= {hat.id} id="change-location-form">
                                            <div key={ hat.href } className="mb-3">
                                                <select onChange={handleLocationChange} required name="location" id="location" className={dropdownClasses}>
                                                    <option value="">Choose a location</option>
                                                    {locations.map(location => {
                                                        return (
                                                            <option key={location.href} value={location.href}>Closet: {location.closet_name}, Section: {location.section_number}, Shelf: {location.shelf_number}</option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <button className="btn btn-primary">Change Location</button>
                                        </form>
                                    </td>
                                    <td>
                                        <button onClick={handleDelete} value={hat.id} style={{width:'188px'}} className="btn btn-danger btn-lg px-4 gap-3">Delete Hat</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}     // stretchgoal make image link to hat detail

export default HatsList;



// <LocationDetail locationHref={ hat.location.import_href }/>

//onClose={() => setShow(false)}
