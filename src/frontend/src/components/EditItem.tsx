import { FC, useContext } from 'react'
import ItemForm from './ItemForm'
import { RouteComponentProps, useParams } from 'react-router-dom'
import ItemsContext from '../context/ItemsContext'
import { Item } from '../models/Item'

interface Params extends RouteComponentProps<any> {}

const EditItem: FC<Params> = ({ history }) => {
  const { items, setItems } = useContext(ItemsContext)
  const { id } = useParams<{ id: string }>()
  const itemToEdit = items?.find((item: Item) => item.id === id)

  const onSubmit = (item: Item) => {
    const filteredItems = items?.filter((item: Item) => item?.id !== id) ?? []
    setItems([item, ...filteredItems])
    history.push('/')
  }

  return (
    <div>
      <ItemForm item={itemToEdit} handleOnSubmit={onSubmit} />
    </div>
  )
}

export default EditItem
