const path = require("path");
const fg = require("fast-glob");
const fs = require("fs");
const strip = require("strip-comments");
const {
  getCode,
  parseImports,
  createInitial,
  filter,
  normalize,
} = require("./helper");

function buildStart(compilation) {
  createInitial(this.pluginName);
  try {
    const { context = process.cwd() } = compilation || {};

    if (!Array.isArray(this.igs) || this.igs.length === 0) {
      global.conflict = true;
      return;
    }

    const rootUrl = this.entry ? path.resolve(context, this.entry) : context;
    global.rootUrl = rootUrl;

    const igs = (global.igs = normalize.call(this, rootUrl));

    let files = filter.call(
      this,
      fg.sync(rootUrl + path.sep + "**", {
        onlyFiles: false,
      }),
      igs
    );

    if (Array.isArray(files) && this.checkType.length) {
      files = files.filter(
        (v) =>
          this.checkType.includes(path.extname(v)) &&
          !igs.find((i) => v.includes(i))
      );
    }

    if (this.skipQuoteCheck) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (fs.existsSync(file)) {
        const code = fs.readFileSync(file, "utf-8");
        const jsCode = getCode(strip(code));
        if (jsCode.trim()) {
          const imps = parseImports(jsCode);
          if (imps.length) {
            for (let i = 0; i < imps.length; i++) {
              const imp = imps[i];
              const alias = this.alias.find((v) => imp.startsWith(v.key));
              let actualImp = imp;
              if (alias) {
                actualImp = alias.value + imp.replace(alias.key, "");
              } else {
                actualImp = path.resolve(file, imp);
              }
              const igIndex = igs.findIndex((ig) => actualImp.includes(ig));

              if (igIndex > -1) {
                const isIg = igs.find((i) => file.includes(i));
                if (isIg) continue;
                console.warn(
                  `文件(${file})中的(${imp})与配置的文件(${this.igs[igIndex]})存在引用关系，请检查`
                );
                global.conflict = true;
                break;
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    global.conflict = true;
  }
}

module.exports = buildStart;
