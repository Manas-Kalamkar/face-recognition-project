package com.eventvision.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DriveImage {
    private String fileId;
    private String name;
    private String mimeType;
}
