import pytest
from app.utils.data_processing import process_temperature_data
import numpy as np

def test_process_temperature_data():
    # Test data
    raw_data = {
        'year': 2023,
        'month': 7,
        'temperature': [273.15, 283.15, 293.15],  # 0°C, 10°C, 20°C
        'latitude': [-90, 0, 90],
        'longitude': [0, 180, 360]
    }

    processed_data = process_temperature_data(raw_data)

    assert processed_data['year'] == 2023
    assert processed_data['month'] == 7
    assert processed_data['average_temperature'] == pytest.approx(10.0)
    assert processed_data['min_temperature'] == pytest.approx(0.0)
    assert processed_data['max_temperature'] == pytest.approx(20.0)
    assert processed_data['unit'] == 'Celsius'
    assert processed_data['data_points'] == 3
    assert processed_data['latitude_range'] == [-90, 90]
    assert processed_data['longitude_range'] == [0, 360]

def test_process_temperature_data_error():
    # Test error handling
    raw_data = {'error': 'Some error occurred'}
    processed_data = process_temperature_data(raw_data)
    assert 'error' in processed_data