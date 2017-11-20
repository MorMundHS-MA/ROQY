// array with users
const _acconts = [
  {
      "username": "madrid",
      "password": "hsMannheim"
  },
  {
      "username": "david",
      "password": "lasagnaBoy"
  },
  {
      "username": "fifigerweise",
      "password": "brötchenBoy"
  }
]

export default {
    logIn (account, cb, cbError) {
        setTimeout(() => {
          if (findUser(account) !== undefined) {
              cb(account)
          } else {
              cbError()
          }
        }, 100);
    }
}

function findUser (account) {
    _acconts.find( (e) => {
        return e.username === account.username && e.password === account.password
    })
}

