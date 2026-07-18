package com.eventvision.controller;

import com.eventvision.model.Photo;
import com.eventvision.repository.PhotoRepository;
import com.eventvision.service.DriveImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/photos")
public class PhotoController {

    private final PhotoRepository photoRepository;
    private final DriveImageService driveImageService;

    @GetMapping("/{photoId}")
    public ResponseEntity<byte[]> getPhoto(@PathVariable String photoId)
            throws Exception {

        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new RuntimeException("Photo not found"));

        byte[] imageBytes =
                driveImageService.downloadImage(photo.getDriveFileId());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + photo.getFilename() + "\"")
                .contentType(MediaType.IMAGE_JPEG) // or detect dynamically
                .body(imageBytes);
    }
}
