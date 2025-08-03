import { getAuth } from '@clerk/express';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found in DB" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
































// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//     try {
//         const {userId} = req.auth._id;  // Use optional chaining to safely access

//         if (!userId) {
//             return res.status(401).json({ success: false, message: "Not authenticated" });
//         } else {
//              const user = await User.findById(userId);
//               req.user = user; 
//               next();
//         }

       
//         // if (!user) {
//         //     return res.status(401).json({ success: false, message: "User not found" });
//         // }

//        // Attach the user to the request object
        
//     } catch (error) {
//         console.error("Protect middleware error:", error);
//         return res.status(500).json({ success: false, message: "Server error" });
//     }
// };
