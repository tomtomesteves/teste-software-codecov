import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { Item } from '../models/Item'

const ItemForm = (props: any) => {
  const [item, setItem] = useState(() => {
    if (props.item) {
      return { ...props.item }
    }
    return {
      name: '',
      brand: '',
      quantity: '',
      price: '',
      date: '',
    }
  })

  const [errorMsg, setErrorMsg] = useState('')
  const { name, brand, price, quantity } = item

  const handleOnSubmit = (event: any) => {
    event.preventDefault()
    const values = [name, brand, price, quantity]

    const filled = values.every((field) => {
      const value = `${field}`.trim()
      return value !== '' && value !== '0'
    })

    if (!filled) {
      return setErrorMsg('Preencha os campos corretamente')
    }

    const item = {
      id: uuidv4(),
      name,
      brand,
      price,
      quantity,
      date: new Date(),
    }
    props.handleOnSubmit(item)
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target

    if ((name === 'quantity' && value === '') || parseInt(value) === +value) {
      return setItem((prevState: Item) => ({
        ...prevState,
        [name]: value,
      }))
    }
    if (
      (name === 'price' && value === '') ||
      value.match(/^\d{1,}(\.\d{0,2})?$/)
    ) {
      return setItem((prevState: Item) => ({
        ...prevState,
        [name]: value,
      }))
    }
    return setItem((prevState: Item) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="main-form">
      {errorMsg && (
        <div className="alert alert-warning" role="alert">
          {errorMsg}
        </div>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="name"
            value={name}
            placeholder="Item name"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="brand"
            value={brand}
            placeholder="Nome da marca"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            className="form-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Quantidade"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="price"
            value={price}
            placeholder="Preço"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ItemForm
