import mongoose from "mongoose";

const enquirySchema = mongoose.Schema({
  name: String,
  phoneNumber: String,
  comment: [
    {
      comment: String,
      statusChange: String,
      assingedChange: String,
      updated: Date,
    },
  ],
  assignedTo: String,
  source: String,
  status: String,
  subStatus: String,
  budget: String,
  config: String,
  location: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const EnquirySchema = mongoose.model("Enquiries", enquirySchema);

export default EnquirySchema;
