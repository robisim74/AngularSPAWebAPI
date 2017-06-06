"use strict";

require('shelljs/global');
const chalk = require('chalk');

echo('Start building for production...');

rm('-rf', 'aot/*');
cd('wwwroot');
rm('-rf', 'dist/*');
cd('..');

/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
echo('Start TSLint');
exec('tslint --project ./tsconfig.json --type-check ./app/**/*.ts -e ./app/main-aot.ts');
echo(chalk.green('TSLint completed'));

/* Aot compilation */
echo(`Start AoT compilation`);
echo('ngc -p tsconfig-aot.json');
if (exec(`ngc -p tsconfig-aot.json`).code !== 0) {
    echo(chalk.red(`Error: AoT compilation failed`));
    exit(1);
}
echo(chalk.green(`AoT compilation completed`));

/* Tree shaking & minification with webpack */
echo('Start Tree shaking & minification');
echo('set NODE_ENV=production && webpack');
exec('set NODE_ENV=production && webpack');
echo(chalk.green('Tree shaking completed'));

echo(chalk.green('End building'));
