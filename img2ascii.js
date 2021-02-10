var asciify = require('asciify-image');

var options = {
    fit: 'box',
    width: 64,
    height: 64,
    color: false
}

asciify('./Malil-pfp.png', options, function (err, asciified) {

    if (err) 
        throw err;
    


    // Print to console
    console.log(asciified);
});
