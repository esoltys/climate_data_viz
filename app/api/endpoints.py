from fastapi import APIRouter, HTTPException
from app.services.c3s_service import fetch_temperature_data
from app.utils.data_processing import process_temperature_data
import logging
from typing import Dict, Any

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/api/temperature")
async def get_temperature_data(year: int, month: int) -> Dict[str, Any]:
    raw_data = fetch_temperature_data(year, month)
    if "error" in raw_data:
        logger.error(f"Error fetching temperature data: {raw_data['error']}")
        raise HTTPException(status_code=500, detail=raw_data["error"])
    processed_data = process_temperature_data(raw_data)
    return processed_data