const { v4: uuid } = require('uuid');

class Quote{
    constructor(name, job, image, message){
        this.id = uuid(),
        this.name = name, 
        this.job = job,
        this.image = image,
        this.message = message,
        this.createdAt = new Date()
    }
}

module.exports = Quote;