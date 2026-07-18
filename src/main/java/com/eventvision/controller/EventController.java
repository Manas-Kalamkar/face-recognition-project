package com.eventvision.controller;

import com.eventvision.DTO.EventDTO;
import com.eventvision.DTO.EventResponse;
import com.eventvision.model.Event;
import com.eventvision.repository.EventRepository;
import com.eventvision.service.AlbumProcessingService;
import com.eventvision.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;
    private final EventRepository eventRepository;

    private final AlbumProcessingService albumProcessingService;

//    adding/creating new event(role based access only for EVENT_OWNER)
    @PostMapping("/create")
    public ResponseEntity<EventResponse> createEvent(@RequestBody EventDTO request){
        return ResponseEntity.ok(eventService.createEvent(request));
    }


//    deleting event(role based access only for EVENT_OWNER)
    @DeleteMapping("delete/{id}")
    public ResponseEntity<EventResponse> deleteEvent(@PathVariable String id){
        return new ResponseEntity<>(eventService.deleteEvent(id), HttpStatus.OK);
    }

//    search event by ownerName(public api)
    @GetMapping("/search")
    public ResponseEntity<EventResponse> searchByOwnerName(@RequestParam(name = "ownerName") String ownerName){
        return new ResponseEntity<>(eventService.searchByOwnerName(ownerName),HttpStatus.FOUND);
    }

//    get all events by emailID
@GetMapping("/my-events")
public ResponseEntity<List<Event>> getMyEvents() {
    String email = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();

    return ResponseEntity.ok(eventService.getEventsByEmail(email));
}


//    album processing

    @PostMapping("/process-album/{eventId}")
    public ResponseEntity<String> processAlbum(@PathVariable String eventId) throws Exception {
        albumProcessingService.processAlbum(eventId);
        return ResponseEntity.accepted().body("Album processing Completed");
    }

    @GetMapping("/album-status/{eventId}")
    public ResponseEntity<?> getAlbumStatus(@PathVariable String eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

//        return ResponseEntity.ok(
//                Map.of(
//                        "status", event.getProcessingStatus(),
//                        "processed", event.getProcessedPhotos(),
//                        "total", event.getTotalPhotos()
//                )
//        );
        // ✅ CORRECT
        return ResponseEntity.ok(
                Map.of(
                        "status", event.getProcessingStatus() != null ? event.getProcessingStatus().name() : "PENDING",
                        "processed", event.getProcessedPhotos(),
                        "total", event.getTotalPhotos()
                )
        );
    }



    @GetMapping("/getEvent/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        return ResponseEntity.ok(event);
    }

}
