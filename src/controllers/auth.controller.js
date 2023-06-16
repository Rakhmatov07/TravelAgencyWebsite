const IO = require('../utils/io');
const User = new IO('./database/users.json');
const bcrypt = require('bcrypt');
const jwt = require("../utils/jwt");


const logIn = async(req, res) => {
    try {
            // Read elements
        const users = await User.read();
        const { username, password } = req.body;
            // Find user by username
        const findUser = users.find((user) => user.username === username && user.password === password);
        if(!findUser){
            return res.redirect('/login');
        }
        // Compare password using bcrypt
        // const checkPass = await bcrypt.compare(password, findUser.password);
        // if(!checkPass){
            //     return res.redirect('/login');
            // }
            // If user is found save token to cookies and redirect to "admin" panel
        const token = jwt.sign({userId: findUser.id});
        res.cookie("token", token);
        res.status(303).redirect("/admin");
    } catch (error) {
      return res.redirect("/login");
    }
}

const loginGet = async(req, res) => {
    res.render('authentication-login');
}

module.exports = {
    logIn,
    loginGet
}