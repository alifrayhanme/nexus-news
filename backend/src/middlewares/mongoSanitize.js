const mongoSanitize = (req, res, next) => {
    const sanitize = (obj) => {
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                if (/^\$/.test(key)) {
                    delete obj[key];
                } else if (typeof obj[key] === 'object') {
                    sanitize(obj[key]);
                }
            }
        }
    };

    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);
    next();
};

module.exports = mongoSanitize;