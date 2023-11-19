import React, { Component } from 'react';
import axios from 'axios';
import './PersonList.css';

class PersonList extends Component {
    state = {
        persons: [],
        isLoading: false
    };

    fetchPersonList = () => {
        // Fetching data for 10 people
        this.setState({ isLoading: true });
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                const fetchedPersons = res.data.results.map(person => ({
                    ...person,
                    profileImage: person.picture.large
                }));
                this.setState({
                    persons: fetchedPersons,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error('Error fetching person list:', error);
                this.setState({ isLoading: false });
            });
    };

    render() {
        return (
            <div className="person-list-container">
                <h2>Person List</h2>
                <button onClick={this.fetchPersonList} disabled={this.state.isLoading}>
                    User List
                </button>
                <div className="person-list">
                    {this.state.persons.map(person => (
                        <li key={person.login.uuid} className="person-item">
                            <img src={person.profileImage} alt="Profile"/>
                            <div className="person-details">
                                <h3>{person.name.title} {person.name.first} {person.name.last}</h3>
                                <h3>ID: {person.login.uuid}</h3>
                                <strong>Username:</strong> {person.login.username}<br />
                                <strong>Gender:</strong> {person.gender}<br />
                                <strong>Timezone:</strong> {person.location.timezone.description}<br />
                                <strong>Address:</strong> {`${person.location.street.name}, ${person.location.city}`}<br />
                                <strong>Email:</strong> {person.email}<br />
                                <strong>Birthdate:</strong> {person.dob.date}<br />
                                <strong>Age:</strong> {person.dob.age}<br />
                                <strong>Register Date:</strong> {person.registered.date}<br />
                                <strong>Phone:</strong> {person.phone}<br />
                                <strong>Cell:</strong> {person.cell}<br />
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        );
    }
}

export default PersonList;