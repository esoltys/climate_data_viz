import xarray as xr
import pandas as pd

def process_temperature_data(raw_data):
    # Open the NetCDF file
    ds = xr.open_dataset(raw_data)
    
    # Extract temperature data
    temp_data = ds['t2m'] - 273.15  # Convert from Kelvin to Celsius
    
    # Convert to a pandas DataFrame
    df = temp_data.to_dataframe().reset_index()
    
    # Process as needed (e.g., calculate global mean temperature)
    global_mean = df.groupby('time')['t2m'].mean().reset_index()
    
    # Convert to dictionary for JSON serialization
    result = global_mean.to_dict(orient='records')
    
    return result