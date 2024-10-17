import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
    const expiresIn = '1h';

    const token = jwt.sign({ id: userId }, secretKey, { expiresIn });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000 // 1 hour in milliseconds
    };

    res.cookie('jwt', token, cookieOptions);

    return token;
};

export default generateTokenAndSetCookie;