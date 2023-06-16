const { v4: uuid } = require('uuid');

class User {
    constructor(username, password){
        this.id = uuid(),
        this.username = username,
        this.password = password,
        this.craetedAt = new Date()
    }
}

module.exports = User;