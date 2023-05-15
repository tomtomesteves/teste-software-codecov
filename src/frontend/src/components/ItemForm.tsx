import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Item } from '../models/Item'

type Params = {
  item?: Item
  handleOnSubmit: (item: Item) => Promise<void>
}

const ItemForm = (props: Params) => {
  const [item, setItem] = useState<Item>(() => {
    if (props?.item) {
      return { ...props.item }
    }
    return {
      title: '',
      description: '',
    }
  })

  const [errorMsg, setErrorMsg] = useState('')
  const { title, description } = item

  const handleOnSubmit = (event: any) => {
    event.preventDefault()
    const values = [title, description]

    const filled = values.every((field) => {
      const value = `${field}`.trim()
      return value !== '' && value !== '0'
    })

    if (!filled) {
      return setErrorMsg('Preencha os campos corretamente')
    }

    const item = {
      title,
      description,
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
        <Form.Group controlId="title">
          <Form.Label>Título</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="title"
            value={title}
            placeholder="Título da tarefa"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="description"
            value={description}
            placeholder="Descrição da tarefa"
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
