const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ msg: 'unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ 'msg': 'unauthorized', error });
    }
}

module.exports = auth;