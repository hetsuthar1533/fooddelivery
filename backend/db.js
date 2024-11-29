const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/gofoofmern";

const mongoDB = async () => {
    try {
        // Connect to MongoDB using async/await
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,     // Use the new URL parser
            useUnifiedTopology: true, // Use the new server topology engine
        });
        console.log("Connected to MongoDB");

        // Access the 'fooditems' collection and fetch data
        const foodItemsCollection = mongoose.connection.db.collection("fooditems");
        const fetched_data = await foodItemsCollection.find({}).toArray();

        // Fetch 'foodCategory' collection data
        const foodCategoryCollection = mongoose.connection.db.collection("foodcategory");
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();
        // console.log(foodCategoryData);

        // Assign fetched data to global variables
        global.fooditems = fetched_data;
        global.foodCategory = foodCategoryData;
        // console.log(); // Log the data

        // global.fooditems = data
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process on failure
    }
};

module.exports = mongoDB;