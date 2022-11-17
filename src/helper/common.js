require('dotenv').config()

const USER_STATE = {
  ROOT : 'ROOT',
  DIR : 'DIRECTOR',
  ADM : 'ADMIN',
}
const defaultLimit = parseInt(process.env.DEFAULT_LIMIT)

const createNIP = (joinStart, lastNum) => {
  return joinStart + ("00" + (parseInt(lastNum) + 1)).slice(-3)
}

const createNIS = (joinStart, lastNum) => {
  return joinStart + ("000" + (parseInt(lastNum) + 1)).slice(-4)
}

const formatDateViewToDB = (date) => {
  const newDate = date.split("-")
  return newDate[2] + "-" + newDate[1] + "-" + newDate[0]
}

module.exports = {
  defaultLimit,
  USER_STATE,
  createNIP,
  createNIS,
  formatDateViewToDB,
}