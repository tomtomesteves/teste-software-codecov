import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Task } from '../../models/Task'
import ShouldRender from '../ShouldRender'

type Params = {
  removeItem: (id: number) => void
} & Task

const Item: FC<Params> = ({ id, title, description, done, removeItem }) => {
  const history = useHistory()

  return (
    <Card style={{ width: '18rem' }} className="item">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title className="text-center font-weight-bold">
            {title}
          </Card.Title>
          <ShouldRender if={!!done}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="green"
              className="bi bi-check2"
              viewBox="0 0 16 16"
            >
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </ShouldRender>
        </div>

        <div className="item-details">
          <div>Descrição: {description}</div>
        </div>
        <div className="text-center">
          <Button
            variant="primary"
            data-testid="edit-btn"
            className="btn btn-primary"
            onClick={() => history.push(`/edit/${id}`)}
          >
            Editar
          </Button>{' '}
          <Button
            className="btn btn-danger"
            variant="danger"
            onClick={() => removeItem(id ?? 0)}
          >
            Deletar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item
