package com.EMS.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EMS.dao.EmployeeDao;
import com.EMS.entity.Employee;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeDao dao;


    // ADD
    public String addEmployee(Employee e) {

        return dao.addEmployee(e);
    }


    // TOGGLE STATUS
    public String toggleEmployeeStatus(Integer id) {

        return dao.toggleEmployeeStatus(id);
    }


    // UPDATE
    public String updateEmployee(Employee e, Integer id) {

        return dao.updateEmployee(e, id);
    }


    // GET SINGLE
    public Employee getSingleEmployee(Integer id) {

        return dao.getSingleEmployee(id);
    }


    // GET ALL
    public List<Employee> getAll() {

        return dao.getAll();
    }


    // GET ACTIVE
    public List<Employee> getActiveEmployees() {

        return dao.getActiveEmployees();
    }


    // GET INACTIVE
    public List<Employee> getInactiveEmployees() {

        return dao.getInactiveEmployees();
    }
}