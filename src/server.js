const express = require('express');
const authRouter = require('./routes/authRouter');

// make a server instance 
const app = express();

app.use(express.json());

// authentication route
app.use('/auth', authRouter);

// // routes testing purposes
// app.get("/", (request, response) => {
// 	response.json({
// 		message:"Testing connection"
// 	});
// });

// app.post("/", (request, response) => {
//   response.json({
//     received: request.body.message
//   });
// });

// app.delete("/buy/:id", (request, response) => {
// 	const buyID = request.params.id;
// 	response.json({
// 		message:"DELETE request successful for ID $(buyID)"
// 	});
// });

// app.patch("/", (request, response) => {
// 	response.json({
// 		message:"Update successful"
// 	});
// });

module.exports = {
	app
}