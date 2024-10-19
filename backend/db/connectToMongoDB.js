// import mongoose from "mongoose";


// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(`mongodb+srv://sirhello033:sirhello033@cluster0.zf4xx.mongodb.net/?retryWrites=true&w=majority` || process.env.MONGO_DB_URI);
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.log("Error connecting to MongoDB", error.message);
// 	}
// };

// export default connectToMongoDB;


import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		// Always prefer the environment variable for the URI
		const mongoURI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/defaultDB'; // Local fallback if env var is missing
		
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1); // Exit the process if MongoDB connection fails
	}
};

export default connectToMongoDB;
