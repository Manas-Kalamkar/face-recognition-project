package com.eventvision.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DriveUtils {
    private static final Pattern FOLDER_ID_PATTERN =
            Pattern.compile("/folders/([a-zA-Z0-9_-]+)");

    public static String extractFolderId(String driveLink) {
        Matcher matcher = FOLDER_ID_PATTERN.matcher(driveLink);
        if (matcher.find()) {
            return matcher.group(1);
        }
        throw new IllegalArgumentException("Invalid Google Drive folder link");
    }
}
