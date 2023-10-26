const express = require('express');
const router = express.Router();


// lấy dữ lệu từ DB
router.get('/', (req, res, next) => {})

// thêm mới dữ liệu vào DB
router.post('/', (req, res, next) => {})

// update dữ liệu trong DB
router.put('/', (req, res, next) => {})

// xóa dữ liệu trong DB
router.delete('/', (req, res, next) => {})

module.exports = router