import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=20');
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === 'all') {
      setFilteredUsers(users);
    } else {
      const filteredData = users.filter((user) => user.gender === selectedFilter);
      setFilteredUsers(filteredData);
    }
  };

  return (
    <div>
      <div>
        <input
          type="radio"
          name="gender"
          value="all"
          checked={filter === 'all'}
          onChange={handleFilterChange}
        />
        <label htmlFor="all">All</label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={filter === 'male'}
          onChange={handleFilterChange}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={filter === 'female'}
          onChange={handleFilterChange}
        />
        <label htmlFor="female">Female</label>
      </div>

      <table >
        <thead>
          <tr>
          <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>cell</th>
            <th>street name</th>
            <th>city</th>
            <th>state</th>
            <th>country</th>
            <th>postcode</th>
            
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>{}
            {console.log("Item:"+JSON.stringify(user))}
            <td><img src={user.picture.large} alt=" " /></td>
            {/* <td><img src={user.picture.medium} alt=" " /></td> */}
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.cell}</td>
              <td>{user.location.street.name}</td>
              <td>{user.location.city}</td>
              <td>{user.location.state}</td>
              <td>{user.location.country}</td>
              <td>{user.location.postcode} </td>
             

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserComponent;
