import express from 'express';
import multer from 'multer';
import {uploadDocument, getAvatar, getMyRecords, submitUserData, getUserData, getMyAppointments, updateUserData, uploadAvatar, getMyDocumentsList, getDocumentSignedUrl} from '../controllers/userController.js'

const storage = multer.memoryStorage();

const imageFileFilter = (req, file, cb) => {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        console.log('File type invalid')
        cb(new Error('Please upload an image file less than 5mb'), false);
    }
};

const uploadImage = multer({ 
    storage: storage,
    fileFilter: imageFileFilter,
    limits : {
        fileSize: 5* 1024 * 1024,
    }
 });

const uploadDocumentFilter = multer({ 
    storage: storage,

    limits : {
        fileSize: 5* 1024 * 1024,
    }
 });

const router = express.Router();

router.post('/submit', submitUserData);

router.get('/pxData', getUserData)

router.get('/getMyAppointments', getMyAppointments)

router.get('/getMyRecords', getMyRecords)

router.patch('/updateUserData', updateUserData)

router.patch('/uploadDocument', uploadDocumentFilter.single('file'), uploadDocument)

router.patch('/uploadAvatar', (req, res, next) => {uploadImage.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'File is too large. Max size is 5MB.' });
            }
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    })}, uploadAvatar)

router.get('/:userId/getAvatar', getAvatar)

router.get('/getMyDocumentsList', getMyDocumentsList)

router.get('/getDocumentSignedUrl', getDocumentSignedUrl)

export default router;
