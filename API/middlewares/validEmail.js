const validEmail = (req, res, next) => {
    const { email } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email))
        return res.status(400).json({ message: 'Invalid email' });

    next();
}

module.exports = validEmail;