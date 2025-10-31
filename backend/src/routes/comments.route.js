const { Router, json } = require("express");
const commentsController = require("../controllers/comments.controller");
const { commentValidation, handleValidationErrors } = require("../middlewares/security.middleware.js");
const { checkAuthentication } = require("../middlewares/checkAuth.middleware.js");

const router = Router();

router.use(json());
router.get("/:postId", commentsController.getComments);
router.post("/:postId", checkAuthentication, commentValidation, handleValidationErrors, commentsController.addComment);
router.delete("/:commentId", checkAuthentication, commentsController.deleteComment);

module.exports = router;
