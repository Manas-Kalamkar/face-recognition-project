from fastapi import FastAPI, File, UploadFile
from PIL import Image
import io

from face_service import FaceService

app = FastAPI(title="Face Detection ML Service")

face_service = FaceService()

@app.post("/process-image")
async def process_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # ✅ RESIZE HERE (BEFORE ML)
    max_width = 1024
    if image.width > max_width:
        new_height = int(image.height * max_width / image.width)
        image = image.resize((max_width, new_height))

    faces = face_service.process_image(image)

    return {
        "facesDetected": len(faces),
        "faces": faces
    }
