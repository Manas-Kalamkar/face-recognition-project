package com.eventvision.service;

import com.eventvision.DTO.DriveImage;
import com.eventvision.DTO.MlFaceResponse;
import com.eventvision.enums.AlbumProcessingStatus;
import com.eventvision.model.Event;
import com.eventvision.model.Face;
import com.eventvision.model.Photo;
import com.eventvision.repository.EventRepository;
import com.eventvision.repository.FaceRepository;
import com.eventvision.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumProcessingService {

    private final EventRepository eventRepository;
    private final PhotoRepository photoRepository;
    private final FaceRepository faceRepository;

    private final DriveImageService driveImageService;
    private final MlClient mlClientService;

    @Async
    public void processAlbum(String eventId) throws Exception {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found!"));

        try {
            event.setProcessingStatus(AlbumProcessingStatus.PROCESSING);

            String folderId = event.getDrive().getFolderId();
            List<DriveImage> images = driveImageService.listImages(folderId);

            event.setTotalPhotos(images.size());
            event.setProcessedPhotos(0);
            eventRepository.save(event);

            for (DriveImage img : images) {

                byte[] imageBytes = driveImageService.downloadImage(img.getFileId());

                Photo photo = Photo.builder()
                        .driveFileId(img.getFileId())
                        .filename(img.getName())
                        .mimeType(img.getMimeType())
                        .event(event)
                        .build();

                photoRepository.save(photo);

                MlFaceResponse response = mlClientService.processImage(imageBytes);

                response.getFaces().forEach(f -> {
                    Face face = Face.builder()
                            .embedding(f.getEmbeddingsAsJson())
                            .x(f.getX())
                            .y(f.getY())
                            .width(f.getW())
                            .height(f.getH())
                            .photo(photo)
                            .build();

                    faceRepository.save(face);
                });

                // 🔥 progress update
                event.setProcessedPhotos(event.getProcessedPhotos() + 1);
                eventRepository.save(event);
            }

            event.setProcessingStatus(AlbumProcessingStatus.COMPLETED);
            eventRepository.save(event);

        } catch (Exception e) {
            event.setProcessingStatus(AlbumProcessingStatus.FAILED);
            eventRepository.save(event);
            throw e;
        }
    }

}
