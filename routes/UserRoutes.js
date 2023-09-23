const router=require('express').Router();
let {addToLikedMovies,getLikedMovies,removeFromLikedMovies}=require('../controllers/UserController');
router.post('/add',addToLikedMovies);
router.put('/deleteMovie',removeFromLikedMovies)
router.get('/liked/:email',getLikedMovies)
module.exports=router;

