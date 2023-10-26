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
    const spID = req.query.idChiTietSP

    let sanpam = await getUserId(spID)

    let allSPCT = await getAllSP()            // lấy dữ liệu tất cả sản phẩm 

    res.render("TrangChu/chiTietSP.ejs", {CTSanPham: sanpam, listSP: allSPCT})
}







module.exports = {
    ChiTietSP,
    getChiTietSP,


    
}