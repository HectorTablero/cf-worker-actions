import { WorkerEntrypoint } from "cloudflare:workers";

const headers = {
  "Content-Type": "text/html",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*"
};

const baseHtml = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-family: Arial, sans-serif;
      background-color: #fafafa;
    }
    .container {
      text-align: center;
      margin: 20px;
    }
    .container svg {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: min-content;
      max-width: 150px;
    }
    h1 {
      font-size: 2rem;
    }
  </style>
</head>`;

function getServerErrorPage() {
  return new Response(baseHtml + `
  <title>Server Error</title>
  <body>
    <div class="container">
      <svg fill="red" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M7.29325,7.29325 C7.65417308,6.93232692 8.22044527,6.90456361 8.61296051,7.20996006 L8.70725,7.29325 L12.00025,10.58625 L15.29325,7.29325 C15.68425,6.90225 16.31625,6.90225 16.70725,7.29325 C17.0681731,7.65417308 17.0959364,8.22044527 16.7905399,8.61296051 L16.70725,8.70725 L13.41425,12.00025 L16.70725,15.29325 C17.09825,15.68425 17.09825,16.31625 16.70725,16.70725 C16.51225,16.90225 16.25625,17.00025 16.00025,17.00025 C15.7869167,17.00025 15.5735833,16.9321944 15.3955509,16.796662 L15.29325,16.70725 L12.00025,13.41425 L8.70725,16.70725 C8.51225,16.90225 8.25625,17.00025 8.00025,17.00025 C7.74425,17.00025 7.48825,16.90225 7.29325,16.70725 C6.93232692,16.3463269 6.90456361,15.7800547 7.20996006,15.3875395 L7.29325,15.29325 L10.58625,12.00025 L7.29325,8.70725 C6.90225,8.31625 6.90225,7.68425 7.29325,7.29325 Z"/>
      </svg>
      <h1 style="color: red;">Server Error</h1>
    </div>
  </body>`, { headers, status: 500 });
}
function getInvalidActionPage() {
  return new Response(baseHtml + `
  <title>Invalid or Expired Action</title>
  <body>
    <div class="container">
      <svg fill="orange" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M12,16 C12.5522847,16 13,16.4477153 13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 C11,16.4477153 11.4477153,16 12,16 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,13 C13,13.5522847 12.5522847,14 12,14 C11.4477153,14 11,13.5522847 11,13 L11,7 C11,6.44771525 11.4477153,6 12,6 Z"/>
      </svg>
      <h1 style="color: orange;">Invalid or Expired Action</h1>
    </div>
  </body>`, { headers, status: 403 });
}
function getSuccessPage() {
  return new Response(baseHtml + `
<title>Success</title>
<body>
  <div class="container">
    <svg fill="green" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"/>
    </svg>
    <h1 style="color: green;">Success</h1>
  </div>
</body>`, { headers, status: 200 });
}

async function executeAction(key, env) {
  try {
    const data = await env.ACTIONS_KV.get(key, "json");
    if (!data) return getInvalidActionPage();
    await env.ACTIONS_KV.delete(key);
    const version = data.v;
    const handlers = {
      "googleforms": env.GOOGLEFORMS
    }
    const handler = handlers[data.handlername];
    if (version === 1) {
      const params = JSON.parse(data.params);
      await handler.handleV1(params);
      return getSuccessPage();
    }
    return getInvalidActionPage();
  } catch (error) {
    return getServerErrorPage();
  }
}

export class ActionsWorker extends WorkerEntrypoint {
  // Currently, entrypoints without a named handler are not supported
  async fetch(request, env, ctx) { return new Response(null, {status: 404}); }

  async addNewAction(handlername, params, ttl=null) {
    const key = await this.env.UTILS.generateID(50);
    const options = {};
    if (ttl) options.expirationTtl = ttl * 60;
    await this.env.ACTIONS_KV.put(key, JSON.stringify({ v: 1, handlername, params }), options);
    return key;
  }
}

export default {
  // Currently, entrypoints without a named handler are not supported
  async fetch(request, env, ctx) {
    try {
      const key = (new URL(request.url)).pathname.split("/actions/", 2)[1];
      if (key !== "") return executeAction(key, env);
      return getInvalidActionPage();
    } catch (error) {
     return getServerErrorPage(); 
    }
  } 
}