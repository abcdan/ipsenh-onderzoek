const { maria_test } = require("./maria");
const { pg_test } = require("./pg");
const { sqlite_test } = require("./sqlite");
const { Command } = require("commander");

// TODO: Natte code moet nog even opdrogen
const program = new Command();

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("pg")
  .description("Run the Postgres test")
  .argument("<rounds>", "How many times to run the tests")
  .argument("<iterations>", "How many times the data should be changed")
  .action((rounds, iterations) => {
    console.log(
      "Starting PG test with " +
        rounds +
        " rounds and " +
        iterations +
        " iterations"
    );
    pg_test(rounds, iterations);
  });

program
  .command("sqlite")
  .description("Run the SQLite test")
  .argument("<rounds>", "How many times to run the tests")
  .argument("<iterations>", "How many times the data should be changed")
  .action((rounds, iterations) => {
    console.log(
      "Starting SQLite test with " +
        rounds +
        " rounds and " +
        iterations +
        " iterations"
    );
    sqlite_test(rounds, iterations);
  });

program
  .command("maria")
  .description("Run the MariaDB test")
  .argument("<rounds>", "How many times to run the tests")
  .argument("<iterations>", "How many times the data should be changed")
  .action((rounds, iterations) => {
    console.log(
      "Starting MariaDB test with " +
        rounds +
        " rounds and " +
        iterations +
        " iterations"
    );
    maria_test(rounds, iterations);
  });

program.parse();
