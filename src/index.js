const register = require("./register");

class SkipCompile {
  constructor(
    entry = "",
    igs = [],
    extra = {
      alias: [],
      checkType: [],
      skipQuoteCheck:false,
    }
  ) {
    const { alias, checkType , skipQuoteCheck  } = extra;
    this.igs = igs;
    this.entry = entry;
    this.pluginName = "wepack-skip-compile";
    this.alias = alias;
    this.checkType = checkType;
    this.isStringArray = !igs.find((v) => typeof v !== "string");
    this.skipQuoteCheck = skipQuoteCheck
  }
  apply(compiler) {
    compiler.hooks.make.tap(this.pluginName, register.bind(this, "buildStart"));
    compiler.hooks.normalModuleFactory.tap(
      this.pluginName,
      register.bind(this, "beforeResolve")
    );
    compiler.hooks.contextModuleFactory.tap(
      this.pluginName,
      register.bind(this, "beforeResolve")
    );
  }
}

module.exports = SkipCompile;
