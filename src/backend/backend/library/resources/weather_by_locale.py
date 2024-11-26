"""weather end point for Today and Forecast"""

import requests
import os

from typing import Tuple, Dict, Any

from flask_restful import Resource, reqparse


class WeatherByLocale(Resource):
    """weather resource when using a name or zip to search"""

    def __init__(self) -> None:
        super().__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("locale", type=str)

    def get(self) -> Tuple[Dict[str, Any], int]:
        """return location and weather data"""

        dummy_location = {"name": "Gloucester", "state": "MA", "country": "US"}
        dummy_weather = {
            "icon_code": "50d",
            "description": "it's weather I promise",
            "temp_c": 12.3455555,
            "wind_mps": 3.333333,
            "humidity_pct": 09.17,
        }
        dummy_forecast = [
            {
                "icon_code": "01d",
                "temp_high_c": 45.01,
                "temp_low_c": 12.32,
                "date": 1732405366,
            },
            {
                "icon_code": "09d",
                "temp_high_c": 40.01,
                "temp_low_c": 200.333,
                "date": 1732491765,
            },
        ]
        return (
            {
                "today": dummy_weather,
                "forecast": dummy_forecast,
                "locale": dummy_location,
            },
            200,
        )
