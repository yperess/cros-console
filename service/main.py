import logging
import time
import grpc
from grpc_reflection.v1alpha import reflection

from concurrent import futures
import service_pb2_grpc
import service_pb2

from servod_service import ServodService

_LOGGER = logging.getLogger('servod_server')
_LOGGER.setLevel(logging.DEBUG)
logging.basicConfig(level=logging.DEBUG)


def serve(port: int):
    address = f'0.0.0.0:{port}'
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_ServodServicer_to_server(ServodService(), server)
    SERVICE_NAMES = (
        service_pb2.DESCRIPTOR.services_by_name['Servod'].full_name,
        reflection.SERVICE_NAME,
    )
    reflection.enable_server_reflection(SERVICE_NAMES, server)
    server.add_insecure_port(address)
    _LOGGER.info(f'Starting service@{address}')
    server.start()
    server.wait_for_termination()


def main():
    serve(port=50051)


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    main()
