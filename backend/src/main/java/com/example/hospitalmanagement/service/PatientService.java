// package com.example.hospitalmanagement.service;

// import com.example.hospitalmanagement.model.Patient;
// import com.example.hospitalmanagement.repository.PatientRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import java.util.List;
// import java.util.Optional;

// @Service
// public class PatientService {

//     @Autowired     // inject the repository dependency
//     private PatientRepository patientRepository;

//     public List<Patient> getAllPatients() {
//         return patientRepository.findAll();
//     }

//     public Optional<Patient> getPatientById(Long id) {
//         return patientRepository.findById(id);
//     }

//     public Patient savePatient(Patient patient) {
//         return patientRepository.save(patient);
//     }

//     public void deletePatient(Long id) {
//         patientRepository.deleteById(id);
//     }

//     public Optional<Patient> login(String email, String password) {
//         return patientRepository.findByEmailAndPassword(email, password);
//     }
    
// }

package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Patient;
import com.example.hospitalmanagement.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient savePatient(Patient patient) {
        // In a real application, you would hash the password here
        // For example: patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public Optional<Patient> login(String email, String password) {
        // In a real application, you would verify hashed passwords
        return patientRepository.findByEmailAndPassword(email, password);
    }
    
    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }
}