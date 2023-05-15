import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import AddItem from '../components/AddItem'
import ItemList from '../components/ItemsList'
import useLocalStorage from '../hooks/useLocalStorage'
import EditItem from '../components/EditItem'
import ItemsContext from '../context/ItemsContext'
import Footer from '../components/Footer'

const AppRouter = () => {
  const [items, setItems] = useLocalStorage('items', [])

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="bg-light">
          <div className="main-content">
            <ItemsContext.Provider value={{ items, setItems }}>
              <Switch>
                <Route component={ItemList} path="/" exact={true} />
                <Route component={AddItem} path="/add" />
                <Route component={EditItem} path="/edit/:id" />
                <Route component={() => <Redirect to="/" />} />
              </Switch>
            </ItemsContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default AppRouter