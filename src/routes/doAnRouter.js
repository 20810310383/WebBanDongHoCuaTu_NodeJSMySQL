const express = require('express');
const { 
    homeTrangChu,
    getHomePage,
    

    
} = require('../controllers/trangChuHomeController');

const { 
    TrangTimKiem,
    TrangTimKiem_post
} = require('../controllers/timKiemController');

const { 
    ChiTietSP,
    getChiTietSP,
    
} = require('../controllers/chiTietSPController');

const router = express.Router();

// -----------------------------------------------
router.get('/', getHomePage)

//router.get('/search', TrangTimKiem)
router.post('/search-post', TrangTimKiem_post)

// chi tiết sp
router.get('/chitietsp', getChiTietSP)
//router.get('/chitietsp', ChiTietSP)




module.exports = router;