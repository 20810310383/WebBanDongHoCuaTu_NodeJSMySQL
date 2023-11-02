const connection = require('../config/database');

const {
    getByIDAdmin
} = require("../services/CRUDDoAn")
// ---------------------------------------------------------------

const loginHomeAdmin = (req, res) => {
    res.render("Login/loginAdmin.ejs")
}

// đăng nhập
const dangNhapAdmin = async (req, res) => {
    let email = req.body.email_admin;
    let password = req.body.mk_admin;
    let IdPhanQuyen = await getByIDAdmin(1)

    console.log(IdPhanQuyen);
    console.log(email);
    console.log(password);

    if (email && password) {
        try {
            const [results, fields] = await connection.query(
                `
                SELECT Email, MatKhau, PhanQuyenID FROM NguoiDung WHERE Email = ? AND MatKhau = ? AND PhanQuyenID = 1              
                `,  [email, password])
            console.log(results);
            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true
				req.session.email = email
                
                req.session.ten = "tu mo";

                sessions=req.session;
                console.log(sessions);

				res.redirect('/AdminHome');
                //res.send('thành công');
                //res.render('TrangChu/home.ejs', { loggedIn: true, account });
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

// dang xuat
const dangXuatAdmin = (req, res) => {
    req.session.destroy(err => {
        if (err) {
          console.error("Lỗi khi đăng xuất:", err);
          res.status(500).send('Lỗi khi đăng xuất');
        } else {
          res.redirect('/AdminHome'); // Chuyển hướng về trang chính sau khi đăng xuất
        }
      });
  
      console.log(req.session.destroy());
}



module.exports = {
    loginHomeAdmin,
    dangNhapAdmin,
    dangXuatAdmin
}