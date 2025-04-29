package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.model.Appointment;
import com.example.hospitalmanagement.model.Doctor;
import com.example.hospitalmanagement.model.Patient;
import com.example.hospitalmanagement.service.AppointmentService;
import com.example.hospitalmanagement.service.DoctorService;
import com.example.hospitalmanagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public Optional<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PostMapping
    public ResponseEntity<?> addAppointment(@RequestBody Appointment appointment) {
        try {
            // Validate required fields
            if (appointment.getDoctor() == null || appointment.getPatient() == null || 
                appointment.getAppointmentDate() == null) {
                return ResponseEntity.badRequest()
                    .body("Doctor, patient, and appointment date are required");
            }

            // Verify doctor exists and is available
            Optional<Doctor> doctor = doctorService.getDoctorById(appointment.getDoctor().getId());
            if (!doctor.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Doctor not found");
            }
            
            if (!doctor.get().isAvailable()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Doctor is not available for appointments");
            }

            // Verify patient exists
            Optional<Patient> patient = patientService.getPatientById(appointment.getPatient().getId());
            if (!patient.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Patient not found");
            }

            // Create new appointment with minimal required data
            Appointment newAppointment = new Appointment();
            newAppointment.setDoctor(doctor.get());
            newAppointment.setPatient(patient.get());
            newAppointment.setAppointmentDate(appointment.getAppointmentDate());
            newAppointment.setNotes(appointment.getNotes());
            newAppointment.setStatus(Appointment.AppointmentStatus.SCHEDULED);

            Appointment savedAppointment = appointmentService.saveAppointment(newAppointment);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating appointment: " + e.getMessage());
        }
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
                return ResponseEntity.badRequest()
                    .body("Invalid status value. Valid values are: SCHEDULED, ACCEPTED, REJECTED, COMPLETED");
            }

            updatedAppointment = appointmentService.saveAppointment(updatedAppointment);
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating appointment status: " + e.getMessage());
        }
    }
}
