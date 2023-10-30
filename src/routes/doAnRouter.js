const express = require('express');
const { 
    homeTrangChu,
    getHomePage ,
    
} = require('../controllers/trangChuHomeController');

const { 
    TrangTimKiem,
    TrangTimKiem_post
} = require('../controllers/timKiemController');

const { 
    ChiTietSP,
    getChiTietSP
} = require('../controllers/chiTietSPController');

const { 
    loginHomeKH
} = require('../controllers/loginKHContrller');

const { 
    dangKyKH,
    dangNhapKH,
    dangXuat
} = require('../controllers/loginKHContrller');

const router = express.Router();

// -----------------------------------------------
router.get('/', getHomePage)

//router.get('/search', TrangTimKiem)
router.post('/search-post', TrangTimKiem_post)

// chi tiết sp
router.get('/chitietsp', getChiTietSP)
//router.get('/chitietsp', ChiTietSP)

// form login KH
router.get('/login-kh', loginHomeKH)

// xu ly dang ky tk
router.post('/dang-ky', dangKyKH)

// xu ly dang nhap tk
router.post('/dang-nhap', dangNhapKH)

// xu ly dang xuat
router.get('/dang-xuat', dangXuat)






module.exports = router;