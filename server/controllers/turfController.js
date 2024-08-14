import Turf from "../models/turf.js";

export const createTurf = async (req, res) => {
  try {
    const data = req.body;
    // Check if turf already exists with the provided email
    const existingTurf = await Turf.findOne({ email: data.email });
    if (existingTurf) {
      return res.status(403).send({ message: "Turf already exists" });
    }
    // Extract filenames from uploaded files and add to data
    const filenames = req.files.map((file) => file.originalname);
    data.imageUrl = filenames;
    // Create new turf and save to database
    const newTurf = new Turf(data);
    await newTurf.save();
    return res.status(201).send({ message: "Turf created successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getTurfById = async (req, res) => {
  try {
    const { id } = req.params;
    // Find turf by ID
    const turf = await Turf.findById(id);
    if (!turf) {
      return res.status(404).send({ message: "Turf not found" });
    }
    return res.status(200).send(turf);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const getAllTurfLocations = async (req, res) => {
  try {
    const turfs = await Turf.find();
    const uniqueCitiesSet = new Set(turfs.map((turf) => turf.city));
    const uniqueCities = Array.from(uniqueCitiesSet);
    return res.status(200).send(uniqueCities);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteTurf = async (req, res) => {
  try {
    const { turfId } = req.params;
    console.log(turfId)
    const deleteTurf = await Turf.findByIdAndDelete(turfId);
    console.log(deleteTurf)
    if (!deleteTurf) {
      return res.status(404).send("Error in deleting the Turf");
    }
    return res.status(200).send("Delete operation successfull");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateTurf = async (req, res) => {
  try {
    const { turfId } = req.params;
    const {
      email,
      firstName,
      lastName,
      phoneno,
      price,
      turfName,
      openTime,
      closeTime,
      location,
      desc,
      city,
    } = req.body;

    console.log(req.body)

    console.log({
      email,
      firstName,
      lastName,
      phoneno,
      price,
      turfName,
      openTime,
      closeTime,
      location,
      desc,
      city,
    })

    // Find the Turf by ID
    const turf = await Turf.findById(turfId);

    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // Update the Turf properties
    if (email) {
      turf.email = email;
    }
    if (firstName) {
      turf.firstName = firstName;
    }
    if (lastName) {
      turf.lastName = lastName;
    }
    if (phoneno) {
      turf.phoneno = phoneno;
    }
    if (price) {
      turf.price = price;
    }
    if (turfName) {
      turf.turfName = turfName;
    }
    if (openTime) {
      turf.openTime = openTime;
    }
    if (closeTime) {
      turf.closeTime = closeTime;
    }
    if (location) {
      turf.address = location;
    }
    if (desc) {
      turf.desc = desc;
    }
    if (city) {
      turf.city = city;
    }

    // Save the updated Turf
    const updatedTurf = await turf.save();
    res.status(200).json({ message: "Turf updated", turf: updatedTurf });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
