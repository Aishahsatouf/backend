'use strict';
const mongoose=require('mongoose');
const server = require('./src/server');
require('dotenv').config();

// connection
const MONGOOSE_URI=process.env.MONGOOSE_URI
const PORT=process.env.PORT

mongoose.connect(MONGOOSE_URI,{
   useNewUrlParser:true,
   useCreateIndex:true,
   useUnifiedTopology:true,
   useFindAndModify:false 
}) 
.then(() => {
   server.start(PORT);
 })
 .catch((err) => console.log(err));