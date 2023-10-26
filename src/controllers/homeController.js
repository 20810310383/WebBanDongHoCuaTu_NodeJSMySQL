const connection = require('../config/database');
const {
    getAllUsers,
    getUserId,
    updateUserById,
    deleteUserById
} = require("../services/CRUDService")
const notifier = require('node-notifier')
// ---------------------------------------------------------------

const getHomepage = async (req, res) => {
    
    //let [results, fields] = await connection.query("select * from Users")
    let results = await getAllUsers()

    return res.render("home.ejs", {listUsers: results})
}

const getCreatePage = (req, res) => {
    res.render("create.ejs")
}

const postCreateUser = async (req, res) => {
    //console.log("req.body >>", req.body)
    //let {email, name, city} = req.body
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    console.log("email =>>", email, "\nname  =>>", name, "\ncity =>>", city)

    // CÁCH 1 DÙNG FUNCITON
    // connection.query(
    //     `
    //         INSERT INTO Users (email, name, city)
    //         VALUES (?, ?, ?)
    //     `,
    //     [email, name, city],
    //     function (err, results) {
    //         //console.log(results)
    //         res.send("create thành công")
    //     }
    // )
    
    // CÁCH 2 DÙNG ASYNC AWAIT
    //const [results, fields] = await connection.query(` select * from Users u`)
    //console.log(">> check userlist: ", results);

    let [results, fields] = await connection.query(
        `
            INSERT INTO Users (email, name, city)
            VALUES (?, ?, ?)
        `,
        [email, name, city]
    )
    console.log(">> check userlist: ", results); 
    
    //res.send("create thành công")
    res.redirect("/")
    
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.idUser
    console.log("req.params:: ", req.params, userId);

    let user = await getUserId(userId)
 
    res.render("edit.ejs", {userEdit: user})    // x <- y
}

const postUpdateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    let userId = req.body.userId

    await updateUserById(name, email, city, userId)

    //res.send("update thành công")
    res.redirect("/")  
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.idDelete

    let user = await getUserId(userId)

    res.render("delete.ejs", {userEdit: user})
}

const postHandleRemoveUser = async (req, res) => {
    let id = req.body.idUserDelete

    await deleteUserById(id)

    //res.send("xóa ok")
    res.redirect("/")  
}

module.exports = {
    getHomepage, 
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}