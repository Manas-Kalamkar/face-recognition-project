package com.eventvision.service;

import com.eventvision.DTO.UserDTO;
import com.eventvision.DTO.UserResponse;
import com.eventvision.model.User;
import com.eventvision.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse createUser(UserDTO userDTO) {
        User user = User.builder()
                .email(userDTO.getEmail())
                .name(userDTO.getName())
                .role(userDTO.getRole())
                .build();
        userRepository.save(user);


        return UserResponse.builder()
                .email(user.getEmail())
                .id(user.getId())
                .name(user.getName())
                .role(user.getRole())
                .build();
    }
}
