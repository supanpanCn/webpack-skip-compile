const checkIgnore = require('./checkIgnore')
const buildStart = require('./buildStart')

function register(hookName,ctx){
    hookName === 'buildStart' && buildStart.call(this,ctx)
    hookName === 'beforeResolve' &&  ctx.hooks.beforeResolve.tap(this.pluginName, checkIgnore);
}

module.exports = register