package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Doctor;
import com.example.hospitalmanagement.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;         // import the annotation
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired                                                         // inject the repository dependency
    private DoctorRepository doctorRepository;                         // create an instance of the repository

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
