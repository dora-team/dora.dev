const http = require('http');

// 1. Disable the global fetch API to force fallback to native http/https modules.
global.fetch = undefined;
global.Request = undefined;
global.Response = undefined;
global.Headers = undefined;

// 2. Safely force keepAlive: false on all http/https agents by defining
// a read-only accessor property on http.Agent.prototype. This preserves
// the class hierarchy and "instanceof" checks perfectly while disabling Keep-Alive.
Object.defineProperty(http.Agent.prototype, 'keepAlive', {
  get() {
    return false;
  },
  set(val) {
    // Do nothing to ignore any attempts to enable keepAlive
  },
  configurable: true,
  enumerable: true
});

console.log("🔒 Global fetch disabled & Keep-Alive disabled safely on all agents.");
