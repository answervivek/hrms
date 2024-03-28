import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Stylesheet.css';

const AddEmployeeComponent = () => {
    // State variables for each field in the Employee entity
    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [department, setDepartment] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [salary, setSalary] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [managerName, setManagerName] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    // Bundling data for submission
    const employeeData = {
        employeeId,
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate: new Date(hireDate),
        department,
        jobTitle,
        salary: parseFloat(salary),
        isActive,
        dateOfBirth: new Date(dateOfBirth),
        address,
        city,
        state,
        zipCode,
        country,
        aadhaar,
        managerName,
        maritalStatus,
        gender,
        nationality,
        emergencyContactPhoneNumber,
    };

    // Function to handle form submission
    function saveEmployee(e) {
        e.preventDefault();

        // Basic validation (Further validations can be added as per requirement)
        if (employeeData.firstName !== "" && employeeData.lastName !== "" && employeeData.email !== "") {
            if (id) {
                // Update operation
                EmployeeService.updateEmployee(id, employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            } else {
                // Save operation
                EmployeeService.saveEmployee(employeeData)
                    .then(() => navigate("/employee"))
                    .catch(e => console.log(e));
            }
        } else {
            alert("Please, fill in all required fields.");
        }
    }

    // Function to set the form title based on the operation
    function getTitle() {
        return id ? "Update Employee" : "Add Employee";
    }

    // Fetch existing employee data for editing
    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then(res => {
                    const employee = res.data;
                    setEmployeeId(employee.employeeId);
                    setFirstName(employee.firstName);
                    setLastName(employee.lastName);
                    setEmail(employee.email);
                    // Set other fields similarly...
                })
                .catch(e => console.log(e));
        }
    }, [id]);

    // Form rendering
    // Form rendering
return (
    <div className="container mt-5">
        <div className="row">
            <div className="card col-md-6 offset-md-3">
                <h2 className="text-center">{getTitle()}</h2>
                <div className="card-body">
                    <form>
                        {/* Existing fields */}
                        <div className="form-group mb-2">
                            <label>First Name:</label>
                            <input className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter First Name" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Last Name:</label>
                            <input className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter Last Name" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Email:</label>
                            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />
                        </div>

                        {/* Additional fields */}
                        <div className="form-group mb-2">
                            <label>Employee ID:</label>
                            <input className="form-control" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} type="text" placeholder="Enter Employee ID" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Phone Number:</label>
                            <input className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Enter Phone Number" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Hire Date:</label>
                            <input className="form-control" value={hireDate} onChange={(e) => setHireDate(e.target.value)} type="date" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Department:</label>
                            <input className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} type="text" placeholder="Enter Department" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Job Title:</label>
                            <input className="form-control" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="Enter Job Title" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Salary:</label>
                            <input className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} type="number" placeholder="Enter Salary" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Active:</label>
                            <input className="form-check-input" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} type="checkbox" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Date of Birth:</label>
                            <input className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} type="date" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Address:</label>
                            <input className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter Address" />
                        </div>
                        {/* Repeat the pattern for the remaining fields */}
                        <button onClick={(e) => saveEmployee(e)} className="btn btn-success">Save</button> {" "}
                        <Link to="/employee" className="btn btn-danger">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
}

export default AddEmployeeComponent;