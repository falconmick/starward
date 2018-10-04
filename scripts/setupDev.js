var fs = require('fs');
var directoriesToConstruct = ['./docker/certs/', './docker/certs-data/', './docker/mysql/'];

directoriesToConstruct.forEach((directory) => {
	if (!fs.existsSync(directory)){
		fs.mkdirSync(directory);
	}
});
