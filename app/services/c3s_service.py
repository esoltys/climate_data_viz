import cdsapi
import xarray as xr
import os
import logging
import tempfile

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fetch_temperature_data(year: int, month: int):
    c = cdsapi.Client()

    try:
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.nc') as temp_file:
            temp_filename = temp_file.name

        # Use the CDS API to retrieve data
        c.retrieve(
            'reanalysis-era5-single-levels-monthly-means',
            {
                'product_type': 'monthly_averaged_reanalysis',
                'variable': '2m_temperature',
                'year': str(year),
                'month': f"{month:02d}",
                'time': '00:00',
                'format': 'netcdf',
            },
            temp_filename
        )

        logger.info(f"Downloaded file size: {os.path.getsize(temp_filename)} bytes")

        # Open the dataset
        ds = xr.open_dataset(temp_filename)
        logger.info("Successfully opened the dataset")

        # Extract the temperature data
        temp_data = ds['t2m'].values.tolist()
        
        # Get latitude and longitude
        lat = ds['latitude'].values.tolist()
        lon = ds['longitude'].values.tolist()

        # Close the dataset
        ds.close()

        # Remove the temporary file
        os.unlink(temp_filename)

        # Return a dictionary with the data
        return {
            'year': year,
            'month': month,
            'temperature': temp_data,
            'latitude': lat,
            'longitude': lon
        }
    
    except Exception as e:
        logger.error(f"Error fetching data: {str(e)}")
        return {"error": str(e)}