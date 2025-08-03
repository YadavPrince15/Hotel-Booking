import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        // Check if the user already registered a hotel
        const existingHotel = await Hotel.findOne({ owner });
        if (existingHotel) {
            return res.status(400).json({
                success: false,
                message: "Hotel is already registered by this user.",
            });
        }

        // Create new hotel
        await Hotel.create({ name, address, contact, city, owner });

        // Update user role to 'hotelOwner'
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        return res.status(201).json({
            success: true,
            message: "Hotel registered successfully.",
        });
    } catch (error) {
        console.error("Hotel registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message,
        });
    }
};
