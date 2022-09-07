/**
 * All results of any test using this this project need to have a
 * backlink to this project.
 *
 * Copyright (c) abcdan - All rights reserved.
 */

console.log("[TESTING] MySQL".blue);

const PreciseTimer = require("precise-timer");
const tests = require("../sql/tests");
const settings = require("../sql/settings");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "",
  insecureAuth: true,
});

var results = {
  create: -1,
  insert: -1,
  find: -1,
  update: -1,
  selectAll: -1,
  drop: -1,
  total: -1,
};

// Create the test table
const timer = new PreciseTimer({ decimals: 6 });
connection.query(tests.create_mysql, function (err, results2, fields) {
  if (settings.errors) console.log(err);
  results.create = timer.elapsed;
});

// 100 times the same query
for (let i = 0; i < settings.amount; i++) {
  connection.query(tests.insert, function (err, results2, fields) {
    if (settings.errors) console.log(err);
    results.insert = timer.elapsed - results.create;
  });
}

// Find one thing
for (let i = 0; i < settings.amount; i++) {
  connection.query(
    tests.findInject.replace("XXXID", i),
    function (err, results2, fields) {
      if (settings.errors) console.log(err);
      results.find = timer.elapsed - (results.insert + results.create);
    }
  );
}

for (let i = 0; i < settings.amount; i++) {
  connection.query(
    tests.updateInject.replace("XXXID", i),
    function (err, results2, fields) {
      if (settings.errors) console.log(err);
      results.update =
        timer.elapsed - (results.insert + results.create + results.find);
    }
  );
}

// Select all the data
for (let i = 0; i < settings.amount; i++) {
  connection.query(tests.selectAll, function (err, results2, fields) {
    if (settings.errors) console.log(err);
    results.selectAll =
      timer.elapsed -
      (results.insert + results.create + results.find + results.update);
  });
}

// Drop the table
connection.query(tests.drop, function (err, results2, fields) {
  if (settings.errors) console.log(err);
  results.drop =
    timer.elapsed -
    (results.selectAll +
      results.find +
      results.insert +
      results.create +
      results.update);
  console.log("[RESULTS] MySQL".green);
  results.total = timer.elapsed;
  console.table(calcResults());
  connection.close();
});

function calcResults() {
  return {
    create: results.create,
    insert: results.insert / settings.amount,
    find: results.find / settings.amount,
    update: results.update / settings.amount,
    selectAll: results.selectAll / settings.amount,
    drop: results.drop,
    total: results.total,
  };
}

module.export = {
  results,
};
