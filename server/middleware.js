export const userCanCreate = (req, res, next) => (
  ((req.user && req.user.canCreate) || req.method === 'GET')
    ? next()
    : res.status(403).send('Permission required to create locations')
);
