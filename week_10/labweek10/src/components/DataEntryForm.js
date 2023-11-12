import React, { Component } from 'react';
import './DataEntryFormCss.css';

export default class DataEntryForm extends Component {
    constructor(props) {
        super(props)
        this.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan']
        this.state = {
            fullName: '',
            email: '',
            address: '',
            address2: '',
            city: '',
            provinces: this.provinces[0],
            postalCode: '',
            termsAgreed: false,
            submittedData: null
        }
    }

    onValueChanged = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onCheckboxChange = (event) => {
        this.setState({
            termsAgreed: event.target.checked,
        });
    };

    onSubmitForm = (event) => {
        event.preventDefault()

        // Check if terms are agreed before submitting
        if (!this.state.termsAgreed) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        const { fullName, email, address, address2, city, provinces, postalCode } = this.state;
        const submittedData = {
            fullName,
            email,
            address,
            address2,
            city,
            provinces,
            postalCode,
        };
        this.setState({ submittedData });
        console.log(this.state)
    }

    render() {
        const { submittedData } = this.state;

    return (
        <div className="data-entry-form-container">
            <h1>Data Entry Form</h1>
            <form className="data-entry-form" onSubmit={(e) => this.onSubmitForm(e)} >
                    <label>Email</label>
                    <input 
                        name='email'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="Enter Email" />

                    <label>Full Name</label>
                    <input 
                        name='fullName'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="Full Name" /><br/>
                    
                    <label>Address</label>
                    <input 
                        name='address'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="123 Main Street" /><br/>

                    <label>Address 2</label>
                    <input 
                        name='address2'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="Apartment, studio, or floor" /><br/>
                    
                    <label>City</label>
                    <input 
                        name='city'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="Enter City" />
                    
                    <label>Provinces</label>
                    <select name='provinces' onChange={(e) => this.onValueChanged(e)}>
                        {
                            this.provinces.map((provinces) => (
                                 <option key={provinces} value={provinces}>{provinces}</option>
                            ))
                        }
                    </select>

                    <label>Postal Code</label>
                    <input 
                        name='postalCode'
                        type="text"
                        onChange={(e) => this.onValueChanged(e)} 
                        placeholder="Enter Postal Code" /><br/>

                    <input
                        name="termsAgreed"
                        type="checkbox"
                        checked={this.state.termsAgreed}
                        onChange={this.onCheckboxChange}/>
                    <label>Agree to terms and conditions</label>

                    <input className='button'
                        name='btnSubmit'
                        type="submit"
                        value="submit" />
                </form>

                {submittedData && (
                    <div className="submitted-data">
                        <p><strong>Email:</strong> {submittedData.email}</p>
                        <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                        <p><strong>Address:</strong> {submittedData.address}</p>
                        <p><strong>Address 2:</strong> {submittedData.address2}</p>
                        <p><strong>City:</strong> {submittedData.city}</p>
                        <p><strong>Province:</strong> {submittedData.provinces}</p>
                        <p><strong>Postal Code:</strong> {submittedData.postalCode}</p>
                    </div>
                )}
      </div>
    )
  }
}