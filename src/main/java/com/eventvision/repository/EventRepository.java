package com.eventvision.repository;

import com.eventvision.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
public interface EventRepository extends JpaRepository<Event,String> {
    Optional<Event> searchByOwnerNameIgnoreCase(String name);
    List<Event> findByUserEmail(String email);

}
