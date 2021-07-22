const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  labels: {
    type: [String],
    required: true,
  },
  datasets: [
    {
      label: String,
      data: [String],
      backgroundColor: String,
    },
  ],
});

module.exports = mongoose.model('chartData', chartDataSchema);
