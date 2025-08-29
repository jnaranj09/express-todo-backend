import os from "os";

function getUpTime() {
  const upTime = os.uptime();
  return upTime
}

export default getUpTime;
