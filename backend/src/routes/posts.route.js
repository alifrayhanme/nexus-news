const { Router, json, urlencoded } = require("express");
const postController = require("../controllers/posts.controller");
const { postValidation, handleValidationErrors } = require("../middlewares/security.middleware.js");
const { checkAuthentication } = require("../middlewares/checkAuth.middleware.js");

const router = Router();

router.use(json());

router.get("/", postController.getPosts);
router.get("/categories", postController.getCategories);
router.get("/user/:userId", postController.getUserPosts);
router.get("/:id", postController.getPost);
router.post(
    "/create",
    checkAuthentication,
    urlencoded({ extended: true, limit: "1mb" }),
    postValidation,
    handleValidationErrors,
    postController.createPost
);
router.put("/:id", checkAuthentication, urlencoded({ extended: true, limit: "1mb" }), postValidation, handleValidationErrors, postController.updatePost);
router.delete("/:id", checkAuthentication, postController.deletePost);

router.patch(
    "/:id",
    checkAuthentication,
    urlencoded({ extended: true, limit: "1mb" }),
    postValidation,
    handleValidationErrors,
    postController.editPost
);
module.exports = router;
