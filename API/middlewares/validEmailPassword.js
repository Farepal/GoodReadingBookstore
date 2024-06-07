const validEmailPassword = (req, res, next) => {
    const { email, password } = req.body;

    if (email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!emailRegex.test(email))
            return res.status(400).json({ message: 'Invalid email' });
    }

    if (password) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(password))
            return res.status(400).json({ message: 'Password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character, and minimum 8 characters' });
    }
    // password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character, and minimum 8 characters

    next();
}

module.exports = validEmailPassword;