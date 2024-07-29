from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Mount the static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Import and include API routes
from app.api import endpoints
app.include_router(endpoints.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Climate Data Visualization API"}