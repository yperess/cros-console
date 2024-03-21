import service_pb2
import service_pb2_grpc


class ServodService(service_pb2_grpc.ServodServicer):
    def Connect(self, request: service_pb2.ConnectRequest, context):
        print(f'connecting to board={request.board_name}')
        return service_pb2.ConnectResponse(
            cpu_uart_pty='/dev/pty/0',
            cr50_uart_pty='/dev/pty/1',
            ec_uart_pty='/dev/pty/2',
        )
