//@ts-check
import osc from "osc";

const PORT = 10023;
const IP = process.argv[2];

if (!IP) {
  console.log("Please specify IP address");
  process.exit(1);
}

function pulse() {
  try {
    oscPort.send({
      address: "/xremote",
      args: [],
    });
  } catch (e) {
    // Ignore
  }
}

var oscPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: 0,
  broadcast: true,
  metadata: true,
  remoteAddress: IP,
  remotePort: PORT,
});

oscPort.on("error", (err) => {
  console.log("error", `Error: ${err.message}`);
});

oscPort.on("ready", () => {
  pulse();

  setInterval(() => {
    pulse();
  }, 1500);

  const doSync = () => {
    if (oscPort) {
      try {
        oscPort.send({ address: "/xinfo", args: [] });
      } catch (e) {
        // Ignore
      }
    }
  };

  doSync();
});

oscPort.on("close", () => {
  console.log("closed");
});

oscPort.on("message", (message) => {
  console.log("Message", message);
});

oscPort.open();
