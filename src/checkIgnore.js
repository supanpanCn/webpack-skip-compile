const path = require('path')
function filter(payload) {
  if (!payload || global.conflict) return payload;
  try {
    const { context = "", request = "" } = payload || {};
    if (request.includes("node_modules")) return payload;
    const igs = global.igs
    const absolutePath = path.resolve(context, request);
    if (igs.find(v=>absolutePath.includes(v))) {
      return null
    }
    return payload;
  } catch (_) {
    console.warn(`[${global.pluginName}]:执行失败`);
    return payload;
  }
}

module.exports = filter;
