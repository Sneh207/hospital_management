package com.example.hospitalmanagement.controller;   //DEFINES THE PACKAGE IN THE CLASS

import com.example.hospitalmanagement.model.Appointment;   //REPRESENTS THE APPOINTMENT AS DATABASE TABLE
import com.example.hospitalmanagement.service.AppointmentService;    //CONTAINS THE LOGIC FOR HANDLING APPOINTMENTS
import org.springframework.beans.factory.annotation.Autowired;    //USE IN MAPPING HTTP REQUESTS (GET, POST, PUT, DELETE) TO JAVA METHODS
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;      //USED FOR HANDLING COLLECTIONS
import java.util.Optional;      //USE FOR OPTIONAL VALUES TO USERS (DROPDOWN CASE)
import java.util.Map;

@RestController      //Marks the class as a REST API controller
@RequestMapping("/appointments")     //Defines the base URL for all HTTP requests
@CrossOrigin(origins = "*")
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

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getAppointmentsByPatient(@PathVariable Long patientId) {
        try {
            List<Appointment> appointments = appointmentService.getAppointmentsByPatientId(patientId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error fetching appointments: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String newStatus = statusUpdate.get("status");
            if (newStatus == null) {
                return ResponseEntity.badRequest().body("Status is required");
            }

            Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
            if (!appointment.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            Appointment updatedAppointment = appointment.get();
            try {
                updatedAppointment.setStatus(Appointment.AppointmentStatus.valueOf(newStatus.toUpperCase()));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status value. Valid values are: SCHEDULED, ACCEPTED, REJECTED, COMPLETED, CANCELLED");
            }

            updatedAppointment = appointmentService.saveAppointment(updatedAppointment);
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating appointment status: " + e.getMessage());
        }
    }
}
