import axios from "axios";

const baseUrl = "https://serverless-agent.russell-loube.workers.dev/v1";

axios.defaults.headers.post["X-Optimizely-SDK-Key"] = "Tz1bpikpeH3CyDCwM6A5S";
axios.defaults.headers.post["Accept"] = "text/event-stream";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["X-Optimizely-Enable-FEX"] = "true";
axios.defaults.headers.post["X-Optimizely-Datafile-KV"] = "true";
axios.defaults.headers.post["X-Optimizely-Trimmed-Decisions"] = "false";

const decideAll = (userId, userCountry) => {
  const data = {};
  const attributes = { country: userCountry };
  const stringAttributes = JSON.stringify(attributes);
  console.log(stringAttributes);

  const config = {
    headers: {
      "X-Optimizely-Visitor-Id": userId,
      "X-Optimizely-Attributes-Header": stringAttributes,
      "X-Optimizely-Decide-Options": ["INCLUDE_REASONS"],
    },
  };

  const request = axios.post(`${baseUrl}/decide`, data, config);
  return request.then((response) => response.data);
};

export default {
  decideAll,
};
