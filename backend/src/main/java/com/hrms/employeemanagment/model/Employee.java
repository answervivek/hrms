package com.hrms.employeemanagment.model;

import lombok.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Employee ID is required")
    private String employeeId;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Email should be valid")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email should be valid")
    private String email;

    @Pattern(regexp="\\d{10}", message="Phone number should be 10 digits")
    private String phoneNumber;

    @NotNull(message = "Hire date is required")
    private Date hireDate;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @DecimalMin(value = "0.0", message = "Salary must be greater than or equal to 0")
    private double salary;

    private boolean isActive;

    @NotNull(message = "Date of birth is required")
    private Date dateOfBirth;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Zip code is required")
    private String zipCode;

    @NotBlank(message = "Country is required")
    private String country;

    @Pattern(regexp="\\d{9}", message="Social Security Number should be 9 digits")
    private String aadhaar ;

    private String managerName;

    @NotBlank(message = "Marital status is required")
    private String maritalStatus;

    @NotBlank(message = "Gender is required")
    private String gender;

    private String nationality;

    @Pattern(regexp="\\d{10}", message="Emergency contact phone number should be 10 digits")
    private String emergencyContactPhoneNumber;

}
