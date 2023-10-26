const connection = require("../config/database") 

// hiển thị ra tất cả sp
const getAllSP = async () => {
    let [results, fields] = await connection.query("select * from SanPham")
    return results
}

// hiển thị ra sp nam/nữ 
const getAllBoy_Girl = async (IDLoaiSanPham) => {
    let [results, fields] = await connection.query(
        `select * from SanPham where IDLoaiSanPham = ?`
        ,
        [IDLoaiSanPham]
    )
    return results
}

// chức năng search sản phẩm
const getSPSearch = async (tensp) => {
    let [results, fields] = await connection.query(
        `
            select * from SanPham where Ten like ?
        `
        ,
        [`%${tensp}%`]
    )
    return results
}

// lấy id sp khi click
const getUserId = async (spID) => {
    let [results, fields] = await connection.query(
        `select * from SanPham where ID = ?`,
        [spID]
    )

    console.log("check kq: ", results);

    let IDCuaSP = results && results.length > 0 ? results[0] : {}

    return IDCuaSP
}


module.exports = {
    getAllSP,
    getAllBoy_Girl,
    getSPSearch,
    getUserId,
    

}