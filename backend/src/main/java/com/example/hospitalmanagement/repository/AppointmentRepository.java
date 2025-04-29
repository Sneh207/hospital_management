package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository                                           //It tells Spring to handle database operations for this interface.
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient_Id(Long patientId); // Fixed method name to use proper JPA naming convention
}    //This interface is used to interact with the database.

//JpaRepository<T, ID> is a Spring Data JPA interface that provides CRUD operations for entities.



