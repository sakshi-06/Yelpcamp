const express = require('express');
const mongoose = require('mongoose');
const app=express();
const path= require('path');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    
});

const db= mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>
{
    console.log("database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async()=>{
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price =Math.floor(Math.random()*20)+1;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://unsplash.com/collections/483251/in-the-woods",
            description: 'Lorem jdsnfkeogi aiwere0rr kdmcnsdlkfwefo !',
            price
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});