const mongoose = require('mongoose');

//Genre Scheme
const employerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

const Employer = module.exports = mongoose.model('Employer', employerSchema);

// Get Employers
module.exports.getEmployers = (callback, limit) => {
  Employer.find(callback).limit(limit);
};

// Add Employer
module.exports.addEmployer = (employer, callback) => {
  Employer.create(employer, callback);
};
