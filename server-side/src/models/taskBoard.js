const mongoose = require("mongoose");

const taskBoardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  taskLists: new Array({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    taskItems: new Array({
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: false,
      },
      fromDate: {
        type: Date,
        required: false,
      },
      toDate: {
        type: Date,
        required: false,
      },
    }),
  }),
});

const TaskBoard = mongoose.model("taskBoard", taskBoardSchema);

module.exports = TaskBoard;
