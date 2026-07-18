package com.eventvision.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {

    private String userId;
    private String name;
    private String password;
    private String ownerName;
    private String driveLink;

}