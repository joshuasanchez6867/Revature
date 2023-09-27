const UserDAO = require('./dao.js')

const view = (req, res) => {
    UserDAO.viewGroceriesDAO
    .then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(200).send(err);
    });
}
module.exports = {view};