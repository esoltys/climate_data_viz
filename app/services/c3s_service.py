import cdsapi

client = cdsapi.Client()

def fetch_temperature_data(year: int, month: int):
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