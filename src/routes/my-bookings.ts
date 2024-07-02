import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel, { HotelType } from "../models/hotel";
const router = express.Router();
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({bookings:{
$elemMatch:{userId:req.userId}

},

 });
const results = hotels.map((hotel)=>{
const userBookings = hotel.bookings.filter((booking)=>booking.userId === req.userId)
const hotelWithUserBookings:HotelType = {
...hotel.toObject(),
bookings:userBookings,

};
return hotelWithUserBookings;
})
res.status(200).send(results);
    res.json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
