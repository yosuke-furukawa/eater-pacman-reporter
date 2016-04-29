'use strict';

const colo = require('colo');
const Reporter = require('eater').Reporter;
const readline = require('readline');
const pacmans = [colo.yellow.bold('ᗧ'), colo.yellow.bold('O')]; 
let index = 0;

class EaterPacmanReporter extends Reporter {
  reportFileNumber(num) {
    this.executeFileNum = 0;
    this.testFileNum = num;
    this.feeds = [];
    this.progress = 0;
    for (let i=0; i<num; i++) {
      this.feeds.push(colo.white.bold('・'));
    }
    this.clearLine();
    this.printPacmans();
  }

  clearLine() {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }

  printPacmans() {
    this.clearLine();
    process.stdout.write(pacmans[index % pacmans.length]);
    this.printFeeds();
    this.pacmanInteval = setInterval(() => {
      this.clearLine();
      for (let space = 0; space < this.progress; space++) {
        process.stdout.write('  ');
      }
      process.stdout.write(pacmans[index % pacmans.length]);
      this.printFeeds();
      index++;
    }, 100);
  }

  printFeeds() {
    this.feeds.forEach((feed) => {
      process.stdout.write(feed);
    });
  }

  reportTestName(name) {
  }

  reportSubTestName(name) {
  }

  setChildProc(child) {
    child.stdout.on('data', () => {process.stdout.emit('data', '')});
    child.stderr.on('data', () => {process.stderr.emit('data', '')});
  }

  reportSubFailure(name) {
  }

  reportSubSuccess(name) {
  }

  reportFailure(name) {
    this.feeds.shift();
    this.progress++;
  }

  reportSuccess(name) {
    this.feeds.shift();
    this.progress++;
  }

  reportFinish(hasAnyError, errors) {
    setTimeout(() => {
      this.progress = 0;
      this.clearLine();
      if (hasAnyError) {
        console.log(colo.red('✗ Failed some tests'));
      } else {
        console.log(colo.cyan.bold('✓ cleared all tests'));
      }
      clearInterval(this.pacmanInteval);
    }, 1000);
  }
}

module.exports = EaterPacmanReporter;
