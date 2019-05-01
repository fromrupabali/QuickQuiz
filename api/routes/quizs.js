const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const QuizController = require('../controllers/quizs');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
       cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const upload = multer({ 
    storage: storage, 
    limits:{
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get('/', QuizController.get_all_quizs);
router.post('/', upload.single('quizImage'), QuizController.create_quiz);
router.get('/:quizId', QuizController.individual_quiz);
router.delete('/:quizId', checkAuth, QuizController.delete_quiz);
router.patch('/:quizId', checkAuth, QuizController.update_quiz);

module.exports = router;