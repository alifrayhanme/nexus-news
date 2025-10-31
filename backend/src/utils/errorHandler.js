const handleError = (res, error, message = "Internal server error") => {
    console.error(error);
    res.status(500).json({
        ok: false,
        message
    });
};

const handleNotFound = (res, message = "Resource not found") => {
    res.status(404).json({
        ok: false,
        message
    });
};

const handleValidationError = (res, message = "Validation failed") => {
    res.status(400).json({
        ok: false,
        message
    });
};

module.exports = { handleError, handleNotFound, handleValidationError };