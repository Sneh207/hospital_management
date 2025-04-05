package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository                                           //It tells Spring to handle database operations for this interface.
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {}    //This interface is used to interact with the database.

//JpaRepository<T, ID> is a Spring Data JPA interface that provides CRUD operations for entities.



