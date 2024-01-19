import React, { useState, useEffect } from 'react';
import { Container, TextField } from '@mui/material';
import EmployeeList from './employeeList';


const employeesList = [
  {
      name: {
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'A',
          preferredName: 'JD'
      },
      profilePicture: '',
      email: 'johndoe@example.com',
      ssn: '123-45-6789',
      dateOfBirth: new Date('1985-07-12'),
      gender: 'Male',
      address: {
          building: '100',
          street: 'Main St',
          city: 'Springfield',
          state: 'MA',
          zip: '01103'
      },
      contactInfo: {
          cellPhone: '555-1234',
          workPhone: '555-5678'
      },
      employment: {
          visaTitle: 'H1B',
          startDate: new Date('2020-01-15'),
          endDate: new Date('2023-01-14')
      }
  },
  {
      name: {
          firstName: 'Emily',
          lastName: 'Johnson',
          middleName: 'B',
          preferredName: 'Em'
      },
      profilePicture: '',
      email: 'emilyj@example.com',
      ssn: '987-65-4321',
      dateOfBirth: new Date('1990-05-22'),
      gender: 'Female',
      address: {
          building: '200',
          street: 'Oak St',
          city: 'Centerville',
          state: 'CA',
          zip: '90210'
      },
      contactInfo: {
          cellPhone: '555-9876',
          workPhone: '555-6543'
      },
      employment: {
          visaTitle: 'L1',
          startDate: new Date('2021-06-01'),
          endDate: new Date('2024-05-31')
      }
  },
  {
      name: {
          firstName: 'Michael',
          lastName: 'Smith',
          middleName: 'C',
          preferredName: 'Mike'
      },
      email: 'michaels@example.com',
      ssn: '555-00-1234',
      dateOfBirth: new Date('1982-11-30'),
      gender: 'Male',
      address: {
          building: '300',
          street: 'Elm St',
          city: 'Lakeview',
          state: 'NY',
          zip: '10001'
      },
      contactInfo: {
          cellPhone: '555-1111',
          workPhone: '555-2222'
      },
      employment: {
          visaTitle: 'B1',
          startDate: new Date('2019-09-01'),
          endDate: new Date('2022-08-31')
      }
  }
];


const EmployeeProfiles = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        // Fetch employees data
        // const fetchData = async () => {
        //         try {
        //             const res = await fetch('http://localhost:3000/api/employees');
        //             const fetchedEmployees = await res.json();
        //             setEmployees(fetchedEmployees);
        //         } catch (err) {
        //             console.log(err);
        //         }
        // };
        // fetchData();
        //setEmployees(employeesList);
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    
    // Can search by first, last, prefered name on every key press
    const filteredEmployees = employeesList.filter(employee => {
      const { firstName, lastName, preferredName } = employee.name;
      const keyword = searchTerm.toLowerCase();
      return firstName.toLowerCase().includes(keyword) ||
             lastName.toLowerCase().includes(keyword) ||
             (preferredName && preferredName.toLowerCase().includes(keyword));
    });
  
  return (
    <Container>
      <TextField
        label="Search Employees"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <EmployeeList employees={filteredEmployees} />
    </Container>
  );
};

export default EmployeeProfiles;