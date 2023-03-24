const register = require("./register");

class SkipCompile {
  constructor(entry='',igs = [],extra={
    alias:[],
    include:[]
  }) {
    const {alias,include} = extra
    this.igs = igs;
    this.entry = entry
    this.pluginName = 'wepack-skip-compile'
    this.alias = alias
    this.include = include
  }
  apply(compiler) {
    compiler.hooks.make.tap(this.pluginName, register.bind(this,'buildStart'));
    compiler.hooks.normalModuleFactory.tap(this.pluginName, register.bind(this,'beforeResolve'));
    compiler.hooks.contextModuleFactory.tap(this.pluginName, register.bind(this,'beforeResolve'));
  }
}

module.exports = SkipCompile
