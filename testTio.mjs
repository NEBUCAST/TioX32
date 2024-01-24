//@ts-check
import net from "net";

const PORT = 49280;
const IP = process.argv[2];

if (!IP) {
  console.log("Please specify IP address");
  process.exit(1);
}

const client = net.createConnection(PORT, IP);

const set48V = (ch, on) => {
  const cmd = `set IO:Current/InCh/48VOn ${ch} 0 ${on ? "1 ON" : "0 OFF"}\n`;
  client.write(cmd);
};

const setMute = (ch, on) => {
  const cmd = `set IO:Current/InCh/Mute ${ch} 0 ${on ? 1 : 0}\n`;
  client.write(cmd);
};

const setGain = (ch, gain) => {
  const cmd = `set IO:Current/InCh/HAGain ${ch} 0 ${gain}\n`;
  client.write(cmd);
};

client.on("data", (data) => {
  console.log(data.toString());
});

client.on("end", () => {
  console.log("disconnected from server");
});

client.on("error", (err) => {
  console.log(err);
});

client.on("connect", () => {
  console.log("connected to server");
  let ch = 1;
  let muted = false;
  let gain = 0;
  const MAX_GAIN = 66;
  setInterval(() => {
    set48V(ch, muted);
    setGain(ch, gain);
    // setMute(ch, muted);
    // ch = ch === 8 ? 1 : ch + 1;
    gain = (gain + 1) % MAX_GAIN;
    muted = !muted;
  }, 100);
});
