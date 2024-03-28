import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const ListEmployeeComponent = () => {
    const [employeeArray, setEmployeeArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllEmployee();
    }, []);

    const getAllEmployee = async () => {
        setIsLoading(true);
        try {
            const res = await EmployeeService.getAllEmployee();
            setEmployeeArray(res.data);
            console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEmployee = async (e, id) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await EmployeeService.deleteEmployee(id);
            await getAllEmployee(); // Wait for the list to refresh
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='container'>
            <Link to={"/add-employee"} className='btn btn-primary mb-2 mt-3'>Add Employee</Link>
            <h2 className='text-center mb-4'>List of Employees</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : employeeArray.length > 0 ? (
                <table className='table table-responsive table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeArray.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <Link to={`/add-employee/${employee.id}`} className='btn btn-info'>Update</Link>{" "}
                                    <button onClick={(e) => deleteEmployee(e, employee.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    No employee records found. Click "Add Employee" to create new records.
                </div>
            )}
        </div>
    );
};

export default ListEmployeeComponent;
