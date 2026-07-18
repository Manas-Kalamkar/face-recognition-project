from mtcnn import MTCNN
from keras_facenet import FaceNet
import numpy as np

class FaceService:
    def __init__(self):
        print(" Loading MTCNN...")
        # Remove min_face_size from here
        self.detector = MTCNN()

        print(" Loading FaceNet...")
        self.embedder = FaceNet()

        print(" Models loaded")

    def process_image(self, image):
        try:
            image = np.asarray(image)
            if image is None or image.size == 0:
                return []

            # Pass min_face_size here if your version supports it, 
            # otherwise just use the defaults which are usually fine.
            detections = self.detector.detect_faces(image)

            faces = []
            for det in detections:
                x, y, w, h = det['box']
                
                # 🛑 Safety Check: Ensure coordinates are within image boundaries
                # and the crop isn't empty to prevent the Conv2D error
                x, y = max(0, x), max(0, y)
                face = image[y:y+h, x:x+w]
                
                if face.size == 0:
                    continue

                # Get embedding
                embedding = self.embedder.embeddings([face])[0]

                faces.append({
                    "box": det["box"],
                    "confidence": det["confidence"],
                    "embedding": embedding.tolist()
                })

            return faces

        except Exception as e:
            # Catch the "empty output" error specifically or any other ML crash
            print(f"Error processing image: {e}")
            return []