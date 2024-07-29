from fastapi import APIRouter
from app.services import c3s_service, azure_service
from app.utils import data_processing

router = APIRouter()

@router.get("/api/temperature")
async def get_temperature_data(year: int, month: int):
    raw_data = c3s_service.fetch_temperature_data(year, month)
    processed_data = data_processing.process_temperature_data(raw_data)
    return processed_data

@router.get("/api/forecast")
async def get_temperature_forecast(data: list):
    forecast = azure_service.generate_forecast(data)
    return forecast

@router.get("/api/anomalies")
async def get_temperature_anomalies(data: list):
    anomalies = azure_service.detect_anomalies(data)
    return anomalies