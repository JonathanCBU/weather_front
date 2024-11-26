"""weather end point for Today and Forecast"""

import requests
import os

from typing import Tuple, Dict, Any

from flask_restful import Resource, reqparse


class WeatherByCorrdinates(Resource):
    """weather resource when using lat and lon"""

    def __init__(self) -> None:
        super().__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("lat", type=float)
        self.parser.add_argument("lon", type=float)

    def get(self, lat: float, lon: float) -> Tuple[Dict[str, Any], int]:
        """return location and weather data"""

        dummy_location = {"name": "Manchester", "state": "MA", "country": "US"}
        dummy_weather = {
            "icon_code": "09d",
            "description": "it's weather I promise",
            "temp_c": 12.3455555,
            "wind_mps": 3.333333,
            "humidity_pct": 09.17,
        }
        dummy_forecast = [
            {
                "icon_code": "13d",
                "temp_high_c": 45.01,
                "temp_low_c": 12.32,
                "date": 1732405366,
            },
            {
                "icon_code": "13n",
                "temp_high_c": 40.01,
                "temp_low_c": 7000.333,
                "date": 1732491765,
            },
                        {
                "icon_code": "09d",
                "temp_high_c": 45.01,
                "temp_low_c": 12.32,
                "date": 1732405366,
            },
            {
                "icon_code": "10n",
                "temp_high_c": 40.01,
                "temp_low_c": 7000.333,
                "date": 1732491765,
            },
            {
                "icon_code": "03d",
                "temp_high_c": 45.01,
                "temp_low_c": 12.32,
                "date": 1732405366,
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
    
    def post(self) -> Tuple[Dict[str, Any], int]:
        """post"""

        args = self.parser.parse_args()

        for arg in args:
            print(args[arg])

        dummy_location = {"name": "Soft", "state": "TX", "country": "US"}
        dummy_weather = {
            "icon_code": "09d",
            "description": "Blahhh!@@#$)(&*&^YF)",
            "temp_c": 0,
            "wind_mps": 3.333333,
            "humidity_pct": 09.17,
        }
        dummy_forecast = [
            {
                "icon_code": "13d",
                "temp_high_c": 100,
                "temp_low_c": 0,
                "date": 1732405366,
            },
            {
                "icon_code": "13n",
                "temp_high_c": 100,
                "temp_low_c": 0,
                "date": 1732491765,
            },
                        {
                "icon_code": "09d",
                "temp_high_c": 100,
                "temp_low_c": 0,
                "date": 1732405366,
            },
            {
                "icon_code": "10n",
                "temp_high_c": 40.01,
                "temp_low_c": 7000.333,
                "date": 1732491765,
            },
            {
                "icon_code": "03d",
                "temp_high_c": 45.01,
                "temp_low_c": 12.32,
                "date": 1732405366,
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