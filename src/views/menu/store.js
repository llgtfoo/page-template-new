const importAll = (context) => {
  const map = {}
  for (const key of Object.keys(context)) {
    const keyArr = key.split('/')
    keyArr.shift() // 移除.
    if (keyArr[2]) {
      map[keyArr[2]] =
        context[key] && context[key].default
    }
  }
  return map
}
const req = import.meta.globEager("./views/children/*/store.js") //读文件

const modules = importAll(req)


export default () => {
  return {
    namespaced: true,
    modules,
  }
}