module.exports = {
    create_postgres: 'CREATE TABLE test (userid SERIAL, name VARCHAR(100), lastname VARCHAR(100));',
    create_mysql: 'CREATE TABLE test (userid INT NOT NULL AUTO_INCREMENT, name VARCHAR(100), lastname VARCHAR(100));',
    insert: `INSERT INTO test (name, lastname) VALUES ('${'a'.repeat(100)}', '${'b'.repeat(100)}');`,
    find: 'SELECT * FROM test WHERE userid = 6666;',
    findInject: 'SELECT * FROM test WHERE userid = XXXID;',
    selectAll: 'SELECT * from test',
    updateInject: `UPDATE test SET name = '${'c'.repeat(100)}', lastname = '${'q'.repeat(100)}' WHERE userid = XXXID;`,
    drop: 'DROP TABLE test;',
    // Unique tests
    uniqueCreate_postgres: 'CREATE TABLE uniqueTest (userid UNIQUE, name VARCHAR(100), lastname VARCHAR(100));',
    uniqueCreate_mysql: 'CREATE TABLE uniqueTest (userid UNIQUE, name VARCHAR(100), lastname VARCHAR(100));',
    uniqueInsert: 'INSERT INTO uniqueTest (userid, name, lastname) VALUES (\'ok\', \'ok\', \'ok\');'
  }
  