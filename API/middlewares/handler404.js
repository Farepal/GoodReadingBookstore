const handler404 = (req, res, next) => {
    try {
        res.status(404).json({
            status: 'error',
            message: 'Not Found'
        });
    } catch (error) {
        next(error);
    }
}

module.exports = handler404;