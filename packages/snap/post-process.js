const fs = require('fs');
const pathUtils = require('path');
//const snapConfig = require("./snap.config.json");

//import * as snapConfig from "./snap.config";

const bundlePath = pathUtils.join('dist', 'snap.js');
console.log('Bundle path', bundlePath);
//const bundlePath = pathUtils.join(cliOptions.dist, cliOptions.outfileName);

let bundleString = fs.readFileSync(bundlePath, 'utf8');

// Alias `window` as `self`
bundleString = 'var self = window;\n'.concat(bundleString);

// Remove useless "stdlib" argument from bignumber.js asm module
bundleString = bundleString
  .replace(
    `module.exports = function decodeAsm (stdlib, foreign, buffer) {`,
    `module.exports = function decodeAsm (foreign, buffer) {`
  )
  .replace(/stdlib\./gu, '');

// Remove readonly assignment
bundleString = bundleString.replace(
  `Gp[iteratorSymbol] = function() {
    return this;
  };`,
  ''
);

bundleString = bundleString.replace("const verbosityString = (_b = (_a = process.env.GRPC_NODE_VERBOSITY) !== null && _a !== void 0 ? _a : process.env.GRPC_VERBOSITY) !== null && _b !== void 0 ? _b : '';", "const verbosityString = 'INFO'");

bundleString = bundleString.replace("const tracersString = (_d = (_c = process.env.GRPC_NODE_TRACE) !== null && _c !== void 0 ? _c : process.env.GRPC_TRACE) !== null && _d !== void 0 ? _d : '';", "const tracersString =''");


bundleString = bundleString.replace("!process.browser && process.env.READABLE_STREAM === 'disable'", "true");
bundleString = bundleString.replace("var logData = Boolean(process.env.HTTP2_LOG_DATA);", "var logData = true;");


bundleString = bundleString.replace("|| process.nextTick", "");

// Fix TextEncoder and TextDecoder
bundleString = bundleString.replace(
  'const textEncoder = new TextEncoder();',
  ''
);
bundleString = bundleString.replace(
  'const textDecoder = new TextDecoder();',
  ''
);
bundleString = bundleString.replace('textEncoder.', 'new TextEncoder().');
bundleString = bundleString.replace('textDecoder.', 'new TextDecoder().');

// Fix import error
bundleString = bundleString.replaceAll('.import(', '.importPKey(');
bundleString = bundleString.replaceAll('import(args)', 'importPKey(args)');

// Fix root errors
bundleString = bundleString.replaceAll(
  "var coreJsData = root['__core-js_shared__'];",
  "if(root) {var coreJsData = root['__core-js_shared__'];}"
);

bundleString = bundleString.replaceAll(
  'var Symbol = root.Symbol',
  'if(root)var Symbol = root.Symbol'
);

bundleString = bundleString.replaceAll(
  'var Buffer = moduleExports ? root.Buffer : undefined,',
  'if(root)var Buffer = moduleExports ? root.Buffer : undefined,'
);

// Remove 'use asm' tokens; they cause pointless console warnings
bundleString = bundleString.replace(/^\s*'use asm';?\n?/gmu, '');

fs.writeFileSync(bundlePath, bundleString);
