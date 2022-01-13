import express from 'express';
import { listings } from './listings';

const app = express();
const port = 9000;

// replacement for using bodyParser - now included in express
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// returns all listings
app.get('/listings', (_req, res) => {
	return res.send(listings);
});

// removes a listing
app.post('/delete-listing', (req, res) => {
	const reqId: string = req.body.id;

	for (let i = 0; i < listings.length; i++) {
		if (listings[i].id === reqId) {
			return res.send(listings.splice(i, 1));
		}
	}
	// if no id found
	return res.send('failed to find and delete listing');
});

app.listen(port);

console.log(`[app]: Ready at http://localhost:${port}`);
