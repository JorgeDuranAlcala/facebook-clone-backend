import Express from 'express'

export const extract_from_cookies = function (req: Express.Request){

    let token = null;

    if(req && req.cookies) {
        token = req.cookies['token'];
    }

    return token;

}