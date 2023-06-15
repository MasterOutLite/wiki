// Load environment variables
require('./env');

const args = process.argv.slice(2);
if (args.length > 0 && args[0]) {
  require(args[0]);
}
