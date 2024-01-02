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

// update san pham
const updateUserById = async (Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IDLoaiSanPham, SoLuongTon, SoLanBan, ID) => {
    let [results, fields] = await connection.query(
        `
            UPDATE SanPham
            SET Ten = ?, Gia = ?, GiaCu = ?, Sale_New = ?, MoTa = ?, Anh = ?, HinhAnh2 = ?, HinhAnh3 = ?,  IDLoaiSanPham = ?, SoLuongTon = ?, SoLanBan = ?
            WHERE ID = ?
        `,
        [Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IDLoaiSanPham, SoLuongTon, SoLanBan, ID]
    )
}

// hiển thị ra thong tin nguoi dung theo IDPhanQuyen
const getByIDAdmin = async (PhanQuyenID) => {
    let [results, fields] = await connection.query(
        `select PhanQuyenID from NguoiDung where PhanQuyenID = ?`
        ,
        [PhanQuyenID]
    )
    return results
}

// xoa san pham
const deleteUserById = async (ID) => {

    let [results, fields] = await connection.query(
        `
            DELETE FROM SanPham WHERE ID = ?
        `,
        [ID]
    )
}

// them san pham  -- chưa dùng đến, viết tạm
const insertSanPham = async (Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IdLoaiSP, SoLuongTon, SoLanBan) => {

    let [results, fields] = await connection.query(
        `
        INSERT INTO SanPham (Ten, Gia, GiaCu, Sale_New, MoTa, Anh, HinhAnh2, HinhAnh3, IDLoaiSanPham, SoLuongTon, SoLanBan)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IdLoaiSP, SoLuongTon, SoLanBan]
    )
}


module.exports = {
    getAllSP,
    getAllBoy_Girl,
    getSPSearch,
    getUserId,
    getByIDAdmin,
    updateUserById,
    deleteUserById,
    insertSanPham,

    

}