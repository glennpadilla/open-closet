import { useState, useEffect } from 'react';


function ShoeList (props) {
    const [shoes, setShoes] = useState([]);

    const [bins, setBins] = useState([]);

    const[binhref, setBinhref] = useState('');

    const [stop, setStop] = useState(false);
    const [stop2, setStop2] = useState(false);


    const handleBinChange = (event) => {
        const value = event.target.value;
        setBinhref(value)
    }

    async function handleShoesBinSubmit(event, shoesId) {
        event.preventDefault();
        const putBody = {};
        putBody.bin = binhref

        const fetchOptions = {
            method: "put",
            body: JSON.stringify(putBody),
            headers: {'Content-Type': 'application/json'}
        }
        const binUrl = `http://localhost:8080/api/shoes/${shoesId}/`
        const changeBinUpdate = await fetch(binUrl, fetchOptions);
        if (changeBinUpdate.ok) {
            const shoesBinUpdated = await changeBinUpdate.json();
            console.log("put request response:", shoesBinUpdated);
        }

    }

    async function loadBinsData() {
        const response = await fetch('http://localhost:8100/api/bins/')
        const binsData = await response.json();
        setBins(binsData.bins)
        console.log(bins)
        setStop(true)
    }

    async function loadData() {
        const request = await fetch('http://localhost:8080/api/shoes')
        const response = await request.json();
        setShoes(response.shoes)
        console.log(shoes)
        setStop2(true)
    }
    if (stop === false){
        loadData(); //initial quick load first render, setStop(true) will stop this from repeating
    }
    if (stop2 === false){  //initial quick load first render, setStop2(true) will stop this from repeating
        loadBinsData()
    }

    useEffect(() => {
        let timer1 = setTimeout(() => {
        loadData();
        loadBinsData();
        }, 3000);  //3secs delay for every update
        return () => clearTimeout(timer1)
    }, [shoes, bins]);

    async function handleDelete(id) {
        const response = await fetch(`http://localhost:8080/api/shoes/${id}`, {
            method: "delete"
        })
        if (response.ok) {
            loadData()
        } else {
            alert("Something went wrong! It didn't DELETE!!!")
        }
    }

    let spinnerClasses = 'd-flex justify-content-center mb-3';
    let dropdownClasses = 'form-select d-none';
    if (bins.length > 0) {
      spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
      dropdownClasses = 'form-select';
    }

    return (
        <>
            <h1 style={{textAlign: 'var(--bs-body-text-align)'}}>Shoes List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Manufacturer</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Picture URL</th>
                        <th>Current Bin</th>
                        <th>Change Bin</th>
                        <th>Delete Shoes</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map(shoes => {
                        return (
                            <>
                                <tr key={shoes.href}>
                                    <td>{shoes.manufacturer}<hr size={5} /></td>
                                    <td>{shoes.model_name}<hr size={5} /></td>
                                    <td>{shoes.color}<hr size={5} /></td>
                                    <td><img style={{width: "150px"}} alt={`${shoes.color} ${shoes.manufacturer} ${shoes.model_name} shoes`} src={shoes.picture_url}/></td>
                                    <td>{ (bins.filter(bin => bin.href===shoes.bin.import_href)).map(bin => `Closet: ${bin.closet_name} Bin #: ${bin.bin_number} Bin Size: ${bin.bin_size}`) }<hr size={5} /></td>
                                    <td>
                                        <form onSubmit={(event) => handleShoesBinSubmit(event, shoes.id)} id="change-bin-form">
                                            <div className="mb-3">
                                                <select onChange={handleBinChange} required name="bin" id="bin" className={dropdownClasses}>
                                                    <option value="">Select bin</option>
                                                    {bins.map(bin => {
                                                        return (
                                                            <option key={bin.href} value={bin.href}>
                                                                Closet: {bin.closet_name}, Bin#: {bin.bin_number}, Bin Size: {bin.bin_size}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <button className="btn btn-primary">Change Bin</button>
                                        </form>
                                    </td>
                                    <td><button style={{width:'188px'}} className="btn btn-danger btn-lg px-4 gap-3" onClick={(e) => handleDelete(shoes.id)}>Delete Shoes</button></td>
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
    );
}

export default ShoeList;
