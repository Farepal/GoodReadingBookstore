const validEmailPassword = (req, res, next) => {
    const { email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character, and minimum 8 characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email))
        return res.status(400).json({ message: 'Invalid email' });

    if (!passwordRegex.test(password))
        return res.status(400).json({ message: 'Password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character, and minimum 8 characters' });

    next();
}

module.exports = validEmailPassword;