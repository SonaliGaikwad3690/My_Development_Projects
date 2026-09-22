package com.EMS.entity;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String department;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(columnDefinition = "TINYINT")
    private Integer status;

    @JsonIgnore
    @ManyToMany(mappedBy = "employees")
    private Set<Holiday> holidays = new HashSet<>();

    public Employee() {
        super();
    }

    public Employee(String name, String department,
                    BigDecimal salary, Integer status) {

        this.name = name;
        this.department = department;
        this.salary = salary;
        this.status = status;
    }

    public Employee(Integer id, String name, String department,
                    BigDecimal salary, Integer status) {

        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Set<Holiday> getHolidays() {
        return holidays;
    }

    public void setHolidays(Set<Holiday> holidays) {
        this.holidays = holidays;
    }

    @Override
    public String toString() {

        return "Employee [id=" + id
                + ", name=" + name
                + ", department=" + department
                + ", salary=" + salary
                + ", status=" + status + "]";
    }
}