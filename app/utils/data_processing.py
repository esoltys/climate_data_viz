import numpy as np
import logging

logger = logging.getLogger(__name__)

def process_temperature_data(raw_data):
    if 'error' in raw_data:
        logger.error(f"Error in raw data: {raw_data['error']}")
        return raw_data  # Return the error if there was one

    try:
        temperatures = np.array(raw_data['temperature'])
        
        # Convert from Kelvin to Celsius
        temperatures_celsius = temperatures - 273.15
        
        return {
            'year': raw_data['year'],
            'month': raw_data['month'],
            'average_temperature': round(float(np.mean(temperatures_celsius)), 2),
            'median_temperature': round(float(np.median(temperatures_celsius)), 2),
            'min_temperature': round(float(np.min(temperatures_celsius)), 2),
            'max_temperature': round(float(np.max(temperatures_celsius)), 2),
            'std_deviation': round(float(np.std(temperatures_celsius)), 2),
            'unit': 'Celsius',
            'data_points': len(temperatures),
            'latitude_range': [min(raw_data['latitude']), max(raw_data['latitude'])],
            'longitude_range': [min(raw_data['longitude']), max(raw_data['longitude'])],
            '25th_percentile': round(float(np.percentile(temperatures_celsius, 25)), 2),
            '75th_percentile': round(float(np.percentile(temperatures_celsius, 75)), 2),
        }
    except Exception as e:
        logger.error(f"Error processing temperature data: {str(e)}")
        return {"error": f"Error processing temperature data: {str(e)}"}