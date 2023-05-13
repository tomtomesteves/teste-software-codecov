import React, { useContext } from 'react'
import Item from './Item'
import ItemsContext from '../context/ItemsContext'

const ItemsList = () => {
  const { items, setItems } = useContext(ItemsContext)

  const removeItem = (id: string) => {
    setItems(items?.filter((item: any) => item.id !== id))
  }

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        {items?.map((item: any) => (
          <Item key={item.id} {...item} removeItem={removeItem} />
        ))}
        {!items?.length && (
          <div className="alert alert-warning" role="alert">
            Nenhum item cadastrado!
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default ItemsList
