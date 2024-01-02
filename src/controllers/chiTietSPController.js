const connection = require('../config/database');
const {
    getUserId,
    getAllSP
} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

// chi tiet sp
const ChiTietSP = async (req, res) => {

    res.render("TrangChu/chiTietSP.ejs")
}

const getChiTietSP = async (req, res) => {
    var sessions = req.session;
    let account = sessions.account
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(account);
    console.log(loggedIn);
    console.log(ten);

    const spID = req.query.idChiTietSP

    let sanpam = await getUserId(spID)

    let allSPCT = await getAllSP()            // lấy dữ liệu tất cả sản phẩm 

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    res.render("TrangChu/chiTietSP.ejs", {CTSanPham: sanpam, listSP: allSPCT, logIn: loggedIn, account, formatCurrency: formatCurrency})
}







module.exports = {
    ChiTietSP,
    getChiTietSP,


    
}