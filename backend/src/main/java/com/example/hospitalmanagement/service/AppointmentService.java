package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.model.Appointment;
import com.example.hospitalmanagement.repository.AppointmentRepository;
import org.springframework.stereotype.Service;    //Marks this class as a Spring Service, which means it contains business logic.

import java.util.List;         //Allows us to return a list of appointments.
import java.util.Optional;     //Allows us to return an optional appointment.

@Service                      //Tells Spring that this is a service class, so it should be managed as a Spring Bean.
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;      //variable to access the database.  //final means it cant be changed.

    // Constructor-based Dependency Injection                       // constructor that injects AppointmentRepository into AppointmentService.
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {                 //Calls findAll() from AppointmentRepository, which retrieves all appointments from the database in form of a list
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {      //Calls findById() from AppointmentRepository, which retrieves an appointment by its ID from the database.
        return appointmentRepository.findById(id);                  //Optional is a container object that may or may not contain a non-null value.
    }

    public Appointment saveAppointment(Appointment appointment) {   //Calls save() from AppointmentRepository, which saves an appointment to the database.
        return appointmentRepository.save(appointment);             
    }

    public void deleteAppointment(Long id) {                        //Calls deleteById() from AppointmentRepository, which deletes an appointment by its ID from the database.
        appointmentRepository.deleteById(id);
    }

    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatient_Id(patientId);
    }
}