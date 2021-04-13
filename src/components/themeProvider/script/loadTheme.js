export default (type, Arr, cb) => {
  import(`../theme/${type}.theme.less`)
  if ([...Arr].includes(type)) {
    window.location.reload()
  } else {
    cb(type)
  }
}