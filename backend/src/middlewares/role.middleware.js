/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Role-based access control middleware
 * BACKEND CONTRACT: Ensures only allowed roles can access routes
 * TODO: Expand to permission scopes if needed
 */

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden', message: 'Insufficient role', code: 403 });
    }
    next();
  };
}

module.exports = { requireRole };


