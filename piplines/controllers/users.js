const getUsername = async (req,res) => {
    res.render('user');
};
const setUsername = async (req, res) => {
    req.app.locals.username = req.body.Name;
    res.render('index', { title: 'Express', username: req.body.Name });
};
module.exports = { getUsername, setUsername };

