import React, { FC, useContext } from 'react'
import ItemForm from './ItemForm'
import ItemsContext from '../context/ItemsContext'
import { Item } from '../models/Item'
import { RouteComponentProps } from 'react-router-dom'

interface Params extends RouteComponentProps<any> {}

const AddItem: FC<Params> = ({ history }) => {
  const { items, setItems } = useContext(ItemsContext)

  const onSubmit = (item: Item) => {
    setItems?.([item, ...(items ?? [])])
    history.push('/')
  }

  return (
    <React.Fragment>
      <ItemForm handleOnSubmit={onSubmit} />
    </React.Fragment>
  )
}

export default AddItem
