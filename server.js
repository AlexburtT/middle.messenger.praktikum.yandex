const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./build'));


app.listen(process.env.PORT || PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
