const jwt = require('jsonwebtoken');

function login(req, res) {
  const { password } = req.body || {};
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(500).json({ message: 'Admin password is not configured on the server.' });
  }

  if (!password || password !== expected) {
    return res.status(401).json({ message: 'The password doesn’t feel right. Try again?' });
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'valentine-secret', {
    expiresIn: '7d',
  });

  return res.json({ token });
}

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing admin token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'valentine-secret');
    if (!payload || payload.role !== 'admin') {
      return res.status(401).json({ message: 'Not allowed to see this memory wall.' });
    }
    req.admin = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Your admin session has expired. Please log in again.' });
  }
}

module.exports = { login, requireAdmin };

