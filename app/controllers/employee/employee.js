

const uuid = require('uuid');
const { check, validationResult } = require('express-validator');

const moment = require('moment');
//const upload = multer({ dest: 'uploads/' })

exports.create = async function (req, res) {
    try{
        
        return res.status(200).json({ status: 200, data: 'hello all', message:"success"});
    }catch(e){
        await saveError(req,e,e.message);
        return res.status(400).json({ status: 400, message: e.message });
    }
}