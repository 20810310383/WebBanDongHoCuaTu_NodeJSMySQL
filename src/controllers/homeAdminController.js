const connection = require('../config/database');
const {
    getAllSP,
    updateUserById,
    getUserId,
    deleteUserById,
    

} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

const homeAdmin = (req, res) => {
    var sessions = req.session;
    let email = sessions.email
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(email);
    console.log(loggedIn);
    console.log(ten);


    res.render("TrangAdmin/homeAdmin.ejs", {logIn: loggedIn, email})
}

const homeAdminQLSP = (req, res) => {
    res.render("TrangAdmin/quanlySanPham.ejs")
}

const editSP_form = (req, res) => {
    res.render("TrangAdmin/trangEditSP.ejs")
}

// hien thi san pham ra trang qlsp
const hienThiSP_TrangQL = async (req, res) => {

    var sessions = req.session;
    let email = sessions.email
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(email);
    console.log(loggedIn);
    console.log(ten);

    let allSP = await getAllSP()

    console.log(allSP);

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    res.render("TrangAdmin/quanlySanPham.ejs", {QLSP: allSP, logIn: loggedIn, email, formatCurrency: formatCurrency})
}

// lay id cua sp de update
const getIDSp_Edit = async (req, res) => {
    var sessions = req.session;
    let email = sessions.email
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(email);
    console.log(loggedIn);
    console.log(ten);

    const idEdit = req.query.idEDIT 

    let EditID = await getUserId(idEdit)

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    res.render("TrangAdmin/trangEditSP.ejs", {editID: EditID, logIn: loggedIn, email, formatCurrency: formatCurrency})

}

// ham nay de update lai sp vua edit
const postUpdateSP = async (req, res) => {
   
    let idSP = req.body.idSP
    let Ten = req.body.tenSP
    let Gia = req.body.giaSP
    let GiaCu = req.body.giacuSP
    let SaleNew = req.body.salenew
    let Mota = req.body.mota
    let Img = req.body.hinhanh
    let Img2 = req.body.hinhanh2
    let Img3 = req.body.hinhanh3
    let IdLoaiSP = req.body.IdLoaiSP
    let SoLuongTon = req.body.SoLuongTon
    let SoLanBan = req.body.SoLanBan


    await updateUserById(Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IdLoaiSP, SoLuongTon, SoLanBan, idSP )
    req.flash('success', 'Chỉnh Sửa thành công')
    res.locals.message = req.flash();

    //res.send("update thành công")
    //res.redirect("/quanlysp")  
    res.render("TrangAdmin/thongBaoXoaOK.ejs")
}

// lay id de xac nhan xoa sp
const postDeleteUser = async (req, res) => {
    var sessions = req.session;
    let email = sessions.email
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(email);
    console.log(loggedIn);
    console.log(ten);

    const spId = req.query.idDelete

    let sp = await getUserId(spId)

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    res.render("TrangAdmin/trangDeleteSP.ejs", {spDelete: sp, logIn: loggedIn, email, formatCurrency: formatCurrency})
}

// xoa sp
const postHandleRemoveUser = async (req, res) => {
    let id = req.body.idSPDelete

    await deleteUserById(id)

    req.flash('success', 'Xóa Sản Phẩm thành công')
    res.locals.message = req.flash();
    //res.send("xóa ok")
    //res.redirect("/quanlysp")  
    res.render("TrangAdmin/thongBaoXoaOK.ejs")
}

// hien thi form insert sp
const hienThiFormInsert = (req, res) => {

    var sessions = req.session;
    let email = sessions.email
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(email);
    console.log(loggedIn);
    console.log(ten);

    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    res.render("TrangAdmin/trangInsertSP.ejs", {logIn: loggedIn, email, formatCurrency: formatCurrency})
}

// them moi sp
const themMoiSP = async (req, res) => {
    
    let Ten = req.body.tenSP
    let Gia = req.body.giaSP
    let GiaCu = req.body.giacuSP
    let SaleNew = req.body.salenew
    let Mota = req.body.mota
    let Img = req.body.hinhanh
    let Img2 = req.body.hinhanh2
    let Img3 = req.body.hinhanh3
    let IdLoaiSP = req.body.IdLoaiSP
    let SoLuongTon = req.body.SoLuongTon
    let SoLanBan = req.body.SoLanBan

    let [results, fields] = await connection.query(
        `
            INSERT INTO SanPham (Ten, Gia, GiaCu, Sale_New, MoTa, Anh, HinhAnh2, HinhAnh3, IDLoaiSanPham, SoLuongTon, SoLanBan)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [Ten, Gia, GiaCu, SaleNew, Mota, Img, Img2, Img3, IdLoaiSP, SoLuongTon, SoLanBan]
    )
    req.flash('success', 'Thêm Sản Phẩm thành công')
    res.locals.message = req.flash();
    console.log(">> check spList: ", results); 
    
    // Hàm để định dạng số tiền thành chuỗi có ký tự VND
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }
    
    //res.send("create thành công")
    res.render("TrangAdmin/thongBaoXoaOK.ejs")
}



module.exports = {
    homeAdmin,
    homeAdminQLSP,
    hienThiSP_TrangQL,
    getIDSp_Edit,
    postUpdateSP,
    editSP_form,
    postDeleteUser,
    postHandleRemoveUser,
    themMoiSP,
    hienThiFormInsert
}