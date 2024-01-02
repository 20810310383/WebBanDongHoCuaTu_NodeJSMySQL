const connection = require('../config/database');
const {
    getSPSearch
} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

// tìm kiếm sp
const TrangTimKiem = async (req, res) => {
   
    let tenSP = req.body.searchSP

    let timkiemSp = await getSPSearch(tenSP)

    console.log(tenSP);

    res.render("TrangChu/timKiem.ejs", {listSearch: timkiemSp})
}

const TrangTimKiem_post = async (req, res) => {

    var sessions = req.session;
    let account = sessions.account
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(account);
    console.log(loggedIn);
    console.log(ten);

    let tenSP = req.body.searchSP

    let timkiemSp = await getSPSearch(tenSP)

    console.log(tenSP);

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    //res.redirect("TrangChu/timKiem.ejs")
    res.render("TrangChu/timKiem.ejs", {listSearch: timkiemSp, logIn: loggedIn, account, formatCurrency:formatCurrency})
}






module.exports = {
    TrangTimKiem,
    TrangTimKiem_post
}