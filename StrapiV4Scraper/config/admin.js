module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '66baeb3d26e4d835c8e6704cf402c425'),
  },
});
