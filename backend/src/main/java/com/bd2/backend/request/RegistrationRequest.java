package com.bd2.backend.request;

public class RegistrationRequest {

    private String username;

    private String email;

    private String password;

    private String name;

    private String lastName;

    private String role;

    private Boolean active;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }


    public String getRole() {
        return role;
    }

    public Boolean getActive() {
        return active;
    }

}
