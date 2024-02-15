import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'


function BinList (props) {
    const [bins, setBins] = useState([]);
    const [shoes, setShoes] = useState([]);

    async function loadData() {
        const response = await fetch('http://localhost:8100/api/bins/')
        if (response.ok) {
            const binsData = await response.json();
            setBins(binsData.bins)
            console.log(bins)
        }
        const shoesResponse = await fetch('http://localhost:8080/api/shoes/')
        if (shoesResponse.ok) {
            const shoesData = await shoesResponse.json()
            setShoes(shoesData.shoes)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleDelete(id) {
        console.log("id:", id)
        const response = await fetch(`http://localhost:8100/api/bins/${id}`, {method: "delete"})
        if (response.ok) {
            const delResponse = await response.json()
            const voresponse = await fetch(`http://localhost:8080/api/bins/${id}`, {method: "delete"})
            if (voresponse.ok) {
                const voDelResponse = await voresponse.json()
            }
            loadData()
        } else {
            alert("OH NO! IT DIDN'T DELETE!!!")
        }
    }

    return(
        <>
            <h1 style={{textAlign: 'var(--bs-body-text-align)'}}>Bin List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th>Closet Name</th>
                        <th>Bin Number</th>
                        <th>Bin Size</th>
                        <th>Closet Name <br/>- Bin Number<br/>/Bin Size</th>
                        <th>Number of Shoes</th>
                        <th>Delete Bin or <br/> Create New Bin</th>
                    </tr>
                </thead>
                <tbody>
                    {bins?.map(bin => {
                        return (
                            <tr key={bin.href}>
                                <td>{bin.closet_name}</td>
                                <td>{bin.bin_number}</td>
                                <td>{bin.bin_size}</td>
                                <td>{bin.closet_name} - {bin.bin_number}/{bin.bin_size}</td>
                                <td> { (shoes.filter(shoe => shoe.bin.import_href===bin.href)).length } </td>
                                <td>
                                    { (shoes.filter(shoe => shoe.bin.import_href===bin.href)).length===0 && <button onClick={(e) => handleDelete(bin.id)} value={bin.id} style={{width:'188px'}} className="btn btn-danger btn-lg px-4 gap-3">Delete Bin</button>}
                                    { (shoes.filter(shoe => shoe.bin.import_href===bin.href)).length>0 && <Link to="/bins/new/" style={{width:'188px'}} className="btn btn-primary btn-lg px-4 gap-3">Create Bin</Link>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default BinList;

// <td><button className="btn btn-danger" onClick={ (e) => handleDelete(bin.id)}>Delete</button></td>
