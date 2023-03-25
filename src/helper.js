const path = require("path");
const fg = require("fast-glob");

function getCode(code) {
  let reg = /\<script[\s]*.*?\>/g;
  const m = code.match(reg);
  let jsCode = "";

  if (Array.isArray(m)) {
    let startI = 0;
    for (let i = 0; i < m.length; i++) {
      startI = code.indexOf(m[i], startI);
      if (startI > -1) {
        code = code.substring(startI + m[i].length);
        reg = /\<\/script[\s]*\>/;
        const rm = code.match(reg);
        if (Array.isArray(rm)) {
          jsCode += code.substring(0, rm.index);
          jsCode += "\n";
        }
      }
    }
  }

  return jsCode;
}

function parseImports(code) {
  const reg = /import[^\1]*?(from)[\s]+('|")(.*?)\2/g;
  const m = code.match(reg);
  const imps = [];
  if (Array.isArray(m)) {
    for (let i = 0; i < m.length; i++) {
      m[i].match(reg);
      imps.push(RegExp.$3);
    }
  }
  return imps;
}

function createInitial(pluginName) {
  global.conflict = false;
  global.igs = [];
  global.pluginName = pluginName;
}

function filter(files, igs) {
  files = Array.isArray(files) ? files : [];
  files = files.filter((v) => !!path.extname(v));
  if (this.checkType.length) {
    files = files.filter(
      (v) =>
        this.checkType.includes(path.extname(v)) &&
        !igs.find((i) => v.includes(i))
    );
  }
  return files;
}

function normalize(rootUrl) {
  let igs = this.igs;
  function _join(paths,isAddLast=true){
    let url = rootUrl
    paths.forEach(v=>{
        url+=path.sep + v
    })
    return isAddLast ? url + path.sep : url
  }
  if (!this.isStringArray) {
    const newIgs = [];
    for (let i = 0; i < igs.length; i++) {
      const v = igs[i];
      if (typeof v !== "string") {
        const { file = "", exclude = [] } = v || {};
        if (Array.isArray(exclude) && exclude.length) {
          const files = fg.sync( _join([file]) + "**", {
            onlyFiles: false,
          });
          if (Array.isArray(files) && files.length) {
            files.forEach((f) => {
              if (!path.extname(f)) {
                const ex =  exclude.find(e=>f.includes(_join([file,e],false)))
                if(!ex){
                    newIgs.push(f)
                }
              }
            });
          }
          continue;
        }
        newIgs.push(path);
        continue;
      }

      newIgs.push(v);
    }

    igs = newIgs
  }
  igs = igs.map((v) => path.resolve(rootUrl, v));
  return igs;
}

module.exports = {
  getCode,
  parseImports,
  createInitial,
  filter,
  normalize,
};
