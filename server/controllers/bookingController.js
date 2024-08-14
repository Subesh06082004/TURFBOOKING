import Booking from "../models/booking.js";
import Turf from "../models/turf.js";
import User from "../models/user.js";
import stripe from "stripe";
const stripeInstance = stripe(
  "sk_test_51OFXvhSGECD7it2Qqp5l1CPEkXo3Xui2zaQMOjJNwErU42xE7qK29UKOAz2xwjpFkz6vdGl5QNHrH4LCgxsNvCd500pdUj3jXU"
);


export const onSuccessFullPayment = async (req , res ) => {

    try {
      const { bookingId } = req.params;
      console.log(bookingId)
      const booking = await Booking.findById(bookingId)
      booking.onHold = false 
      const updateBooking = await booking.save()
      res.status(200).send(updateBooking)


      
    } catch (error) {
      return res.status(500).send(error.message);
    }

}
export const onCancelPayment = async (req , res ) => {

  try {
    const { bookingId } = req.params;
    const booking = await Booking.findByIdAndDelete(bookingId)
    res.status(200).send(booking)
    console.log(bookingId)

    
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

export const createCheckoutSession = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.bookingId)
    const turf = await Turf.findById(data.turf);

    if (!turf) {
      throw new Error("Turf not found");
    }

    const line_item = {
      price_data: {
        currency: "inr",
        product_data: {
          name: turf.turfName,
        },
        unit_amount: data.totalAmount * 100,
      },
      quantity: 1,
    };

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [line_item],
      mode: "payment",
      success_url: `https://book-my-pitch.vercel.app/success/${data.bookingId}`,
      cancel_url: `https://book-my-pitch.vercel.app/cancel/${data.bookingId}`,
    });

    res.status(201).send({ id: session.id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const createBooking = async (req, res) => {
  try {
    const data = req.body;

    // Convert startTime and endTime strings to Date objects using $toDate aggregation operator
    const bookings = await Booking.find({
      turf: data.turfID,
      date: data.date,
    });
    console.log(bookings);
    const hour = data.hours;
    const [startHours, startMinutes] = data.startTime.split(":").map(Number);
    const [endHours, endMinutes] = data.endTime.split(":").map(Number);
    const overlappingBooking = bookings.find((booking) => {
      const [sHours, sMinutes] = booking.startTime.split(":").map(Number);
      const [eHours, eMinutes] = booking.endTime.split(":").map(Number);

      // Check if new booking start time falls between existing booking's start and end time
      const newBookingStartsDuringExistingBooking =
        startHours >= sHours && startHours < eHours;

      // Check if new booking end time falls between existing booking's start and end time
      const newBookingEndsDuringExistingBooking =
        endHours >= sHours && endHours < eHours;

      // Check if new booking completely overlaps with existing booking
      const newBookingCompletelyInsideExistingBooking =
        startHours >= sHours && endHours <= eHours;

      // If any of the above conditions are true, there is an overlap
      console.log(
        newBookingStartsDuringExistingBooking ||
          newBookingEndsDuringExistingBooking ||
          newBookingCompletelyInsideExistingBooking
      );
      return (
        newBookingStartsDuringExistingBooking ||
        newBookingEndsDuringExistingBooking ||
        newBookingCompletelyInsideExistingBooking
      );
    });

    if (overlappingBooking) {
      return res.status(403).send("Booking overlaps with existing booking");
    }

    // Create new Booking document
    const newBooking = new Booking(data);

    // Save new booking to the database
    await newBooking.save();

    return res
      .status(201)
      .send(newBooking );
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { name, date, minPrice, maxPrice, location } = req.body;
    console.log({ name, date, minPrice, maxPrice, location });

    if (!name && !date && !minPrice && !maxPrice && !location) {
      const availableTurf = Turf.find();
      console.log(availableTurf);
      return res.status(200).send(availableTurf);
    }

    const query = {};
    if (name) query.turfName = name;
    if (location) query.city = location;

    let turfs = await Turf.find(query);

    if (minPrice !== undefined) {
      turfs = turfs.filter((turf) => turf.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      turfs = turfs.filter((turf) => turf.price <= maxPrice);
    }

    if (date) {
      turfs.map((turf) => {
        checkIfTurfFree(turf._id, date);
      });
    }

    return res.status(200).json(turfs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const checkIfTurfFree = async (turfId, date) => {
  const booking = await Booking.find({ turf: turfId, date });
  const totalBookingHours = booking
    .filter((booking) => booking.date === date)
    .reduce((total, booking) => total + booking.hours, 0);
  console.log("Booking hours", booking, date, totalBookingHours);
  console.log(totalBookingHours, turfId, date);
};

export const bookingById = async (req, res) => {
  try {
    const { turfId } = req.params;
    const { date } = req.body;

   // console.log("Date :", date, turfId);

    const bookings = await Booking.find({
      turf: turfId,
      date: date,
    });
    //console.log(bookings);


    return res.status(200).send(bookings);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const { turfId } = req.params;

    const bookings = await Booking.find({
      turf: turfId,
    });
    const newBookings = await Promise.all(bookings.map(async booking => {
      const user = await User.findById(booking.user);
      //console.log(turf)
      return { ...booking, userName: `${user.firstName} ${user.lastName}`  };
    }));
    
    // bookings.map(booking => {
    //   const turf = 
    //   return 
    // })

    console.log(newBookings);

    return res.status(200).send(newBookings);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getUserBookingById = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      user: userId,
    });

    const newBookings = await Promise.all(bookings.map(async booking => {
      const turf = await Turf.findById(booking.turf);
      //console.log(turf)
      return { ...booking, turfName: turf.turfName };
    }));
    // let newBooking = []
    // for(let i = 0 ; i <= bookings.length ; i++ ){
    //   const turf = await Turf.findById(bookings[i].turf);
    //   newBooking.push({...bookings[i] , })
    // }

    console.log(newBookings);

    return res.status(200).send(newBookings);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


export const checkAvailabilityById = async (req, res) => {
  try {
    const { turfId } = req.params;

    // Find all bookings for the given turf
    const bookingData = await Booking.find({ turf: turfId });

    // Extract distinct dates from booking data
    const distinctDates = [
      ...new Set(bookingData.map((booking) => booking.date)),
    ];

    // Get the turf details
    const turf = await Turf.findById(turfId);

    const openTime = turf.openTime.getHours();
    const closeTime = turf.closeTime.getHours();
    const totalTime = closeTime - openTime;

    // Initialize an array to store blocked dates
    const blockedDates = [];
    console.log(blockedDates);
    // Iterate over distinct dates
    distinctDates.forEach((date) => {
      // Calculate total booking hours for the date
      const totalBookingHours = bookingData
        .filter((booking) => booking.date === date)
        .reduce((total, booking) => total + booking.hours, 0);
      console.log("Booking hours", totalTime, date, totalBookingHours);
      // Calculate remaining available hours
      const remainingTime = totalTime - totalBookingHours;

      // If remaining time is less than or equal to zero, add date to blocked dates
      if (remainingTime <= 0) {
        blockedDates.push(new Date(date));
      }
    });

    // Return the blocked dates
    res.status(200).send(blockedDates);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
