
function getCode(code){
    let reg = /\<script[\s]*.*?\>/g
    const m = code.match(reg)
    let jsCode = ''

    if(Array.isArray(m)){
        let startI = 0
        for(let i=0;i<m.length;i++){
            startI =  code.indexOf(m[i],startI)
            if(startI > -1){
                code = code.substring(startI + m[i].length)
                reg = /\<\/script[\s]*\>/
                const rm = code.match(reg)
                if(Array.isArray(rm)){
                    jsCode+= code.substring(0,rm.index)
                    jsCode+= '\n'
                }
                
            }
        }
    }

    return jsCode
}


function parseImports(code){
    const reg = /import[^\1]*?(from)[\s]+('|")(.*?)\2/g
    const m = code.match(reg)
    const imps = []
    if(Array.isArray(m)){
        for(let i=0;i<m.length;i++){
            m[i].match(reg)
            imps.push(RegExp.$3)
        }
    }
    return imps
}

function createInitial(pluginName){
    global.conflict = false
    global.igs = []
    global.pluginName = pluginName
}

module.exports = {
    getCode,
    parseImports,
    createInitial
};