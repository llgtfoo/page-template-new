export default (type,count,cb) => {
const req = require.context('../theme', true, /\.less$/)
    import(`../theme/${type}.theme.less`)
    cb()
    if(count>req.keys().length){
        window.location.reload();
    }
}