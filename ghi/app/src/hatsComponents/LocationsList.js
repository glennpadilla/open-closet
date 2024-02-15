import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';
import {Link} from 'react-router-dom'


function LocationsList() {
    // const [hats, setHats] = useState([])
    const [locations, setLocations] = useState([])
    const [hats, setHats] = useState([])

    const [show, setShow] = useState(false);

    // locations.filter(location => location.href===hat.location.import_href

    const [stop, setStop] = useState(false);
    const [stop2, setStop2] = useState(false);



    const getLocationsData = async () => {
        const response = await fetch('http://localhost:8100/api/locations/');
        if (response.ok) {
            const locationsData = await response.json();
            setLocations(locationsData.locations)
            console.log(locations)

            setStop(true)
            // console.log("filter:", locations.filter(location => location.href===hats[1].location.import_href)[0])

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
            // console.log("filter:", (hats.filter(hat => hat.location.import_href==="/api/locations/2/")).length)
        }else{
            console.error("An error occurred while fetching the data");
        }
    }
    if (stop === false){
        getLocationsData();
    }
    if (stop2 === false){
        getHatsData();
    }

    useEffect(() => {

        let timer = setTimeout(() => {

        getLocationsData()
        getHatsData()

        }, 3000);
        return () => clearTimeout(timer)
    }, [hats, locations]);



    const handleDelete = async (event) => {
        event.preventDefault();
        const fetchConfig = {method: "delete"}
        console.log(event)
        console.log(event.target)
        console.log("locationId:", event.target.value)      //can use for the button value=location.id or value=location.href
        // console.log("locationHref:", event.target.value)   button value= location.href to use to delete location and location VO
        // console.log({...hatobject})
        const locationId = event.target.value

        if (window.confirm("Confirm Delete!") === true) {  // send delete request,  delete location and location vo as well
            const response = await fetch(`http://localhost:8100/api/locations/${locationId}/`, fetchConfig)    // hat id       //have to send as DELETE
            if (response.ok){
                const deleteResponse = await response.json()    //response for delete request will always be ok
                    // console.log(deleteResponse)
                const voresponse = await fetch(`http://localhost:8090/api/locations/${locationId}/`, fetchConfig)
                const voDeleteResponse = await voresponse.json()
                        //delete location VO
                alert("Successfully Deleted!")
                setShow(true);
            }
        } else { //false
            alert("Hat has not been deleted")
        }

    }


    return (
        <>
            <h1 style={{textAlign: 'var(--bs-body-text-align)'}}>Locations List</h1>
            <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                Location Deleted!
            </Alert>
            <table className="table table-striped">
                <thead style={{boxSizing:'content-box', height:'80px'}}>
                    <tr>
                        <th>Closet Name</th>
                        <th>Section Number</th>
                        <th>Shelf Number</th>
                        <th>Closet Name <br/>- Section Number<br/>/Shelf Number</th>
                        <th>Number of Hats</th>
                        <th>Delete or Create <br/>New Location</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location => {
                        // let rand = Math.random()
                        // let j = rand.toString()
                        // console.log(hat)  // if href didn't get passed from api, check model: may need method def get_api_url reverse to pass href
                        return (                    //each needs unique key
                            <tr key={ location.href }>
                                <td>{ location.closet_name }</td>
                                <td>{ location.section_number }</td>
                                <td>{ location.shelf_number }</td>
                                <td>{location.closet_name} - {location.section_number}/{location.shelf_number}</td>
                                <td> { (hats.filter(hat => hat.location.import_href===location.href)).length } </td>
                                <td>
                                    { (hats.filter(hat => hat.location.import_href===location.href)).length===0 && <button onClick={handleDelete} value={location.id} style={{width:'188px'}} className="btn btn-danger btn-lg px-4 gap-3">Delete Location</button>}
                                    { (hats.filter(hat => hat.location.import_href===location.href)).length>0 && <Link to="/locations/new/" style={{width:'188px'}} className="btn btn-primary btn-lg px-4 gap-3">Add Location</Link>}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}     // stretchgoal make image link to location detail

export default LocationsList;



//  <td>{ location.hats.reduce(x=> x+1, 0) }</td>  locationVO has hats

// <LocationDetail locationHref={ hat.location.import_href }/>

//onClose={() => setShow(false)}
