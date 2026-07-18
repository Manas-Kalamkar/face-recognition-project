package com.eventvision.repository;

import com.eventvision.model.Face;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaceRepository extends JpaRepository<Face,String> {
    List<Face> findByPhoto_Event_Id(String eventId);
}
