package com.EMS.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.EMS.entity.Employee;

@Repository
public class EmployeeDao {

    @Autowired
    private SessionFactory factory;


    public String addEmployee(Employee e) {

        Transaction tr = null;

        try (Session ss = factory.openSession()) {

            tr = ss.beginTransaction();

            // New employee is Active by default
            if (e.getStatus() == null) {
                e.setStatus(1);
            }

            ss.persist(e);

            tr.commit();

            return "Employee Added Successfully!";

        } catch (Exception ex) {

            if (tr != null) {
                tr.rollback();
            }

            ex.printStackTrace();

            return "Employee Not Added!";
        }
    }


    // TOGGLE EMPLOYEE STATUS
    // 1 = ACTIVE
    // 0 = INACTIVE

    public String toggleEmployeeStatus(Integer id) {

        Transaction tr = null;

        try (Session ss = factory.openSession()) {

            tr = ss.beginTransaction();

            Employee employee = ss.get(Employee.class, id);

            // Employee not found
            if (employee == null) {

                tr.rollback();

                return "Employee Not Found!";
            }

            // ACTIVE -> INACTIVE
            if (employee.getStatus() != null
                    && employee.getStatus() == 1) {

                employee.setStatus(0);

                tr.commit();

                return "Employee Deactivated Successfully!";

            }

            // INACTIVE -> ACTIVE
            else {

                employee.setStatus(1);

                tr.commit();

                return "Employee Activated Successfully!";
            }

        } catch (Exception ex) {

            if (tr != null) {
                tr.rollback();
            }

            ex.printStackTrace();

            return "Unable to Change Employee Status!";
        }
    }


    // UPDATE EMPLOYEE

    public String updateEmployee(Employee e, Integer id) {

        Transaction tr = null;

        try (Session ss = factory.openSession()) {

            tr = ss.beginTransaction();

            Employee employee = ss.get(Employee.class, id);

            if (employee == null) {

                tr.rollback();

                return "Employee Not Found!";
            }

            // Update only employee details
            employee.setName(e.getName());
            employee.setDepartment(e.getDepartment());
            employee.setSalary(e.getSalary());

           

            tr.commit();

            return "Employee Updated Successfully!";

        } catch (Exception ex) {

            if (tr != null) {
                tr.rollback();
            }

            ex.printStackTrace();

            return "Employee Update Failed!";
        }
    }



    public Employee getSingleEmployee(Integer id) {

        try (Session ss = factory.openSession()) {

            return ss.get(Employee.class, id);
        }
    }


    public List<Employee> getAll() {

        try (Session ss = factory.openSession()) {

            String hql = "FROM Employee ORDER BY id DESC";

            Query<Employee> query =
                    ss.createQuery(hql, Employee.class);

            return query.getResultList();
        }
    }

    public List<Employee> getActiveEmployees() {

        try (Session ss = factory.openSession()) {

            String hql =
                    "FROM Employee WHERE status = 1 ORDER BY id DESC";

            Query<Employee> query =
                    ss.createQuery(hql, Employee.class);

            return query.getResultList();
        }
    }


    public List<Employee> getInactiveEmployees() {

        try (Session ss = factory.openSession()) {

            String hql =
                    "FROM Employee WHERE status = 0 ORDER BY id DESC";

            Query<Employee> query =
                    ss.createQuery(hql, Employee.class);

            return query.getResultList();
        }
    }
}