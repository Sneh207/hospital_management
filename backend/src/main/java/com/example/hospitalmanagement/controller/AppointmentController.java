package com.example.hospitalmanagement.controller;   //DEFINES THE PACKAGE IN THE CLASS

import com.example.hospitalmanagement.model.Appointment;   //REPRESENTS THE APPOINTMENT AS DATABASE TABLE
import com.example.hospitalmanagement.service.AppointmentService;    //CONTAINS THE LOGIC FOR HANDLING APPOINTMENTS
import org.springframework.beans.factory.annotation.Autowired;    //USE IN MAPPING HTTP REQUESTS (GET, POST, PUT, DELETE) TO JAVA METHODS
import org.springframework.web.bind.annotation.*;

import java.util.List;      //USED FOR HANDLING COLLECTIONS
import java.util.Optional;      //USE FOR OPTIONAL VALUES TO USERS (DROPDOWN CASE)

@RestController      //Marks the class as a REST API controller
@RequestMapping("/appointments")     //Defines the base URL for all HTTP requests
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PostMapping
    public Appointment addAppointment(@RequestBody Appointment appointment) {           //Maps the HTTP POST request to the addAppointment method
        return appointmentService.saveAppointment(appointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
    }
}
