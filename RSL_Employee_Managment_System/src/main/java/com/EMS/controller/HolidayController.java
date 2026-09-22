package com.EMS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EMS.entity.Holiday;
import com.EMS.service.HolidayService;

@RestController
@RequestMapping("/api/holidays")
@CrossOrigin("*")
public class HolidayController {


@Autowired
private HolidayService holidayService;

@PostMapping
public ResponseEntity<Holiday> addHoliday(
        @RequestBody Holiday holiday) {

    Holiday savedHoliday =
            holidayService.addHoliday(holiday);

    return ResponseEntity.ok(savedHoliday);
}

@GetMapping
public ResponseEntity<List<Holiday>> getAllHolidays() {

    return ResponseEntity.ok(
            holidayService.getAllHolidays()
    );
}

@GetMapping("/active")
public ResponseEntity<List<Holiday>> getActiveHolidays() {

    return ResponseEntity.ok(
            holidayService.getActiveHolidays()
    );
}

@GetMapping("/inactive")
public ResponseEntity<List<Holiday>> getInactiveHolidays() {

    return ResponseEntity.ok(
            holidayService.getInactiveHolidays()
    );
}

@GetMapping("/{id}")
public ResponseEntity<Holiday> getHolidayById(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            holidayService.getHolidayById(id)
    );
}

@PutMapping("/{id}")
public ResponseEntity<Holiday> updateHoliday(
        @PathVariable Long id,
        @RequestBody Holiday holiday) {

    return ResponseEntity.ok(
            holidayService.updateHoliday(id, holiday)
    );
}

@PatchMapping("/{id}/status")
public ResponseEntity<Holiday> changeStatus(
        @PathVariable Long id,
        @RequestParam Integer status) {

    return ResponseEntity.ok(
            holidayService.changeStatus(id, status)
    );
}

@DeleteMapping("/{id}")
public ResponseEntity<String> deleteHoliday(
        @PathVariable Long id) {

    holidayService.deleteHoliday(id);

    return ResponseEntity.ok(
            "Holiday deleted successfully"
    );
}


}
