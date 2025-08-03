
// GET /api/user/

export const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const { role, recentSearchedCities } = req.user;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    console.error("GetUserData Error:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};


//store user Recent Searched Cities

export const storeRecentSearchedCities = async(req,res)=>{
    try {
        const {recentSearchedCities}=req.body;
        const user = await req.user;

        if(user.recentSearchedCities.length <3){
            user.recentSearchedCities.push(recentSearchedCities)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities)
        }
        await user.save();
        res.json({success:true, message:"city added"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}