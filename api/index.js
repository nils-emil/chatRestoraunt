const auth = require('../middleware/auth');
const router = require('express').Router();
const orderPublicRoutes = require('./public/orderController');
const orderPrivateRoutes = require('./protected/orderController');
const menuItemPrivateRoutes = require('./protected/menuItemController');
const menuItemPublicRoutes = require('./public/menuItemController');
const tabPublicRoutes = require('./public/tableController');
const categoryPrivateRoutes = require('./protected/categoryController');
const imagePrivateRoute = require('./protected/imageController');
const tablePrivateRoutes = require('./protected/tableController');
const categoryPublicRoutes = require('./public/categoryController');
const userPublicRoute = require('./public/userController');
const adminUi = require('./protected/uiController');
const uiPublicRoute = require('./public/uiController');
const userPrivateRoute = require('./protected/userController');

router.use('/api/client/category', categoryPublicRoutes);
router.use('/api/user', userPublicRoute);
router.use('/api/menu', menuItemPublicRoutes);
router.use('/api/table', tabPublicRoutes);
router.use('/api/menu/order', orderPublicRoutes);
router.use('/api/ui', uiPublicRoute);

router.use(auth);
router.use('/api/menu/order', orderPrivateRoutes);
router.use('/api/admin/image', imagePrivateRoute);
router.use('/api/menu', menuItemPrivateRoutes);
router.use('/api/user', userPrivateRoute);
router.use('/api/category', categoryPrivateRoutes);
router.use('/api/admin/table', tablePrivateRoutes);
router.use('/api/ui/admin', adminUi);

module.exports = router;
