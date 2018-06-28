var backendHost,
local = "localhost",
dev = "eam-dev",
isLocal = false;

const hostname = window && window.location && window.location.hostname;

if(hostname.includes(local)) {
    backendHost = 'https://aviana.herokuapp.com';
    isLocal = true;
} else {
    backendHost = 'https://aviana.herokuapp.com';
}

export const API_ROOT = backendHost;
export const HOST_NAME = hostname;
export const LOCAL = isLocal;