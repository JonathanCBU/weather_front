"""weather end point for Today and Forecast"""

import requests
import os

from typing import Tuple, Dict, Any

from dataclasses import asdict

from backend.library.default_data import (
    dummy_forecast_list,
    dummy_locale,
    dummy_today,
)

from flask_restful import Resource, reqparse


class WeatherByLocale(Resource):
    """weather resource when using a name or zip to search"""

    def __init__(self) -> None:
        super().__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("locale", type=str)

    def get(self) -> Tuple[Dict[str, Any], int]:
        """return location and weather data"""

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
