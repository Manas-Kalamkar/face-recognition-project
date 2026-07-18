package com.eventvision.controller;

import com.eventvision.DTO.UserDTO;
import com.eventvision.DTO.UserResponse;
import com.eventvision.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/user/create")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserDTO user){
        return ResponseEntity.ok(userService.createUser(user));
    }
}
