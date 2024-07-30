from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Climate Data Visualization API"}

def test_get_temperature_data():
    response = client.get("/api/temperature?year=2023&month=7")
    assert response.status_code == 200
    data = response.json()
    assert "year" in data
    assert "month" in data
    assert "average_temperature" in data
    assert "min_temperature" in data
    assert "max_temperature" in data
    assert "unit" in data