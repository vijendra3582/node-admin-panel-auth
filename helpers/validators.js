const niv = require('node-input-validator');
const mongoose = require('mongoose');

niv.extend('unique', async ({ value, args }) => {
    // default field is email in this example
    const filed = args[1] || 'email';
   
    let condition = {};
   
    condition[filed] = value;
   
    // add ignore condition
    if (args[2]) {
      condition['_id'] = { $ne: mongoose.Types.ObjectId(args[2]) };
    }
   
    let emailExist = await mongoose.model(args[0]).findOne(condition).select(field);
   
    // email already exists
    if (emailExist) {
      return false;
    }
   
    return true;
  });