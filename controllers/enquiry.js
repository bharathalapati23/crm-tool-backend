import EnquirySchema from "../models/enquiryModel.js";
import { ObjectID } from "mongodb";

export const createEnquiry = async (req, res) => {
  const enquiry = {
    name: req.body.name,
    phoneNumber: req.body.phoneNo,
    comment: [
      {
        changedBy: req.body.changedBy,
        comment: "Initiated",
        statusChange: "",
        assingedChange: "",
        updated: Date.now(),
      },
    ],
    source: req.body.source,
    status: "Enquired",
    budget: "",
    config: "",
    location: [],
    subStatus: "",
    assignedTo: "Aditya",
  };

  const newEnquiry = new EnquirySchema(enquiry);
  try {
    await newEnquiry.save();
    console.log(enquiry);
    res.status(201).json(newEnquiry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    let enquiries = [];
    enquiries = await EnquirySchema.find().sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleEnquiry = async (req, res) => {
  let objId = req.query.objId;
  try {
    let listing = [];
    listing = await EnquirySchema.find({ _id: ObjectId(objId) });

    res.status(200).json(listing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    let newComment = req.body;
    console.log(req.body);
    if (req.body.comment || req.body.status) {
      EnquirySchema.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: {
            comment: {
              comment: req.body.comment,
              statusChange: req.body.status,
              updated: req.body.updated,
              changedBy: req.body.changedBy,
            },
          },
          $set: {
            assignedTo: req.body.assignedTo,
            budget: req.body.budget,
            config: req.body.config,
            location: req.body.location,
            status: req.body.status,
            subStatus: req.body.subStatus,
          },
        },
        function (err, doc) {
          if (err) throw err;
          return res.send("Succesfully saved.");
        }
      );
    } else {
      EnquirySchema.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            budget: req.body.budget,
            config: req.body.config,
            location: req.body.location,
            status: req.body.status,
          },
        },
        function (err, doc) {
          if (err) throw err;
          return res.send("Succesfully saved.");
        }
      );
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
