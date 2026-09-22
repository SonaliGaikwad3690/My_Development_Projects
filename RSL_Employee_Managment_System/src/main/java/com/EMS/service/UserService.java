package com.EMS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EMS.entity.User;
import com.EMS.dao.UserDao;

@Service
public class UserService {

    @Autowired
    private UserDao userRepository;


    // =====================================================
    // REGISTER
    // =====================================================

    public String registerUser(User user) {

        if (userRepository.existsByUsername(
                user.getUsername())) {

            return "Username already exists";
        }

        userRepository.save(user);

        return "User registered successfully";
    }


    // =====================================================
    // LOGIN
    // =====================================================

    public String loginUser(
            String username,
            String password) {

        Optional<User> user =
                userRepository.findByUsername(username);


        if (user.isPresent()) {

            if (user.get()
                    .getPassword()
                    .equals(password)) {

                return "Login successful";
            }

            return "Invalid password";
        }


        return "Username not found";
    }


    // =====================================================
    // GET PROFILE
    // =====================================================

    public User getProfile(String username) {

        Optional<User> user =
                userRepository.findByUsername(username);

        return user.orElse(null);
    }


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    public String updateProfile(
            String oldUsername,
            User updatedUser) {


        // Find existing user
        Optional<User> optionalUser =
                userRepository.findByUsername(
                        oldUsername
                );


        // User not found
        if (optionalUser.isEmpty()) {

            return "User not found";
        }


        // Existing user
        User existingUser =
                optionalUser.get();


        // =================================================
        // CHECK USERNAME CHANGE
        // =================================================

        String newUsername =
                updatedUser.getUsername();


        if (newUsername == null ||
                newUsername.trim().isEmpty()) {

            return "Username cannot be empty";
        }


        if (!oldUsername.equals(newUsername)) {

            // Check whether new username already exists

            if (userRepository.existsByUsername(
                    newUsername)) {

                return "Username already exists";
            }
        }


        // =================================================
        // UPDATE USERNAME
        // =================================================

        existingUser.setUsername(
                newUsername
        );


        // =================================================
        // UPDATE PASSWORD
        // =================================================

        String newPassword =
                updatedUser.getPassword();


        if (newPassword == null ||
                newPassword.trim().isEmpty()) {

            return "Password cannot be empty";
        }


        existingUser.setPassword(
                newPassword
        );


        // =================================================
        // SAVE UPDATED USER
        // =================================================

        userRepository.save(
                existingUser
        );


        return "Profile updated successfully";
    }
}