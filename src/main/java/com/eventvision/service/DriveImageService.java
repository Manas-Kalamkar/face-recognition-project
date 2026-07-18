package com.eventvision.service;

import com.eventvision.DTO.DriveImage;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DriveImageService {

    private final Drive drive;

    /**
     * List all image files inside a Drive folder
     */
    public List<DriveImage> listImages(String folderId) throws Exception {

        String query = "'" + folderId + "' in parents and mimeType contains 'image/'";

        FileList result = drive.files().list()
                .setQ(query)
                .setFields("files(id, name, mimeType)")
                .execute();

        List<DriveImage> images = new ArrayList<>();

        for (File file : result.getFiles()) {
            images.add(
                    DriveImage.builder()
                            .fileId(file.getId())
                            .name(file.getName())
                            .mimeType(file.getMimeType())
                            .build()
            );
        }

        return images;
    }

    /**
     * Download image as byte[]
     */
    public byte[] downloadImage(String fileId) throws Exception {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        drive.files()
                .get(fileId)
                .executeMediaAndDownloadTo(outputStream);

        return outputStream.toByteArray();
    }
}
