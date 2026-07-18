package com.eventvision.service;


import com.eventvision.DTO.EventDTO;
import com.eventvision.DTO.EventResponse;
import com.eventvision.model.Drive;
import com.eventvision.model.Event;
import com.eventvision.model.User;
import com.eventvision.repository.EventRepository;
import com.eventvision.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.eventvision.utils.DriveUtils.extractFolderId;


@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

//    CREATE EVENT
    public EventResponse createEvent(EventDTO request) {
        Optional<User> user = userRepository.findById(request.getUserId());

        Drive drive = Drive.builder()
                .driveLink(request.getDriveLink())
                .folderId(extractFolderId(request.getDriveLink()))
                .build();

        Event event = Event.builder()
                .name(request.getName())
                .ownerName(request.getOwnerName())
                .password(request.getPassword())
                .drive(drive)
                .user(user.get())
                .build();
        eventRepository.save(event);

        EventResponse eventResponse = EventResponse.builder()
                .id(event.getId())
                .name(event.getName())
                .ownerName(event.getOwnerName())
                .userId(user.get().getId())
                .folderId(event.getDrive().getFolderId())
                .build();

        return eventResponse;
    }

//    DELETE EVENT
    public EventResponse deleteEvent(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if(event.isEmpty()){
            throw new RuntimeException("Event not found!!");
        }
        EventResponse eventResponse = EventResponse.builder()
                .id(event.get().getId())
                .userId(event.get().getUser().getId())
                .ownerName(event.get().getOwnerName())
                .name(event.get().getName())
                .build();
        eventRepository.delete(event.get());

        return eventResponse;

    }

    private EventResponse mapToEventResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .name(event.getName())
                .ownerName(event.getOwnerName())
                .userId(event.getUser().getId())
                // only include folderId if drive exists
                .folderId(event.getDrive() != null ? event.getDrive().getFolderId() : null)
                .build();
    }


//    SEARCH BY OWNER NAME
    public EventResponse searchByOwnerName(String ownerName) {
        Optional<Event> eventOptional = eventRepository.searchByOwnerNameIgnoreCase(ownerName);
        if(eventOptional.isEmpty()){
            throw new RuntimeException("Event not found!");
        }

        Event event = eventOptional.get();


        return EventResponse.builder()
                .name(event.getName())
                .ownerName(event.getOwnerName())
                .userId(event.getUser().getId())
                .id(event.getId())
                .build();

    }

    public List<Event> getEventsByEmail(String email) {
        return eventRepository.findByUserEmail(email);
    }
}