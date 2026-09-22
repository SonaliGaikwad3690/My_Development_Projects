package com.EMS.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EMS.dao.EmployeeDao;
import com.EMS.dao.HolidayDao;
import com.EMS.entity.Employee;
import com.EMS.entity.Holiday;

import jakarta.transaction.Transactional;

@Service
public class HolidayService {

@Autowired
private HolidayDao holidayDao;

@Autowired
private EmployeeDao employeeDao;

@Transactional
public Holiday addHoliday(Holiday holiday) {

    if (holiday == null) {
        throw new RuntimeException("Holiday data is required");
    }

    if (holiday.getName() == null ||
            holiday.getName().trim().isEmpty()) {
        throw new RuntimeException("Holiday name is required");
    }

    if (holiday.getType() == null ||
            holiday.getType().trim().isEmpty()) {
        throw new RuntimeException("Holiday type is required");
    }

    if (holiday.getDuration() == null) {
        throw new RuntimeException("Holiday duration is required");
    }

    if (holiday.getEmployees() == null ||
            holiday.getEmployees().isEmpty()) {

        throw new RuntimeException(
                "Please select at least one employee"
        );
    }

    Set<Employee> employees = new HashSet<>();

    for (Employee selectedEmployee : holiday.getEmployees()) {

        if (selectedEmployee == null ||
                selectedEmployee.getId() == null) {

            throw new RuntimeException(
                    "Employee ID is required"
            );
        }

        Employee employee =
                employeeDao.getSingleEmployee(
                        selectedEmployee.getId()
                );

        if (employee == null) {
            throw new RuntimeException(
                    "Employee not found with id: "
                            + selectedEmployee.getId()
            );
        }

        employees.add(employee);
    }

    holiday.setEmployees(employees);

    if (holiday.getStatus() == null) {
        holiday.setStatus(1);
    }

    validateStatus(holiday.getStatus());

    return holidayDao.save(holiday);
}

@Transactional
public List<Holiday> getAllHolidays() {

    List<Holiday> holidays = holidayDao.findAll();

    holidays.forEach(holiday ->
            holiday.getEmployees().size()
    );

    return holidays;
}

@Transactional
public List<Holiday> getActiveHolidays() {

    List<Holiday> holidays =
            holidayDao.findByStatus(1);

    holidays.forEach(holiday ->
            holiday.getEmployees().size()
    );

    return holidays;
}

@Transactional
public List<Holiday> getInactiveHolidays() {

    List<Holiday> holidays =
            holidayDao.findByStatus(0);

    holidays.forEach(holiday ->
            holiday.getEmployees().size()
    );

    return holidays;
}

@Transactional
public Holiday getHolidayById(Long id) {

    Holiday holiday =
            holidayDao.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Holiday not found with id: "
                                            + id
                            )
                    );

    holiday.getEmployees().size();

    return holiday;
}

@Transactional
public Holiday updateHoliday(
        Long id,
        Holiday updatedHoliday) {

    if (updatedHoliday == null) {
        throw new RuntimeException(
                "Holiday data is required"
        );
    }

    Holiday holiday = getHolidayById(id);

    if (updatedHoliday.getName() == null ||
            updatedHoliday.getName().trim().isEmpty()) {

        throw new RuntimeException(
                "Holiday name is required"
        );
    }

    if (updatedHoliday.getType() == null ||
            updatedHoliday.getType().trim().isEmpty()) {

        throw new RuntimeException(
                "Holiday type is required"
        );
    }

    if (updatedHoliday.getDuration() == null) {
        throw new RuntimeException(
                "Holiday duration is required"
        );
    }

    holiday.setName(
            updatedHoliday.getName().trim()
    );

    holiday.setType(
            updatedHoliday.getType().trim()
    );

    holiday.setDuration(
            updatedHoliday.getDuration()
    );

    holiday.setDescription(
            updatedHoliday.getDescription()
    );

    if (updatedHoliday.getEmployees() == null ||
            updatedHoliday.getEmployees().isEmpty()) {

        throw new RuntimeException(
                "Please select at least one employee"
        );
    }

    Set<Employee> employees =
            new HashSet<>();

    for (Employee selectedEmployee :
            updatedHoliday.getEmployees()) {

        if (selectedEmployee == null ||
                selectedEmployee.getId() == null) {

            throw new RuntimeException(
                    "Employee ID is required"
            );
        }

        Employee employee =
                employeeDao.getSingleEmployee(
                        selectedEmployee.getId()
                );

        if (employee == null) {
            throw new RuntimeException(
                    "Employee not found with id: "
                            + selectedEmployee.getId()
            );
        }

        employees.add(employee);
    }

    holiday.setEmployees(employees);

    if (updatedHoliday.getStatus() != null) {

        validateStatus(
                updatedHoliday.getStatus()
        );

        holiday.setStatus(
                updatedHoliday.getStatus()
        );
    }

    return holidayDao.save(holiday);
}

@Transactional
public Holiday changeStatus(
        Long id,
        Integer status) {

    validateStatus(status);

    Holiday holiday =
            getHolidayById(id);

    holiday.setStatus(status);

    return holidayDao.save(holiday);
}

@Transactional
public void deleteHoliday(Long id) {

    Holiday holiday =
            getHolidayById(id);

    holidayDao.delete(holiday);
}

private void validateStatus(Integer status) {

    if (status == null) {
        throw new RuntimeException(
                "Status is required"
        );
    }

    if (status != 0 && status != 1) {

        throw new RuntimeException(
                "Invalid status. Use 1 for Active and 0 for Inactive"
        );
    }
}


}
