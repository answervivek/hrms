package com.hrms.employeemanagment.service;

import com.hrms.employeemanagment.model.Employee;
import com.hrms.employeemanagment.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements EmployeeServiceInterface {

    private final EmployeeRepository employeeRepository;
    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional
    public Employee saveEmployee(Employee employee) {
        Employee savedEmployee = employeeRepository.save(employee);
        logger.info("Employee saved with ID: {}", savedEmployee.getId());
        return savedEmployee;
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    @Transactional
    public Employee updateEmployee(int id, Employee employeeDetails) {
        Employee employeeToUpdate = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));

        employeeToUpdate.setEmployeeId(employeeDetails.getEmployeeId()); // Assuming you allow updating the employee ID
        employeeToUpdate.setFirstName(employeeDetails.getFirstName());
        employeeToUpdate.setLastName(employeeDetails.getLastName());
        employeeToUpdate.setEmail(employeeDetails.getEmail());
        employeeToUpdate.setPhoneNumber(employeeDetails.getPhoneNumber());
        employeeToUpdate.setHireDate(employeeDetails.getHireDate());
        employeeToUpdate.setDepartment(employeeDetails.getDepartment());
        employeeToUpdate.setJobTitle(employeeDetails.getJobTitle());
        employeeToUpdate.setSalary(employeeDetails.getSalary());
        employeeToUpdate.setActive(employeeDetails.isActive());
        employeeToUpdate.setDateOfBirth(employeeDetails.getDateOfBirth());
        employeeToUpdate.setAddress(employeeDetails.getAddress());
        employeeToUpdate.setCity(employeeDetails.getCity());
        employeeToUpdate.setState(employeeDetails.getState());
        employeeToUpdate.setZipCode(employeeDetails.getZipCode());
        employeeToUpdate.setCountry(employeeDetails.getCountry());
        employeeToUpdate.setAadhaar(employeeDetails.getAadhaar());
        employeeToUpdate.setManagerName(employeeDetails.getManagerName());
        employeeToUpdate.setMaritalStatus(employeeDetails.getMaritalStatus());
        employeeToUpdate.setGender(employeeDetails.getGender());
        employeeToUpdate.setNationality(employeeDetails.getNationality());
        employeeToUpdate.setEmergencyContactPhoneNumber(employeeDetails.getEmergencyContactPhoneNumber());

        Employee updatedEmployee = employeeRepository.save(employeeToUpdate);
        logger.info("Employee updated with ID: {}", updatedEmployee.getId());
        return updatedEmployee;
    }

    @Override
    public void deleteEmployee(int id) {
        try {
            employeeRepository.deleteById(id);
            logger.info("Employee deleted with ID: {}", id);
        } catch (Exception e) {
            logger.error("Error deleting employee with ID: " + id, e);
            throw new RuntimeException("Failed to delete the employee with ID: " + id, e);
        }
    }
}