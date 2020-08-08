const router = require("express").Router();

router.route("/")
    .get((req, res) => {
        res.send({
            msg: "Your access token was successfully validated!"
        });
    })

module.exports = router;