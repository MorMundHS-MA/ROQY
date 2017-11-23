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
          console.log(cb(account))
          resolve(cb(account))
        } else {
          console.log(cbError())
          reject(cbError())
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
