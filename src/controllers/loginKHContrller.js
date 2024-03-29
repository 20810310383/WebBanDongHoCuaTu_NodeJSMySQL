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
    var sessions

    if (account && password) {
        try {
            const [results, fields] = await connection.query('SELECT TaiKhoan, MatKhau FROM NguoiDung WHERE TaiKhoan = ? AND MatKhau = ? ',  [account, password])
            
            if (results.length > 0) {
                // Authenticate the user
				req.session.loggedIn = true
				req.session.account = account

                req.session.ten = "tu mo";

                sessions=req.session;
                console.log(sessions);
                //res.cookie('user_account', req.session.account);
                // req.flash('success', 'Đăng nhập thành công')
                // res.locals.message = req.flash();
				//res.redirect('/');
                //res.send('thành công');
                //req.flash('success', 'Đăng nhập thành công')
                res.redirect('/');
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

// dang xuat
const dangXuat = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Lỗi khi đăng xuất:", err);
        res.status(500).send('Lỗi khi đăng xuất');
      } else {
        res.redirect('/'); // Chuyển hướng về trang chính sau khi đăng xuất
      }
    });

    console.log(req.session.destroy());
}
  


module.exports = {
    loginHomeKH,
    dangKyKH,
    dangNhapKH,
    dangXuat
}