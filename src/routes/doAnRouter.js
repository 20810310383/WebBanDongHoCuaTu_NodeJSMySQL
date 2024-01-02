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

const { 
    loginHomeAdmin,
    dangNhapAdmin,
    dangXuatAdmin
} = require('../controllers/loginAdminController');

const { 
    homeAdmin,
    homeAdminQLSP,
    hienThiSP_TrangQL,
    getIDSp_Edit,
    editSP_form,
    postUpdateSP,
    postHandleRemoveUser,
    postDeleteUser,
    hienThiFormInsert,
    themMoiSP

} = require('../controllers/homeAdminController');



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

// xu ly dang ky tai khoan khach hang
router.post('/dang-ky', dangKyKH)

// xu ly dang nhap tai khoan khach hang
router.post('/dang-nhap', dangNhapKH)

// xu ly dang xuat tai khoan khach hang
router.get('/dang-xuat', dangXuat)

// form login Admin
router.get('/form-login-Admin', loginHomeAdmin)

// xu ly dang nhap tk Admin
router.post('/dang-nhap-Admin', dangNhapAdmin)

// xu ly dang xuat tai khoan admin
router.get('/dang-xuat-admin', dangXuatAdmin)

// xu ly form admin
router.get('/AdminHome', homeAdmin)

// xy ly form quan ly san pham
router.get('/quanlysp', hienThiSP_TrangQL)



// xu ly lay id edit
router.get('/edit-sp', getIDSp_Edit)

//router.get('/edit-sp', editSP_form)
// xu ly save sp
router.post('/edit-sp', postUpdateSP)


// lay ra id can xoa
router.post('/delete-spp', postDeleteUser)
// xu ly xoa sp
router.post('/delete-sp', postHandleRemoveUser)


// hien thi form de them san pham
router.get('/insert', hienThiFormInsert)
// xu ly them sp
router.post('/insert-sp', themMoiSP)


module.exports = router;