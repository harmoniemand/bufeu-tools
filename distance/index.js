
const https = require('https');
const config = require('./config');

var baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&destinations=37318 Birkenfelde&key=' + config.apikey;
var data = require('./data');

function getDistance(to) {
    return new Promise(function (resolve, reject) {
        https.get(baseUrl + '&origins=' + to, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                var obj = JSON.parse(data);

                if (obj.rows) {
                    var row = obj.rows[0];
                    
                    if (row.elements) {
                        var elem = row.elements[0];

                        if (elem.distance)
                        	console.log(to + " => " + elem.distance.text);
                        else
                            console.log(to + " => " + JSON.stringify(elem));
                    } else {
                        console.log(to + ' => not elements');
                    }
                } else {
                    console.log(to + ' => not rows');
                }

            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    });
};

data.forEach(function (d) {
    getDistance(d);
});
