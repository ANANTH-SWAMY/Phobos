const mqtt = require("mqtt");
const fs = require("fs");
const csv = require("csv-parser");
const os = require("os");
const { exec } = require("child_process");

const brokerURL = "mqtt://test.mosquitto.org";
const topic = "networkLog";

const client = mqtt.connect(brokerURL);

let jsonDataArray = [];

function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        jsonDataArray.push(row);
      })
      .on("end", () => {
        console.log("Logs Being Streamed, CSV file processed .... Vajra Terminating ...");
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

client.on("connect", async () => {
  exec("figlet vajra", (error, stdout, stderr) => {
    if (error) {
      
    }
    if (stderr) {
      
      return;
    }

    console.log(`${stdout}`);
    //   startSendingLogs();
  });

  console.log("Connected to MQTT broker");
  client.subscribe(topic);

  await readCsvFile("out.csv");
  await publishMessagesWithDelay(1000, jsonDataArray);
});

client.on("error", (err) => {
  console.error("MQTT error:", err);
});

client.on("close", () => {
  console.log("Connection to MQTT broker closed");
});

client.on("offline", () => {
  console.log("MQTT client is offline");
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function publishMessagesWithDelay(delay, data) {
  for (let i = 0; i < data.length; i++) {
    // Get IP address
    let ip = getIpAddress() || "";
    // Construct message
    // console.log(data[i]);
    const {
      protocol,
      flow_duration,
      tot_fwd_pkts,
      tot_bwd_pkts,
      totlen_fwd_pkts,
      totlen_bwd_pkts,
      fwd_pkt_len_mean,
      fwd_pkt_len_std,
      bwd_pkt_len_mean,
      flow_byts_s,
      flow_pkts_s,
      flow_iat_std,
      flow_iat_min,
      fwd_iat_tot,
      fwd_iat_min,
      bwd_iat_tot,
      bwd_iat_min,
      fwd_psh_flags,
      fwd_urg_flags,
      bwd_pkts_s,
      fin_flag_cnt,
      rst_flag_cnt,
      psh_flag_cnt,
      ack_flag_cnt,
      urg_flag_cnt,
      down_up_ratio,
      init_fwd_win_byts,
      init_bwd_win_byts,
      fwd_seg_size_min,
      active_mean,
      idle_mean,
    } = data[i];

    // Construct message with desired attributes
    const outMessage = {
      protocol,
      flow_duration,
      tot_fwd_pkts,
      tot_bwd_pkts,
      totlen_fwd_pkts,
      totlen_bwd_pkts,
      fwd_pkt_len_mean,
      fwd_pkt_len_std,
      bwd_pkt_len_mean,
      flow_byts_s,
      flow_pkts_s,
      flow_iat_std,
      flow_iat_min,
      fwd_iat_tot,
      fwd_iat_min,
      bwd_iat_tot,
      bwd_iat_min,
      fwd_psh_flags,
      fwd_urg_flags,
      bwd_pkts_s,
      fin_flag_cnt,
      rst_flag_cnt,
      psh_flag_cnt,
      ack_flag_cnt,
      urg_flag_cnt,
      down_up_ratio,
      init_fwd_win_byts,
      init_bwd_win_byts,
      fwd_seg_size_min,
      active_mean,
      idle_mean,
      title: "LOG",
      IP: ip,
    };
    const stOutMessage = JSON.stringify(outMessage);
    client.publish(topic, JSON.stringify(stOutMessage));
    await sleep(delay);
    // console.log("Message published:", outMessage);
  }
}

function getIpAddress() {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress;

  // Iterate over each network interface
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach((iface) => {
      // Filter out internal and IPv6 addresses
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
        return; // Exit the loop once the first non-internal IPv4 address is found
      }
    });
    if (ipAddress) return; // Exit the loop once the IP address is found
  });

  return ipAddress;
}
