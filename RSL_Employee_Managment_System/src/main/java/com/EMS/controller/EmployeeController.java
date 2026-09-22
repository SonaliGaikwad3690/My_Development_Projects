package com.EMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.EMS.entity.Employee;
import com.EMS.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService service;


    
    @PostMapping("/register")
    public String addEmployee(@RequestBody Employee e) {

        return service.addEmployee(e);
    }



    @PutMapping("/toggle/{id}")
    public String toggleEmployeeStatus(
            @PathVariable Integer id) {

        return service.toggleEmployeeStatus(id);
    }


    
    @PutMapping("/update/{id}")
    public String updateEmployee(
            @RequestBody Employee e,
            @PathVariable Integer id) {

        return service.updateEmployee(e, id);
    }

    @GetMapping("/getSingle")
    public Employee getSingle(
            @RequestParam Integer id) {

        return service.getSingleEmployee(id);
    }


    @GetMapping("/getAll")
    public List<Employee> getAll() {

        return service.getAll();
    }

    @GetMapping("/active")
    public List<Employee> getActiveEmployees() {

        return service.getActiveEmployees();
    }


    @GetMapping("/inactive")
    public List<Employee> getInactiveEmployees() {

        return service.getInactiveEmployees();
    }
}