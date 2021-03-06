/* eslint-disable no-console */
const shell = require('shelljs');

const result = shell.exec('git diff --name-only modulo2_aula5..main', { silent: true });

console.log('result', result);
