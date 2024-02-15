import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const initialFormData = {
    closet_name: '',
    bin_number: '',
    bin_size: '',
}

function BinForm() {
    const [formData, setFormData] = useState(
        initialFormData
    )

    const[show,setShow] = useState(false);

    useEffect(() => {
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const binUrl = 'http://localhost:8100/api/bins/';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const binResponse = await fetch(binUrl, fetchConfig);
        if (binResponse.ok) {
            const newBin = await binResponse.json();
            console.log("post request response:", newBin)
            setFormData(
                initialFormData
            )
            if (newBin.href) {
                setShow(true);
            }
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

    useEffect(() => {

    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create bins</h1>
                    <form onSubmit={handleSubmit} id="create-bin-form">
                        <div className="form-floating mb-3">
                            <input value={formData.closet_name} onChange={handleFormChange} placeholder="Closet Name" required type="text" name="closet_name" id="closet_name" className="form-control" />
                            <label htmlFor="closet_name">Closet Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.bin_number} onChange={handleFormChange} placeholder="Bin Number" required type="number" name="bin_number" id="bin_number" className="form-control" />
                            <label htmlFor="bin_number">Bin Number</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={formData.bin_size} onChange={handleFormChange} placeholder="Bin Size" required type="number" name="bin_size" id="bin_size" className="form-control" />
                            <label htmlFor="bin_size">Bin Size</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
                <Alert show={show} key="success" variant="success" onClose={() => setShow(false)} dismissible>
                    Congratulations! You just created a new bin!
                </Alert>
            </div>
        </div>
    )
}

export default BinForm;
