import Sequelize from 'sequelize'

export const define = (instance, ctx) => instance.define('bill', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  type: Sequelize.INTEGER,
  time: Sequelize.TIME,
  amount: Sequelize.DECIMAL,
  category: Sequelize.STRING
})

export const csvHeader = 'type,time,category,amount'
