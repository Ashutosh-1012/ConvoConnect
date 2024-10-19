// import jwt from "jsonwebtoken";
// import User from "../models/user.model.js";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) {
// 			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.sadkfjlasdskfj);

// 		if (!decoded) {
// 			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// export default protectRoute;

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// Extract token from cookies
		const token = req.cookies.jwt;

		// Check if the token exists
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Verify the token using the correct JWT secret
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Check if the token was decoded successfully
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Find the user by decoded userId, excluding the password field
		const user = await User.findById(decoded.userId).select("-password");

		// If no user is found, return 404
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach the user to the request object for further use
		req.user = user;

		// Call the next middleware
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
