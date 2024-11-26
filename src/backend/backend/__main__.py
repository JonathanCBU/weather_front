"""main server entry point"""

import argparse
from typing import Any, Dict

import dotenv
from flask import Flask
from flask_restful import Api
from backend.library.resources.weather import Weather


def main() -> None:
    """launch server"""
    dotenv.load_dotenv()

    args = get_args()
    app = create_app(args)
    _ = create_api(app)

    app.run(debug=args.debug, port=args.port)


def create_app(args: Dict[str, Any]) -> Flask:
    """create app object"""
    app = Flask(__name__)

    # do app.config.from_mapping when I get to the point of mapping new stuff
    # to the backend
    return app


def create_api(app: Flask) -> Api:
    """configure backend REST api"""
    api = Api(app)

    # api.add_resource here
    api.add_resource(Weather, "/bylocale")
    return api


def get_args() -> argparse.Namespace:
    """configure command line args for backend server"""
    parser = argparse.ArgumentParser(
        description=(
            "Command line args for starting the Financify backend server"
        )
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        default=False,
        help="Enable debug mode when running the app",
    )
    parser.add_argument("--port", default=None, help="Specify server port")
    args = parser.parse_args()
    return args
