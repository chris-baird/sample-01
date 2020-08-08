
module.exports = {
    getMessages: (req, res) => {
        res.send({
            msg: "Your access token was successfully validated!"
        });
    }
}