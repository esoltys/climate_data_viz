from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api import endpoints

app = FastAPI()

# Mount the static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include the API routes
app.include_router(endpoints.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Climate Data Visualization API"}