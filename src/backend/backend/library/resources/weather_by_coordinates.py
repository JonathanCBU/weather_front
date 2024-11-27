"""weather end point for Today and Forecast"""

import os
from dataclasses import asdict
from typing import Any, Dict, Tuple

import requests
from flask_restful import Resource, reqparse

from backend.library.default_data import (
    dummy_forecast_list,
    dummy_locale,
    dummy_today,
)


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

        today = dummy_today(__name__)
        forecast = []
        for fc in dummy_forecast_list():
            forecast.append(asdict(fc))
        locale = dummy_locale(__name__)
        return (
            {
                "today": asdict(today),
                "forecast": forecast,
                "locale": asdict(locale),
            },
            200,
        )
