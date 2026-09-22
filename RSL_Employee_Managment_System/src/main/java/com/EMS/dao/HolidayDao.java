package com.EMS.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EMS.entity.Holiday;

public interface HolidayDao extends JpaRepository<Holiday, Long> {

    List<Holiday> findByStatus(Integer status);
}