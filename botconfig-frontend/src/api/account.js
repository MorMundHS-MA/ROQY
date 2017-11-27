// array with users
const _acconts = [
  {
    'username': 'madrid',
    'password': 'hsMannheim'
  },
  {
    'username': 'david',
    'password': 'lasagnaBoy'
  },
  {
    'username': 'fifigerweise',
    'password': 'brötchenBoy'
  }
]

export default {
  logIn (account, cb, cbError) {
    return new Promise(
      (resolve, reject) => {
        if (findUser(account) !== undefined) {
          resolve(account)
          cb(account)
        } else {
          reject(new Error('Fehler'))
        }
      }
    )
  }
}

function findUser (account) {
  return _acconts.filter((e) => {
    return e.username === account.username && e.password === account.password
  })
}
