import os
import json
from datetime import datetime, timedelta

CACHE_DIR = "cache"
CACHE_DURATION = timedelta(days=1)  # Cache data for 1 day

def get_cached_data(year: int, month: int):
    cache_file = os.path.join(CACHE_DIR, f"temp_data_{year}_{month}.json")
    if os.path.exists(cache_file):
        with open(cache_file, 'r') as f:
            cached_data = json.load(f)
        
        # Check if cache is still valid
        cache_time = datetime.fromisoformat(cached_data['cache_time'])
        if datetime.now() - cache_time < CACHE_DURATION:
            return cached_data['data']
    
    return None

def cache_data(year: int, month: int, data):
    if not os.path.exists(CACHE_DIR):
        os.makedirs(CACHE_DIR)
    
    cache_file = os.path.join(CACHE_DIR, f"temp_data_{year}_{month}.json")
    cache_data = {
        'cache_time': datetime.now().isoformat(),
        'data': data
    }
    with open(cache_file, 'w') as f:
        json.dump(cache_data, f)