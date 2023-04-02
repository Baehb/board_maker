const { where } = require('sequelize')
const RM = require('../config/responseMessages.js')
const { settings_table: st } = require('../config/constants.js')
const db = require('../models')

const Settings = db.settings

// 1. 모든 기본값 가져오기  (어드민 전용)
const getAllSettingValues = async (req, res) => {
  try {
    const settings = await Settings.findAll({})
    res.status(200).send(settings)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: RM['011'] })
  }
}

// 2. 특정 기본값 업데이트 (어드민 전용)
const setOneSettingValues = async (req, res) => {
  try {
    await Settings.update(
      { ...req.body },
      { where: { pk_setting: st.CONSTANT_PK } }
    )
    res.status(200).send({ message: RM['012'] })
  } catch (error) {
    res.status(500).send({ message: RM['013'] })
  }
}

module.exports = {
  getAllSettingValues,
  setOneSettingValues,
}
