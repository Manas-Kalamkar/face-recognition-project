package com.eventvision.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class MlFaceResponse {
    private int facesDetected;
    private List<MlFace> faces;
}
