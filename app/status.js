module.exports = function (req, res, next) {
    res.end('online');
    next();
};
