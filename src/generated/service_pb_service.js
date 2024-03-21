// package: servod
// file: service.proto

var service_pb = require("./service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Servod = (function () {
  function Servod() {}
  Servod.serviceName = "servod.Servod";
  return Servod;
}());

Servod.Connect = {
  methodName: "Connect",
  service: Servod,
  requestStream: false,
  responseStream: false,
  requestType: service_pb.ConnectRequest,
  responseType: service_pb.ConnectResponse
};

exports.Servod = Servod;

function ServodClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ServodClient.prototype.connect = function connect(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Servod.Connect, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ServodClient = ServodClient;

