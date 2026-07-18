package com.eventvision.service;

import com.eventvision.DTO.RegisterRequest;
import com.eventvision.DTO.UserResponse;
import com.eventvision.enums.Role;
import com.eventvision.model.User;
import com.eventvision.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse register(RegisterRequest registerRequest) {
        Role role = Role.GUEST;

        User user = User.builder()
                .email(registerRequest.getEmail())
                .name(registerRequest.getName())
                .role(Role.EVENT_OWNER)
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        return mapToUserResponse(savedUser);
    }

    public UserResponse mapToUserResponse(User user){

        return UserResponse.builder()
                .name(user.getName())
                .role(user.getRole())
                .email(user.getEmail())
                .id(user.getId())
                .build();

    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }

    public boolean validatePassword(String rawPassword,String encodedPassword) throws Exception {
        if(!passwordEncoder.matches(rawPassword,encodedPassword)){
            throw new Exception("Incorrect password");
        }

        return true;
    }
}
