const express = require('express')
const router = express.Router()
const { Reviews } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')


router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const reviews = await Reviews.findAll({where: {PostId: postId}}); 
    res.json(reviews);
});

router.post("/", validateToken, async (req, res) => {
    const review = req.body;
    const username = req.user.username;
    review.username = username;
    await Reviews.create(review);
    res.json(review);
  });
  

router.delete("/:reviewId", validateToken, async (req, res) => { 
  const reviewId = req.params.reviewId;

  await Reviews.destroy({ 
    where: { 
      id: reviewId 
    }, 
  });  

  res.json("Review deleted");
 });

module.exports = router;
