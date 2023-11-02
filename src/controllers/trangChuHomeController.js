const connection = require('../config/database');
const {
    getAllSP,
    getAllBoy_Girl
} = require("../services/CRUDDoAn")

// ---------------------------------------------------------------

const homeTrangChu = (req, res) => {
    // let account = req.body.taikhoan;
    // var sessions
    // req.session.loggedIn = true
	// req.session.account = account
    // sessions=req.session;
    // console.log(sessions);


    res.render("TrangChu/home.ejs")
}

const getHomePage = async (req, res) => {
    var sessions = req.session;
    let account = sessions.account
    let loggedIn = sessions.loggedIn
    let ten = sessions.ten
    
    console.log(sessions);
    console.log(account);
    console.log(loggedIn);
    console.log(ten);

    let allSP = await getAllSP()            // lấy dữ liệu tất cả sản phẩm 
    let allSpNam = await getAllBoy_Girl(1)  // lấy dữ liệu tất cả sản phẩm là nam
    let allSpNu = await getAllBoy_Girl(2)  // lấy dữ liệu tất cả sản phẩm là nữ

    return res.render("TrangChu/home.ejs", {listSP: allSP, spNam: allSpNam, spNu: allSpNu, logIn: loggedIn, account})
}

// dang nhap
const dangNhapKH_2 = async (req, res) => {
    let account = req.body.taikhoan;
    let password = req.body.matkhau;

    if (account && password) {
        try {
            const [results, fields] = await connection.query('SELECT TaiKhoan, MatKhau FROM NguoiDung WHERE TaiKhoan = ? AND MatKhau = ?',  [account, password])
            
            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true;
				req.session.account = account;
                
				// Redirect to home page
				//res.redirect('/');
                //res.send('thành công');
                res.render('TrangChu/home.ejs', { loggedIn: true, account });
            } else {
                res.send('Tài khoản hoặc mật khẩu không chính xác!');
            }

        } catch (error) {
            console.error("Lỗi truy vấn:", error)
            res.status(500).send('Lỗi trong quá trình xử lý đăng ký.')

        } finally {
            res.end()
        }

    } else {
        res.status(400).send('Hãy nhập tài khoản và mật khẩu!')
        res.end()
    }

}



module.exports = {
    homeTrangChu,
    getHomePage,
    
    
}
