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

    let tenSP = req.body.searchSP

    let timkiemSp = await getSPSearch(tenSP)

    console.log(tenSP);

    //res.redirect("TrangChu/timKiem.ejs")
    res.render("TrangChu/timKiem.ejs", {listSearch: timkiemSp})
}






module.exports = {
    TrangTimKiem,
    TrangTimKiem_post
}