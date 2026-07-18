package com.eventvision.service;

import com.eventvision.DTO.RegisterRequest;
import com.eventvision.DTO.UserResponse;
import com.eventvision.enums.Role;
import com.eventvision.model.User;
import com.eventvision.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_shouldCreateUser() {

        RegisterRequest request = new RegisterRequest();

        request.setName("Hrishi");
        request.setEmail("hrishi@gmail.com");
        request.setPassword("123456");

        when(passwordEncoder.encode("123456"))
                .thenReturn("encodedPassword");

        User savedUser = User.builder()
                .id("1")
                .name("Hrishi")
                .email("hrishi@gmail.com")
                .password("encodedPassword")
                .role(Role.EVENT_OWNER)
                .build();

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        UserResponse response =
                authService.register(request);

        assertNotNull(response);

        assertEquals(
                "hrishi@gmail.com",
                response.getEmail()
        );

        assertEquals(
                "Hrishi",
                response.getName()
        );

        verify(userRepository)
                .save(any(User.class));
    }


    @Test
    void findUserByEmail_shouldReturnUser() {

        User user = User.builder()
                .id("1")
                .name("Hrishi")
                .email("hrishi@gmail.com")
                .build();

        when(userRepository.findByEmail("hrishi@gmail.com"))
                .thenReturn(Optional.of(user));

        User result =
                authService.findUserByEmail(
                        "hrishi@gmail.com"
                );

        assertNotNull(result);

        assertEquals(
                "hrishi@gmail.com",
                result.getEmail()
        );

        verify(userRepository)
                .findByEmail("hrishi@gmail.com");

    }


    @Test
    void findUserByEmail_shouldThrowException() {

        when(userRepository.findByEmail("abc@gmail.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                UsernameNotFoundException.class,

                () -> authService.findUserByEmail(
                        "abc@gmail.com"
                )
        );

    }

    @Test
    void validatePassword_shouldReturnTrue()
            throws Exception {

        when(passwordEncoder.matches(
                "123456",
                "encodedPassword"
        )).thenReturn(true);

        boolean result =
                authService.validatePassword(
                        "123456",
                        "encodedPassword"
                );

        assertTrue(result);

        verify(passwordEncoder)
                .matches(
                        "123456",
                        "encodedPassword"
                );

    }

    @Test
    void validatePassword_shouldThrowException() {

        when(passwordEncoder.matches(
                "wrongPassword",
                "encodedPassword"
        )).thenReturn(false);

        Exception ex = assertThrows(

                Exception.class,

                () -> authService.validatePassword(

                        "wrongPassword",

                        "encodedPassword"

                )

        );

        assertEquals(

                "Incorrect password",

                ex.getMessage()

        );

    }


    @Test
    void mapToUserResponse_shouldMapFields() {

        User user = User.builder()
                .id("1")
                .name("Hrishi")
                .email("hrishi@gmail.com")
                .role(Role.EVENT_OWNER)
                .build();

        UserResponse response =
                authService.mapToUserResponse(user);

        assertNotNull(response);

        assertEquals(
                "1",
                response.getId()
        );

        assertEquals(
                "Hrishi",
                response.getName()
        );

        assertEquals(
                "hrishi@gmail.com",
                response.getEmail()
        );

        assertEquals(
                Role.EVENT_OWNER,
                response.getRole()
        );

    }



}