const express = require('express');
const { 
    getHomepage,  
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
} = require('../controllers/homeController');
const router = express.Router();

// -----------------------------------------------

router.get('/', getHomepage)

router.get('/create', getCreatePage)
router.post('/create-user', postCreateUser)

router.get('/update/:idUser', getUpdatePage)
router.post('/update-user', postUpdateUser)

router.post('/delete-user/:idDelete', postDeleteUser)
router.post('/delete-user', postHandleRemoveUser)


module.exports = router;