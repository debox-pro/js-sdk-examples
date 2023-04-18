import { DeBoxChat } from "@debox-global/html";

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  // eslint-disable-next-line @typescript-eslint/prefer-for-of, no-plusplus
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return false;
}

window.deboxChat = new DeBoxChat(
  {
    dao: {
      contractAddress:
        getQueryVariable("contractAddress") || import.meta.env.VITE_CA,
      chainId: getQueryVariable("chainId") || import.meta.env.VITE_CID,
      source: getQueryVariable("source") || import.meta.env.VITE_SOURCE,
    },
    projectId: getQueryVariable("projectId") || import.meta.env.VITE_PKEY,
    urls: {
      api: getQueryVariable("api") || import.meta.env.VITE_API,
      ws: getQueryVariable("ws") || import.meta.env.VITE_WS,
    },
  },
  window.ethereum // with inject wallet
);
