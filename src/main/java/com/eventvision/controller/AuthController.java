package com.eventvision.controller;


import com.eventvision.DTO.LoginRequest;
import com.eventvision.DTO.LoginResponse;
import com.eventvision.DTO.RegisterRequest;
import com.eventvision.DTO.UserResponse;
import com.eventvision.model.User;
import com.eventvision.security.JwtUtils;
import com.eventvision.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;

//    REGISTER ENDPOINT
    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest registerRequest){
        return authService.register(registerRequest);
    }



//    LOGIN ENDPOINT
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {

//        find user with email
        User user = authService.findUserByEmail(loginRequest.getEmail());

//        validate password
        authService.validatePassword(loginRequest.getPassword(),user.getPassword());


//        generate token
        String jwt = jwtUtils.generateToken(loginRequest.getEmail(),user.getRole());

        return ResponseEntity.ok().body(new LoginResponse(jwt,authService.mapToUserResponse(user)));
    }


    @GetMapping("/hello")
    public String hello(){
        return "Hello!";
    }
}
