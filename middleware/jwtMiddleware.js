const jwt = require('jsonwebtoken')

const jwtMiddleware = async (req, res, next) => {
    // console.log('inside jwtMiddleware');
    // console.log(req.headers);
    
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const jwtResponse = jwt.verify(token, 'secretKey')
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()

    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }
}

module.exports = jwtMiddleware