package com.eventvision.service;

import com.eventvision.DTO.EventDTO;
import com.eventvision.DTO.EventResponse;
import com.eventvision.model.Event;
import com.eventvision.model.User;
import com.eventvision.repository.EventRepository;
import com.eventvision.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private EventService eventService;

    @Test
    void createEvent_shouldCreateEvent() {

        User user = User.builder()
                .id("u1")
                .name("Hrishi")
                .build();

        when(userRepository.findById("u1"))
                .thenReturn(Optional.of(user));

        EventDTO dto = new EventDTO();

        dto.setUserId("u1");
        dto.setName("College Fest");
        dto.setOwnerName("Hrishi");
        dto.setPassword("123");

        dto.setDriveLink(
                "https://drive.google.com/drive/folders/ABC123"
        );

        EventResponse response =
                eventService.createEvent(dto);

        assertNotNull(response);

        assertEquals(
                "College Fest",
                response.getName()
        );

        assertEquals(
                "Hrishi",
                response.getOwnerName()
        );

        assertEquals(
                "u1",
                response.getUserId()
        );

        verify(eventRepository)
                .save(any(Event.class));

    }

    @Test
    void deleteEvent_shouldDeleteEvent() {

        User user = User.builder()
                .id("u1")
                .build();

        Event event = Event.builder()
                .id("e1")
                .name("College Fest")
                .ownerName("Hrishi")
                .user(user)
                .build();

        when(eventRepository.findById("e1"))
                .thenReturn(Optional.of(event));

        EventResponse response =
                eventService.deleteEvent("e1");

        assertNotNull(response);

        assertEquals(
                "e1",
                response.getId()
        );

        assertEquals(
                "u1",
                response.getUserId()
        );

        verify(eventRepository)
                .delete(event);

    }

    @Test
    void deleteEvent_shouldThrowExceptionWhenEventNotFound() {

        when(eventRepository.findById("e1"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(

                RuntimeException.class,

                () -> eventService.deleteEvent("e1")

        );

        assertEquals(
                "Event not found!!",
                ex.getMessage()
        );

    }

    @Test
    void searchByOwnerName_shouldReturnEvent() {

        User user = User.builder()
                .id("u1")
                .build();

        Event event = Event.builder()
                .id("e1")
                .name("College Fest")
                .ownerName("Hrishi")
                .user(user)
                .build();

        when(eventRepository
                .searchByOwnerNameIgnoreCase("Hrishi"))

                .thenReturn(Optional.of(event));

        EventResponse response =

                eventService.searchByOwnerName(
                        "Hrishi"
                );

        assertNotNull(response);

        assertEquals(
                "College Fest",
                response.getName()
        );

        assertEquals(
                "Hrishi",
                response.getOwnerName()
        );

    }

    @Test
    void searchByOwnerName_shouldThrowException() {

        when(eventRepository
                .searchByOwnerNameIgnoreCase("Hrishi"))

                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(

                RuntimeException.class,

                () -> eventService
                        .searchByOwnerName(
                                "Hrishi"
                        )

        );

        assertEquals(
                "Event not found!",
                ex.getMessage()
        );

    }

    @Test
    void getEventsByEmail_shouldReturnEvents() {

        User user = User.builder()
                .id("u1")
                .email("abc@gmail.com")
                .build();

        Event event = Event.builder()
                .id("e1")
                .user(user)
                .build();

        List<Event> events =
                List.of(event);

        when(eventRepository
                .findByUserEmail(
                        "abc@gmail.com"
                ))

                .thenReturn(events);

        List<Event> result =

                eventService.getEventsByEmail(
                        "abc@gmail.com"
                );

        assertEquals(
                1,
                result.size()
        );

        verify(eventRepository)

                .findByUserEmail(

                        "abc@gmail.com"

                );

    }

}