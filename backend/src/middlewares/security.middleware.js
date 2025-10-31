const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const xss = require('xss');

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP'
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // limit auth attempts
    message: 'Too many authentication attempts'
});

// Input sanitization
const sanitizeInput = (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next();
};

// Validation rules
const postValidation = [
    body('title').trim().isLength({ min: 1, max: 200 }).escape(),
    body('content').trim().isLength({ min: 1 }).escape(),
    body('category').trim().isLength({ min: 1, max: 50 }).escape()
];

const userValidation = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
];

const registerValidation = [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().isLength({ min: 1, max: 100 }).escape(),
    body('password').isLength({ min: 6 })
];

const commentValidation = [
    body('content').trim().isLength({ min: 1, max: 500 }).escape()
];

// Error handler for validation
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    limiter,
    authLimiter,
    sanitizeInput,
    postValidation,
    userValidation,
    registerValidation,
    commentValidation,
    handleValidationErrors
};