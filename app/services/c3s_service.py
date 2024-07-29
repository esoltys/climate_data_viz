import cdsapi

def fetch_temperature_data(year: int, month: int):
    # Placeholder function to avoid immediate CDS API call
    print(f"Fetching temperature data for {year}-{month}")
    # Return some dummy data
    return {
        "temperature": 25.5,
        "year": year,
        "month": month
    }

# Initialize client only when needed
def get_client():
    try:
        return cdsapi.Client()
    except Exception as e:
        print(f"Error initializing CDS client: {e}")
        return None

# Use this function when you're ready to make actual API calls
def fetch_real_temperature_data(year: int, month: int):
    client = get_client()
    if not client:
        return None
    
    data = client.retrieve(
        'reanalysis-era5-single-levels-monthly-means',
        {
            'product_type': 'monthly_averaged_reanalysis',
            'variable': '2m_temperature',
            'year': str(year),
            'month': f"{month:02d}",
            'time': '00:00',
            'format': 'netcdf',
        }
    )
    return data