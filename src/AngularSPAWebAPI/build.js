"use strict";

const shell = require('shelljs');
const chalk = require('chalk');

shell.echo('Start building for production...');

shell.rm('-rf', 'aot/*');
shell.cd('wwwroot');
shell.rm('-rf', 'dist/*');
shell.cd('..');

/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
shell.echo('Start TSLint');
shell.exec('tslint -c tslint.json -t stylish app/**/*.ts -e app/main-aot.ts');
shell.echo(chalk.green('TSLint completed'));

/* Aot compilation */
shell.echo('Start AoT compilation');
shell.echo('ngc -p tsconfig-aot.json');
if (shell.exec('ngc -p tsconfig-aot.json').code !== 0) {
    shell.echo(chalk.red('Error: AoT compilation failed'));
    shell.exit(1);
}
shell.echo(chalk.green('AoT compilation completed'));

/* Tree shaking & minification with webpack */
shell.echo('Start Tree shaking & minification');
shell.echo('cross-env NODE_ENV=production webpack');
shell.exec('cross-env NODE_ENV=production webpack');
shell.echo(chalk.green('Tree shaking completed'));

shell.echo(chalk.green('End building'));
