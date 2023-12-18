const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://adgzlemn50:YCuvayQZnpbGDuP1@movie-app.mgreoy1.mongodb.net/test?retryWrites=true&w=majority');


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




