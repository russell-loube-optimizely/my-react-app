import axios from "axios";

const baseUrl = "https://optly-hybrid-agent-v2.russell-loube.workers.dev/v1";

axios.defaults.headers.post["X-Optimizely-SDK-Key"] = "Tz1bpikpeH3CyDCwM6A5S";
axios.defaults.headers.post["Accept"] = "text/event-stream";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["X-Optimizely-Enable-FEX"] = "true";
axios.defaults.headers.post["X-Optimizely-Decide-Options"] = JSON.stringify([
  "INCLUDE_REASONS",
]);
// axios.defaults.headers.post["X-Optimizely-Datafile-KV"] = "false";
// axios.defaults.headers.post["X-Optimizely-Trimmed-Decisions"] = "true";

const decideAll = (userId, userCountry) => {
  const data = {};
  const attributes = { country: userCountry };
  const stringAttributes = JSON.stringify(attributes);
  console.log(stringAttributes);

  const config = {
    headers: {
      "X-Optimizely-Visitor-Id": userId,
      "X-Optimizely-Attributes-Header": stringAttributes,
    },
  };

  const request = axios.post(`${baseUrl}/decide`, data, config);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const track = (userId) => {
  console.log("userId used in track call:", userId);
  const data = {};
  const config = {
    headers: {
      "X-Optimizely-Visitor-Id": userId,
      "X-Optimizely-Event-Key": "ctaClick",
    },
  };

  const request = axios.post(`${baseUrl}/track`, data, config);
  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default {
  decideAll,
  track,
};
