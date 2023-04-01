const dbConfig = require('../config/dbConfig.js')
const dbInsert = require('../config/dbInsert.js')
const { Sequelize, DataTypes } = require('sequelize')

// Sequelize Object 생성
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    ...dbConfig.pool,
  },
})

// 데이터베이스 접속
sequelize
  .authenticate()
  .then(() => {
    console.log('connected.')
  })
  .catch(err => {
    console.log(`err: ${err}`)
  })

// db 객체 생성 및 Sequelize, sequelize 주입
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.member = require('./member.js')(sequelize, DataTypes)
db.settings = require('./settings.js')(sequelize, DataTypes)

// 동기화
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('resync done.')

    // 사전값 주입
    dbInsert.settingRowInsert(db)
  })
  .catch(error => {
    console.error(error)
  })

module.exports = db
