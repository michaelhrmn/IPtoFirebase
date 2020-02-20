const deviceName = "my-sweet-sweet-pi"
const googleFunctionsURL = "https://YOUR-GOOGLE-CLOUD-SUBDOMAIN.cloudfunctions.net"

const { exec } = require('child_process');
let ip = null;

exec('./print_ip.sh', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   ip = stdout.split('\n')[0].replace(' ', '');
   console.log(ip);
	
	const https = require('https');

	const url = googleFunctionsURL + "/setDeviceIP?deviceName=" +deviceName +"&ip=" +ip;
	console.log(url);

	https.get(url, (res) => {
  	  console.log('statusCode:', res.statusCode);
	//	  console.log('headers:', res.headers);

	  res.on('data', (d) => {
     		process.stdout.write(d);
  	  });

 	}).on('error', (e) => {
  		console.error(e);
		});


  }
});
