package com.example.hospitalmanagement.model;

import jakarta.persistence.*;    //this api is used for relational mapping of objects(java objects to databse tables)

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", referencedColumnName = "id") // Ensures correct FK mapping
    private Doctor doctor; // Change from String to Doctor (relation)

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false) // Maps to the 'patient_id' column in the database
    private Patient patient;

    private String patientName;
    private String appointmentDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }
}
