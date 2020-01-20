import React, { useState, useEffect } from "react"
import { getFirebase, auth, provider } from './firebase'
import Nav from './components/nav'
import "./styles.scss"

const App = () => {
  const [username, setUsername] = useState('')
  const [currentItem, setItem] = useState('')
  const [currentItems, setItems] = useState([])
  const [user, setUser] = useState('')

  useEffect(() => {
    // check if already logged in
    auth.onAuthStateChanged(user => {
      setUser(user)
    })

    // get items
    const itemsRef = getFirebase().database().ref('items')
    itemsRef.on('value', snapshot => {
      let items = snapshot.val()
      let newState = []

      for(let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        })
      }

      setItems(newState)
    })
  }, [])

  // login
  const login = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user
      setUser(user)
    })
  }

  // logout
  const logout = (e) => {
    e.preventDefault()
    auth.signOut()
    .then(() => {
      setUser('')
    })
  }

  // get input values
  const handleChange = e => {
    e.persist();
    const input = e.target.name

    if(input === 'username') {
      setUsername(e.target.value)
    } else if(input === 'item') {
      setItem(e.target.value)
    }
  }

  // add item
  const handleSubmit = e => {
    e.preventDefault()
    const itemsRef = getFirebase().database().ref('items')

    // update item
    const item = {
      title: currentItem,
      user: user.displayName || user.email
    }

    // send to database
    itemsRef.push(item)

    // clear fields
    setUsername('')
    setItem('')
  }

  // remove item
  const removeItem = (itemId) => {
    const itemRef = getFirebase().database().ref(`/items/${itemId}`)
    itemRef.remove()
  }

  return (
    <>
      <Nav data={user} click={user ? logout : login} />
      <main className="app container">
        <div className="row">
          { user ? 
            <>
              <section className="add-item col s12 m5">
                <h2>What are you bringing to the potluck?</h2>

                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input id="username" name="username" type="text" onChange={handleChange} value={user.displayName || user.email} />
                  </div>

                  <div className="input-field">
                    <label htmlFor="item">Item</label>
                    <input id="item" name="item" type="text" onChange={handleChange} value={currentItem} />
                  </div>

                  <button className="btn grey darken-4">Add item</button>
                </form>
              </section>
          
              <section className="items col s12 m6">
                <ul className="items-list collection"> 
                  { currentItems.map(item => {
                    return (
                      <li key={item.id} className="item collection-item">
                        <p><strong>{item.title}</strong>
                          <span>from {item.user}</span></p>

                        {item.user === user.displayName ? <button onClick={ () => removeItem(item.id) }><i className="material-icons">remove_circle_outline</i></button> : '' }
                      </li>
                    )
                  })}
                </ul>
              </section> 
            </> : 
          
            'You must login first.'
          
          }
        </div>
      </main>
    </>
  )
}

export default App
