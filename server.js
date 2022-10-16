const express = require('express');

const app = express();
const PORT = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
}); 