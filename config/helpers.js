const helpers = {
    randomString: (len=100) => {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let randStr = "";
        let length = chars.length;
        for(let i = 1; i <= len; i++){
            let posn = Math.floor(Math.random() * (length-1));
            randStr += chars[posn];
        }
        return randStr;
    } 
}

module.exports = helpers;