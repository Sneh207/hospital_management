// package com.example.hospitalmanagement.model;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "doctors")
// public class Doctor {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String name;

//     @Column(nullable = false)
//     private String specialization;

//     @Column(nullable = false, unique = true)
//     private String email;

//     @Column(nullable = false)
//     private String password;


//     public Doctor() {}

//     public Doctor(String name, String specialization) {
//         this.name = name;
//         this.specialization = specialization;
//     }

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }
//     public String getSpecialization() { return specialization; }
//     public void setSpecialization(String specialization) { this.specialization = specialization; }
// }

package com.example.hospitalmanagement.model;

import jakarta.persistence.*;

@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    // --- Constructors ---
    public Doctor() {
    }

    public Doctor(String name, String specialization, String email, String password) {
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.password = password;
    }

    public Doctor(Long id, String name, String specialization, String email, String password) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.password = password;
    }

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
