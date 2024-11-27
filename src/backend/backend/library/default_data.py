"""Default data variables for get requests"""

from dataclasses import dataclass
import random
from typing import List
from datetime import datetime, timedelta


@dataclass
class Locale:
    name: str
    state: str = ""
    country: str = ""


@dataclass
class Today:
    icon_code: str
    description: str
    temp_c: float
    wind_mps: float
    humidity_pct: float


@dataclass
class Forecast:
    icon_code: str
    temp_high_c: float
    temp_low_c: float
    date: int


icon_codes = [
    "01d",
    "01n",
    "02d",
    "02n",
    "03d",
    "03n",
    "50n",
    "50d",
    "04d",
    "04n",
    "09d",
    "09n",
    "10d",
    "10n",
    "13d",
    "13n",
]


def dummy_locale(name: str) -> Locale:
    """Return standard dummy locale

    :param name: anything to indentify the location you want
    """
    states = [
        "AL",
        "AK",
        "AS",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FM",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MH",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PW",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VI",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
    ]

    state = states[random.randint(0, len(states) - 1)]

    return Locale(name=name, state=state, country="US")


def dummy_today(description: str = "this is a description") -> Today:
    """Generate a dummy current forecast

    :param description: custom description string (optional)
    """
    return Today(
        icon_code=icon_codes[random.randint(0, len(icon_codes) - 1)],
        description=description,
        temp_c=random.random() * 100,
        wind_mps=random.random() * 100,
        humidity_pct=round(random.random() * 100, 2),
    )


def dummy_forecast(iso_date: str = "2024-03-01") -> Forecast:
    """generate a single day forecase object

    :param iso_date: date to change (optional)
    """
    dt = datetime.fromisoformat(iso_date)
    dt_epoch = int((dt - datetime.fromtimestamp(0)).total_seconds() * 1000)

    return Forecast(
        icon_code=icon_codes[random.randint(0, len(icon_codes) - 1)],
        temp_high_c=random.random() * 100,
        temp_low_c=random.random() * 100,
        date=dt_epoch,
    )


def dummy_forecast_list(
    iso_date: str = "2024-03-01", count: int = 5
) -> List[Forecast]:
    """generate a list of forecasts

    :param iso_date: first date for the forecast data
    :param count: number of forecasts to generate
    """

    epoch = datetime.fromtimestamp(0)
    days = []
    dt_1 = datetime.fromisoformat(iso_date)
    for i in range(count):
        date = dt_1 + timedelta(days=i)
        print(date)
        days.append(
            Forecast(
                icon_code=icon_codes[random.randint(0, len(icon_codes) - 1)],
                temp_high_c=random.random() * 100,
                temp_low_c=random.random() * 100,
                date=int((date - epoch).total_seconds() * 1000),
            )
        )
    return days
