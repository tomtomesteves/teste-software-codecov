import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import AddItem from '../components/AddItem'
import ItemList from '../components/ItemsList'
import EditItem from '../components/EditItem'
import Footer from '../components/Footer'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="bg-light">
          <div className="main-content">
            <Switch>
              <Route component={ItemList} path="/" exact={true} />
              <Route component={AddItem} path="/add" />
              <Route component={EditItem} path="/edit/:id" />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default AppRouter
