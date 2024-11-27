"""weather end point for Today and Forecast"""

import requests
import os
from dataclasses import asdict
from typing import Tuple, Dict, Any
from backend.library.default_data import (
    dummy_forecast_list,
    dummy_locale,
    dummy_today,
)

from flask_restful import Resource, reqparse


class WeatherByCorrdinates(Resource):
    """weather resource when using lat and lon"""

    def __init__(self) -> None:
        super().__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("lat", type=float)
        self.parser.add_argument("lon", type=float)

    def post(self) -> Tuple[Dict[str, Any], int]:
        """post"""

        args = self.parser.parse_args()

        for arg in args:
            print(args[arg])

        today = dummy_today(__name__)
        forecast = []
        for fc in dummy_forecast_list():
            forecast.append(asdict(fc))
        locale = dummy_locale(__name__)
        for fc in forecast:
            print(forecast)
        return (
            {
                "today": asdict(today),
                "forecast": forecast,
                "locale": asdict(locale),
            },
            200,
        )
