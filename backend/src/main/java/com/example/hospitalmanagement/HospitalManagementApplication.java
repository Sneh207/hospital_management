package com.example.hospitalmanagement;

import org.springframework.boot.SpringApplication;                         // import the required classes
import org.springframework.boot.autoconfigure.SpringBootApplication;       

@SpringBootApplication  //This enables component scanning and auto-configuration
public class HospitalManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementApplication.class, args);     // Run the application
    }
}
