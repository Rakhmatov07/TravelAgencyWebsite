const IO = require("../utils/io");
const Service = new IO('./database/services.json');
const Model = require("../models/service");
const { v4: uuid } = require("uuid");
const path = require('path');
const fs = require('fs').promises;

const getServices = async(req, res) => {
    const services = await Service.read();
    res.redirect('admin', {services});
};

const createService = async(req, res) => {
    try {
                    // Read elements
        const services = await Service.read();
        const { name } = req.body;
        const { image } = req.files;
            // Check Service exists or not
        const findService = services.find(service => service.name === name);
        if(findService){
            return res.redirect('admin');
        }

            // Create new Service
        const imageName = `${uuid()}${path.extname(image.name)}`
        const newService = new Model(name, imageName);
        image.mv(process.cwd() + '/uploads/' + imageName)
        const data = services.length ? [...services, newService] : [newService];
        await Service.write(data);
        res.status(303).redirect('admin');
    } catch (error) {
        res.status(400).json({message: "Bad"});
    }
}

const deleteService = async(req, res) => {
    try {
        const services = await Service.read();
        const { id } = req.body;
        const deletedService = services.find(service => service.id === id);
        console.log(deletedService);
        const filteredServices = services.filter((service) => service.id !== id);
        const filePath = `/uploads/${deletedService.image}`;
        fs.unlink(process.cwd() + filePath, (error) => {
            if (error) {
                console.error('Error deleting file:', error);
              } else {
                console.log('File deleted successfully');
              }
        });
    
        await Service.write(filteredServices);
        res.status(200).json({message: "Deleted"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Bad"})
    }
}

module.exports = {
    getServices,
    createService,
    deleteService,
}