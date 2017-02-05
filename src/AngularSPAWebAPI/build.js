"use strict";

// ShellJS.
require('shelljs/global');

// Colors.
const chalk = require('chalk');


echo('Start building for production...');


/* Cleans aot & dist folders */
rm('-rf', 'aot/*');
cd('wwwroot');
rm('-rf', 'dist/*');
cd('..');


/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
echo('Start TSLint');

exec('tslint ./app/**/*.ts');

echo(chalk.green('TSLint completed'));


/* Aot compilation */
echo('Start AoT compilation');
echo('ngc -p tsconfig-aot.json');

exec('ngc -p tsconfig-aot.json');

echo(chalk.green('AoT compilation completed'));


/* Tree shaking with webpack */
echo('Start Tree shaking');
echo('set NODE_ENV=production&& webpack');

exec('set NODE_ENV=production&& webpack');

echo(chalk.green('Tree shaking completed'));


echo('End building');
