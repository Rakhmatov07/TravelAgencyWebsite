const { v4: uuid } = require('uuid');

class Service {
    constructor(name, image){
        this.id = uuid(),
        this.name = name,
        this.image = image,
        this.createdAt = new Date()
    }
}

module.exports = Service;