package com.eventvision.model;


import com.eventvision.enums.AlbumProcessingStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;



@Entity
@Table(name = "events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String password;
    private String ownerName;

    @Enumerated(EnumType.STRING)
    private AlbumProcessingStatus processingStatus;

    private int totalPhotos;
    private int processedPhotos;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "drive_id")
    private Drive drive;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false,foreignKey = @ForeignKey(name = "fk_event_user"))
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    private List<Photo> photos = new ArrayList<>();

}
