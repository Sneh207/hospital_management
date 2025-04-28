package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.model.Patient;
import com.example.hospitalmanagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "*") // For development - restrict in production
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found");
        }
    }

    @PostMapping
    public ResponseEntity<?> addPatient(@RequestBody Patient patient) {
        try {
            // Validate required fields
            if (patient.getName() == null || patient.getName().trim().isEmpty() ||
                patient.getEmail() == null || patient.getEmail().trim().isEmpty() ||
                patient.getPassword() == null || patient.getPassword().trim().isEmpty() ||
                patient.getGender() == null || patient.getGender().trim().isEmpty() ||
                patient.getContact() == null || patient.getContact().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("All fields are required");
            }

            // Check if email already exists
            if (patientService.findByEmail(patient.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Email already registered");
            }
            
            // Validate age
            if (patient.getAge() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please enter a valid age");
            }

            // Validate contact number (assuming 10 digits)
            if (!patient.getContact().matches("\\d{10}")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Contact number must be 10 digits");
            }
            
            Patient savedPatient = patientService.savePatient(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error during registration: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Long id) {
        try {
            patientService.deletePatient(id);
            return ResponseEntity.ok("Patient deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting patient: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginPatient(@RequestBody Patient loginData) {
        Optional<Patient> patient = patientService.login(loginData.getEmail(), loginData.getPassword());

        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
