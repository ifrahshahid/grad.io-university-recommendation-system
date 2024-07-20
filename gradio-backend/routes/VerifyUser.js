import Jwt, { decode } from "jsonwebtoken";
const verifyUser = (req, res, next) => {
    const token =  req.headers['Authorization'] || req.headers['authorization'] || req.session.token ;
    // console.log("Headers:", req.headers);
    console.log("Token:", token);
    console.log("Request URL:", req.url);
    if (!token) {
        return res.status(401).json({ Error: 'You are not authenticated' });
    } else {
        Jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ Error: 'Token is not valid' });
            } else {
                req.session.userId = decoded.id;
                req.session.name = decoded.name;
                next();
            }
        });
    }
};


export default verifyUser;
