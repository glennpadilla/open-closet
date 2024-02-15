import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';



function ShoeForm() {
    const initialFormData = {
        manufacturer: '',
        model_name: '',
        color: '',
        picture_url: '',
        bin: '',
    }

    const [bins, setBins] = useState([])

    const[show,setShow] = useState(false);


    const [formData, setFormData] = useState(initialFormData)


    const fetchData = async() => {
        const binUrl = 'http://localhost:8100/api/bins/';
        const response = await fetch(binUrl);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const shoesUrl = `http://localhost:8080/api/shoes/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const shoeResponse = await fetch(shoesUrl, fetchConfig);
        console.log(shoeResponse)
        if (shoeResponse.ok) {
            const newShoe = await shoeResponse.json();
            console.log(newShoe)

            setFormData(initialFormData)

            setShow(true);
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create shoes</h1>
                    <form onSubmit={handleSubmit} id="create-shoe-form">
                        <div className="form-floating mb-3">
                            <input value={formData.manufacturer} onChange={handleFormChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.model_name} onChange={handleFormChange} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control" />
                            <label htmlFor="model_name">Model Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.color} onChange={handleFormChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.picture_url} onChange={handleFormChange} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="mb-3">
                            <select value={formData.bin} onChange={handleFormChange} required name="bin" id="bin" className="form-select">
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
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                    Congratulations! You just created a new shoe item!
                </Alert>
            </div>
        </div>
    )
}

export default ShoeForm;
