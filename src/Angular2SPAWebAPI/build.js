"use strict";

// ShellJS.
require('shelljs/global');

// Colors.
const chalk = require('chalk');


echo('Start building for production...');


/* Cleans aot & dist folders */
rm('-Rf', 'aot/*');
rm('-Rf', 'dist/*');


/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
echo('Start TSLint');

const Linter = require("tslint");
const configuration = require('./tslint.json');
const options = {
    formatter: 'json',
    configuration: configuration
};
let program = Linter.createProgram("tsconfig.json", "app/");
let files = Linter.getFileNames(program);
let results = files.map(file => {
    let fileContents = program.getSourceFile(file).getFullText();
    let linter = new Linter(file, fileContents, options, program);
    let result = linter.lint();
    
    if (result.failureCount > 0) {

        let failures = JSON.parse(result.output);
        for (let i = 0; i < failures.length; i++) {
            echo('TSLint:',
                chalk.yellow(failures[i].failure),
                chalk.white('[' + (failures[i].startPosition.line + 1) +
                    ', ' + (failures[i].startPosition.character + 1) + ']'),
                failures[i].name);
        }

    }

});

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
