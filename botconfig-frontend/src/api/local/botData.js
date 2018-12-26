let bots = []

export default {
  async uploadBot (bot) {
  },
  async getBots (cb) {
    cb(bots)
  },
  async addNewBot (bot) {
    let newBot = {
      'name': bot.name,
      'description': bot.description,
      'intents': [],
      'test': 'true',
      'botType': bot.botType,
      'privacy': 'private',
      'status': 'stopped',
      'config': bot.config || null,
      '_id': Math.random().toString(),
      'id': Math.random().toString()
    }

    bots.push(newBot)
    return bot._id
  },
  async changeBotState (bot, start, stop) {
    if (bot.status === 'running') {
      stop(bot)
    } else {
      start(bot)
    }
  },
  async deleteBot (cb, bot) {
    bots = bots.filter(search => search._id !== bot._id)
    cb(bot)
  },
  async renameBot (cb, bot) {
    bot[0].name = bot[1].name
    cb(bot)
  },
  async getBot (id) {
    return bots.find(search => search.id === id)
  },
  async saveBot (id, saveObj) {
    bots.find(search => search.id === id).config = saveObj
    return true
  }
}
