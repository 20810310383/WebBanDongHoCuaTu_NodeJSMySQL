const connection = require('../config/database');
const {
    getAllSP,
    getAllBoy_Girl
} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

const homeTrangChu = (req, res) => {
    res.render("TrangChu/home.ejs")
}

const getHomePage = async (req, res) => {
    let allSP = await getAllSP()            // lấy dữ liệu tất cả sản phẩm 
    let allSpNam = await getAllBoy_Girl(1)  // lấy dữ liệu tất cả sản phẩm là nam
    let allSpNu = await getAllBoy_Girl(2)  // lấy dữ liệu tất cả sản phẩm là nữ

    return res.render("TrangChu/home.ejs", {listSP: allSP, spNam: allSpNam, spNu: allSpNu})
}



module.exports = {
    homeTrangChu,
    getHomePage,
}
