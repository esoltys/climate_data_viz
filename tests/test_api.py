from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Climate Data Visualization API"}

@patch('app.api.endpoints.fetch_temperature_data')
def test_get_temperature_data(mock_fetch):
    # Set up the mock to return a predefined response
    mock_fetch.return_value = {
        'year': 2023,
        'month': 7,
        'temperature': [273.15, 283.15, 293.15],
        'latitude': [-90, 0, 90],
        'longitude': [0, 180, 360]
    }

    response = client.get("/api/temperature?year=2023&month=7")
    assert response.status_code == 200
    data = response.json()
    assert "year" in data
    assert "month" in data
    assert "average_temperature" in data
    assert "min_temperature" in data
    assert "max_temperature" in data
    assert "unit" in data

    # Verify that the mock was called with the correct arguments
    mock_fetch.assert_called_once_with(2023, 7)

@patch('app.api.endpoints.fetch_temperature_data')
def test_get_temperature_data_error(mock_fetch):
    # Set up the mock to return an error
    mock_fetch.return_value = {"error": "Data not available"}

    response = client.get("/api/temperature?year=2023&month=7")
    assert response.status_code == 500
    assert response.json() == {"detail": "Data not available"}
