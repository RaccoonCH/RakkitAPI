module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'rakkit',
  synchronize: false,
  entities: [
    `${__dirname}/src/api/*/*Model.ts`
  ]
}
