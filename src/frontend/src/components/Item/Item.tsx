import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Task } from '../../models/Task'

type Params = {
  removeItem: (id: number) => void
} & Task

const Item: FC<Params> = ({ id, title, description, removeItem }) => {
  const history = useHistory()

  return (
    <Card style={{ width: '18rem' }} className="item">
      <Card.Body>
        <Card.Title className="text-center font-weight-bold">
          {title}
        </Card.Title>
        <div className="item-details">
          <div>Descrição: {description}</div>
        </div>
        <div className="text-center">
          <Button
            variant="primary"
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
