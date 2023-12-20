const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('');


    mongoose.connection.on('open' , () => {
        console.log("Mongo DB baglantisi kuruldu");
    });

    mongoose.connection.on('error' , (err) => {
        console.log("MongoDB error " ,err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongo DB bağlantısı kesildi');
    });

}




