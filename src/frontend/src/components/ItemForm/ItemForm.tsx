import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Task } from '../../models/Task'
import ShouldRender from '../ShouldRender'

type Params = {
  item?: Task
  handleOnSubmit: (item: Task) => Promise<void>
}

const ItemForm = (props: Params) => {
  const isUpdate = !!props?.item

  const [item, setItem] = useState<Task>(() => {
    if (props?.item) {
      return { ...props.item }
    }
    return {
      title: '',
      description: '',
      done: false,
    }
  })

  const [errorMsg, setErrorMsg] = useState('')
  const { title, description, done } = item

  const handleOnSubmit = (event: any) => {
    event.preventDefault()
    const values = [title, description, done]

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
      done,
    }
    props.handleOnSubmit(item)
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target

    if ((name === 'quantity' && value === '') || parseInt(value) === +value) {
      return setItem((prevState: Task) => ({
        ...prevState,
        [name]: value,
      }))
    }
    if (
      (name === 'price' && value === '') ||
      value.match(/^\d{1,}(\.\d{0,2})?$/)
    ) {
      return setItem((prevState: Task) => ({
        ...prevState,
        [name]: value,
      }))
    }
    if (name === 'done') {
      return setItem((prevState: Task) => ({
        ...prevState,
        [name]: !item?.done,
      }))
    }
    return setItem((prevState: Task) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="main-form">
      {errorMsg && (
        <div
          data-testid="error-message"
          className="alert alert-warning"
          role="alert"
        >
          {errorMsg}
        </div>
      )}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="title">
          <Form.Label data-testid="title-label">Título</Form.Label>
          <Form.Control
            className="form-control"
            data-testid="title-control"
            type="text"
            name="title"
            required
            value={title}
            placeholder="Título da tarefa"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label data-testid="description-label">Descrição</Form.Label>
          <Form.Control
            className="form-control"
            data-testid="description-control"
            type="text"
            name="description"
            maxLength={50}
            required
            value={description}
            placeholder="Descrição da tarefa"
            onChange={handleInputChange}
          />
        </Form.Group>
        <ShouldRender if={isUpdate}>
          <Form.Group controlId="done">
            <Form.Label data-testid="complete-label">Completo?</Form.Label>
            <Form.Control
              className="form-control"
              data-testid="complete-control"
              type="checkbox"
              name="done"
              checked={!!item?.done}
              placeholder="A tarefa está completa"
              onChange={handleInputChange}
            />
          </Form.Group>
        </ShouldRender>
        <Button
          type="submit"
          data-testid="submit-btn"
          className="btn btn-primary"
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ItemForm
