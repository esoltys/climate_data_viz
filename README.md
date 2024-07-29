# Climate Data Visualization Project

This project is a FastAPI-based web application that fetches and visualizes climate data from the Copernicus Climate Data Store (CDS). It provides an API endpoint to retrieve temperature data for a specific year and month, and processes this data to provide useful statistics.

## Features

- Fetch monthly average temperature data from the CDS API
- Process and analyze temperature data to provide statistics such as average, minimum, and maximum temperatures
- RESTful API endpoint to retrieve processed climate data
- Error handling and logging for robust operation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7 or higher
- A Copernicus Climate Data Store (CDS) API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/esoltys/climate-data-viz.git
   cd climate-data-viz
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up your CDS API key:
   - Create a file named `.cdsapirc` in your home directory
   - Add the following content to the file, replacing `YOUR-API-KEY` with your actual CDS API key:
     ```
     url: https://cds.climate.copernicus.eu/api/v2
     key: YOUR-API-KEY
     ```

## Usage

1. Start the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

2. Open your web browser and navigate to `http://127.0.0.1:8000/docs` to view the Swagger UI documentation for the API.

3. Use the `/api/temperature` endpoint to retrieve temperature data for a specific year and month:
   ```
   GET http://127.0.0.1:8000/api/temperature?year=2023&month=7
   ```

## Project Structure

```
climate-data-viz/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── c3s_service.py
│   └── utils/
│       ├── __init__.py
│       └── data_processing.py
├── static/
│   └── index.html
├── .gitignore
├── README.md
└── requirements.txt
```

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Copernicus Climate Data Store](https://cds.climate.copernicus.eu/) for providing the climate data
- [FastAPI](https://fastapi.tiangolo.com/) for the web framework
- [xarray](http://xarray.pydata.org/) for handling NetCDF data