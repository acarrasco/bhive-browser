/*
 * This is the config loader. Does a few extra steps, like replacing environment
 * dependent values and setting the number of threads to the number of cpus if
 * undefined.
 */

var yaml = require('js-yaml');
var fs = require('fs');
var lodash = require('lodash');
var config;

try {
    config = yaml.safeLoad(fs.readFileSync(__dirname + '/../config.yaml', 'utf8'));
} catch (e) {
    console.log("------------------\nError parsing config.yml data.\n------------------\n");
    throw e;
}

if (process.env.ENV) {
    config.env = process.env.ENV;
}

//for those values that have a key named after the environment or 'default', replace them
config = lodash.transform(config, function(accumulator, value, key) {
    if (value.hasOwnProperty(config.env)) {
        accumulator[key] = value[config.env];
    } else if (value.hasOwnProperty('default')) {
        accumulator[key] = value['default'];
    } else {
        accumulator[key] = value;
    }
});

//if number of threads is zero or un-specified, one per logical cpu
if (!config.threads) {
    config.threads = require('os').cpus().length;
}

// to avoid surprises, show the actual config we are using
console.log('computed config:', config);

module.exports = config;
