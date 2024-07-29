from fastapi import APIRouter
from app.services.c3s_service import fetch_temperature_data
from app.services.azure_service import generate_forecast, detect_anomalies
from app.utils.data_processing import process_temperature_data

router = APIRouter()

@router.get("/api/temperature")
async def get_temperature_data(year: int, month: int):
    raw_data = fetch_temperature_data(year, month)
    processed_data = process_temperature_data(raw_data)
    return processed_data

@router.get("/api/forecast")
async def get_temperature_forecast(data: list):
    forecast = generate_forecast(data)
    return forecast

@router.get("/api/anomalies")
async def get_temperature_anomalies(data: list):
    anomalies = detect_anomalies(data)
    return anomalies