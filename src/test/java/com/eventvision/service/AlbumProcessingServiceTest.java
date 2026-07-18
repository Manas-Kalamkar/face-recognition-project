package com.eventvision.service;

import com.eventvision.DTO.DriveImage;
import com.eventvision.DTO.MlFace;
import com.eventvision.DTO.MlFaceResponse;
import com.eventvision.enums.AlbumProcessingStatus;
import com.eventvision.model.Drive;
import com.eventvision.model.Event;
import com.eventvision.repository.EventRepository;
import com.eventvision.repository.FaceRepository;
import com.eventvision.repository.PhotoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AlbumProcessingServiceTest {

    @Mock
    private EventRepository eventRepository;

    @Mock
    private PhotoRepository photoRepository;

    @Mock
    private FaceRepository faceRepository;

    @Mock
    private DriveImageService driveImageService;

    @Mock
    private MlClient mlClientService;

    @InjectMocks
    private AlbumProcessingService albumProcessingService;


    @Test
    void processAlbum_shouldThrowWhenEventNotFound() {

        when(eventRepository.findById("e1"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(

                RuntimeException.class,

                () -> albumProcessingService.processAlbum("e1")

        );

        assertEquals(

                "Event not found!",

                ex.getMessage()

        );

    }

    @Test
    void processAlbum_shouldCompleteSuccessfully()
            throws Exception {

        Drive drive = Drive.builder()
                .folderId("folder1")
                .build();

        Event event = Event.builder()
                .id("e1")
                .drive(drive)
                .build();



        when(eventRepository.findById("e1"))
                .thenReturn(Optional.of(event));



        DriveImage image = DriveImage.builder()

                .fileId("img1")

                .name("photo.jpg")

                .mimeType("image/jpeg")

                .build();



        when(

                driveImageService.listImages(

                        "folder1"

                )

        )

                .thenReturn(

                        List.of(

                                image

                        )

                );



        when(

                driveImageService.downloadImage(

                        "img1"

                )

        )

                .thenReturn(

                        new byte[]{1,2,3}

                );



        MlFace mlFace = new MlFace();

        mlFace.setEmbedding(

                List.of(

                        1.0,

                        0.0

                )

        );



        mlFace.setBox(

                List.of(

                        0,

                        0,

                        100,

                        100

                )

        );



        MlFaceResponse response =

                new MlFaceResponse(

                        1,

                        List.of(

                                mlFace

                        )

                );



        when(

                mlClientService.processImage(

                        any()

                )

        )

                .thenReturn(

                        response

                );



        albumProcessingService.processAlbum(

                "e1"

        );



        assertEquals(

                AlbumProcessingStatus.COMPLETED,

                event.getProcessingStatus()

        );



        verify(

                photoRepository,

                atLeastOnce()

        )

                .save(

                        any()

                );



        verify(

                faceRepository,

                atLeastOnce()

        )

                .save(

                        any()

                );

    }

    @Test
    void processAlbum_shouldMarkFailedWhenMLFails()
            throws Exception {

        Drive drive =

                Drive.builder()

                        .folderId("folder1")

                        .build();



        Event event =

                Event.builder()

                        .id("e1")

                        .drive(drive)

                        .build();



        when(

                eventRepository.findById(

                        "e1"

                )

        )

                .thenReturn(

                        Optional.of(

                                event

                        )

                );



        DriveImage image =

                DriveImage.builder()

                        .fileId(

                                "img1"

                        )

                        .name(

                                "test.jpg"

                        )

                        .mimeType(

                                "image/jpeg"

                        )

                        .build();



        when(

                driveImageService.listImages(

                        "folder1"

                )

        )

                .thenReturn(

                        List.of(

                                image

                        )

                );



        when(

                driveImageService.downloadImage(

                        "img1"

                )

        )

                .thenReturn(

                        new byte[]{1}

                );



        when(

                mlClientService.processImage(

                        any()

                )

        )

                .thenThrow(

                        new RuntimeException(

                                "ML Error"

                        )

                );



        assertThrows(

                RuntimeException.class,

                () -> albumProcessingService.processAlbum(

                        "e1"

                )

        );



        assertEquals(

                AlbumProcessingStatus.FAILED,

                event.getProcessingStatus()

        );

    }

    @Test
    void processAlbum_shouldUpdateProgress()
            throws Exception {

        Drive drive =

                Drive.builder()

                        .folderId("folder1")

                        .build();



        Event event =

                Event.builder()

                        .id("e1")

                        .drive(drive)

                        .build();



        when(

                eventRepository.findById(

                        "e1"

                )

        )

                .thenReturn(

                        Optional.of(

                                event

                        )

                );



        DriveImage image1 =

                DriveImage.builder()

                        .fileId("1")

                        .name("a.jpg")

                        .mimeType("image/jpeg")

                        .build();



        DriveImage image2 =

                DriveImage.builder()

                        .fileId("2")

                        .name("b.jpg")

                        .mimeType("image/jpeg")

                        .build();



        when(

                driveImageService.listImages(

                        "folder1"

                )

        )

                .thenReturn(

                        List.of(

                                image1,

                                image2

                        )

                );



        when(

                driveImageService.downloadImage(

                        any()

                )

        )

                .thenReturn(

                        new byte[]{1}

                );



        MlFace mlFace = new MlFace();

        mlFace.setEmbedding(

                List.of(

                        1.0,

                        0.0

                )

        );



        mlFace.setBox(

                List.of(

                        0,

                        0,

                        100,

                        100

                )

        );



        MlFaceResponse response =

                new MlFaceResponse(

                        1,

                        List.of(

                                mlFace

                        )

                );



        when(

                mlClientService.processImage(

                        any()

                )

        )

                .thenReturn(

                        response

                );



        albumProcessingService.processAlbum(

                "e1"

        );



        assertEquals(

                2,

                event.getTotalPhotos()

        );



        assertEquals(

                2,

                event.getProcessedPhotos()

        );



        assertEquals(

                AlbumProcessingStatus.COMPLETED,

                event.getProcessingStatus()

        );

    }




}