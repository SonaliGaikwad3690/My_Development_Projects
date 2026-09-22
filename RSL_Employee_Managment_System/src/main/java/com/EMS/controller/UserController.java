package com.EMS.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.EMS.entity.User;
import com.EMS.service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {


    @Autowired
    private UserService userService;


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody User user) {

        String result =
                userService.registerUser(user);


        if (result.equals(
                "Username already exists")) {

            return ResponseEntity
                    .badRequest()
                    .body(result);
        }


        return ResponseEntity.ok(result);
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestBody Map<String, String> loginData) {


        String username =
                loginData.get("username");


        String password =
                loginData.get("password");


        String result =
                userService.loginUser(
                        username,
                        password
                );


        if (result.equals(
                "Login successful")) {

            return ResponseEntity.ok(result);
        }


        return ResponseEntity
                .status(401)
                .body(result);
    }


    // =====================================================
    // GET PROFILE
    // =====================================================

    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(
            @PathVariable String username) {


        User user =
                userService.getProfile(username);


        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        return ResponseEntity.ok(user);
    }


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    @PutMapping("/profile/{username}")
    public ResponseEntity<String> updateProfile(
            @PathVariable String username,
            @RequestBody User updatedUser) {


        String result =
                userService.updateProfile(
                        username,
                        updatedUser
                );


        if (result.equals("User not found")) {

            return ResponseEntity
                    .notFound()
                    .build();
        }


        if (result.equals(
                "Username already exists")) {

            return ResponseEntity
                    .badRequest()
                    .body(result);
        }


        return ResponseEntity.ok(result);
    }
}