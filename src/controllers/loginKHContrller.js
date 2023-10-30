const connection = require('../config/database');

// ---------------------------------------------------------------

const loginHomeKH = (req, res) => {
    res.render("Login/loginKH.ejs")
}

// đăng ký
const dangKyKH = async (req, res) => {
    let account = req.body.account;
    let username = req.body.name;
    let password = req.body.pass;
    let email = req.body.email;
  
    if (account && password && email) {
        try {
            const [results, fields] = await connection.query('SELECT TaiKhoan FROM NguoiDung WHERE TaiKhoan = ?', [account])
            
            if (results.length > 0) {

                res.status(400).send('Tài khoản đã tồn tại!')

            } else {

                const [insertResults, insertFields] = await connection.query(
                    `INSERT INTO NguoiDung(TaiKhoan, Ten, MatKhau, Email) VALUES(?,?,?,?)`,
                    [account, username, password, email]
                )
    
                if (insertResults.affectedRows === 1) {
                    res.status(200).send('Đăng ký thành công!')

                } else {
                    res.status(500).send('Lỗi trong quá trình xử lý đăng ký.')
                }
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

const dangKyKH_test =  (req, res) => {
    
    //     let account = req.body.account;
    //     let username = req.body.name;
    //     let password = req.body.pass;
    //     let email = req.body.email;
    
    //     if (account && password && email) {
      
    //         connection.query('SELECT TaiKhoan FROM NguoiDung WHERE TaiKhoan = ?', [account], function(error, results, fields) {
    
    //             if (error) throw error;
    //             // If the account exists
    //             if (results.length > 0) {
    //                 // Authenticate the user
    //                 response.send('Tài khoản đã tồn tại!');
    //             } else {
    //                 connection.query('INSERT INTO NguoiDung(TaiKhoan, Ten, MatKhau, Email) VALUES(?,?,?,?)', [account, username , password, email ], function(error, results) {
    //                     // If there is an issue with the query, output the error
    //                     if (error) throw error;
    //                     // If the account exists
                                
    //                 });
    //                 response.send('Đăng ký thành công!');
    //             }			
    //             response.end();
    //         });
    //     } else {
    //         response.send('Hãy nhập tài khoản và mật khẩu!');
    //         response.end();
    //     }
    
}
// ------------------

// đăng nhập
const dangNhapKH = async (req, res) => {
    let account = req.body.taikhoan;
    let password = req.body.matkhau;

    if (account && password) {
        try {
            const [results, fields] = await connection.query('SELECT TaiKhoan, MatKhau FROM NguoiDung WHERE TaiKhoan = ? AND MatKhau = ?',  [account, password])
            
            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true
				req.session.account = account
                res.locals.account = req.session.account

				res.redirect('/');
                //res.send('thành công');
                //return res.render('TrangChu/home.ejs', { loggedIn: true, account });
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
    //  ---------------------------
  
    // if (account && password) {

	// 	connection.query('SELECT * FROM NguoiDung WHERE TaiKhoan = ? AND MatKhau = ?', [account, password], function(error, results, fields) {
	// 		// If there is an issue with the query, output the error
	// 		if (error) throw error;
	// 		// If the account exists
	// 		if (results.length > 0) {
	// 			// Authenticate the user
	// 			req.session.loggedin = true;
	// 			req.session.username = username;
	// 			// Redirect to home page
	// 			res.redirect('/home');
	// 		} else {
	// 			res.send('Tài khoản hoặc mật khẩu không chính xác!');
	// 		}			
	// 		res.end();
	// 	});
	// } else {
	// 	res.send('Hãy nhập tài khoản và mật khẩu!!');
	// 	res.end();
	// }
}

const load_trang_home = (req, res) => {
    let account = req.body.taikhoan;
    let password = req.body.matkhau;

    if (req.session && req.session.TaiKhoan) {
        const { HoTen } = req.session.TaiKhoan
        res.send(`Xin Chào: ${HoTen} | <a href="/DangXuat">Đăng Xuất</a>`)
    } else {
        res.send('Bạn chưa đăng nhập.')
    }
}


// dang xuat
const dangXuat = (req, res) => {
    req.session = null

    // Redirect to the login page
    res.redirect('/')
}


module.exports = {
    loginHomeKH,
    dangKyKH,
    dangNhapKH,
    dangXuat
}