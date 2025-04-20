// package com.example.hospitalmanagement.controller;

// import com.example.hospitalmanagement.model.Patient;
// import com.example.hospitalmanagement.service.PatientService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/patients")
// public class PatientController {
    
//     @Autowired
//     private PatientService patientService;

//     @GetMapping
//     public List<Patient> getAllPatients() {
//         return patientService.getAllPatients();
//     }

//     @GetMapping("/{id}")
//     public Optional<Patient> getPatientById(@PathVariable Long id) {
//         return patientService.getPatientById(id);
//     }

//     @PostMapping
//     public Patient addPatient(@RequestBody Patient patient) {
//         return patientService.savePatient(patient);
//     }

//     @DeleteMapping("/{id}")
//     public void deletePatient(@PathVariable Long id) {
//         patientService.deletePatient(id);
//     }

//      @PostMapping("/login")
//     public ResponseEntity<?> loginPatient(@RequestBody Patient loginData) {
//         Optional<Patient> patient = patientService.login(loginData.getEmail(), loginData.getPassword());

//         if (patient.isPresent()) {
//             return ResponseEntity.ok(patient.get());
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//         }
//     }
// }



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
            // Check if email already exists
            if (patientService.findByEmail(patient.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
            }
            
            Patient savedPatient = patientService.savePatient(patient);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating patient: " + e.getMessage());
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
