import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Item as ItemType } from '../models/Item'

type Params = {
  removeItem: (id: string) => void
} & ItemType

const Item: FC<Params> = ({
  id,
  name,
  brand,
  price,
  quantity,
  date,
  removeItem,
}) => {
  const history = useHistory()

  return (
    <Card style={{ width: '18rem' }} className="item">
      <Card.Body>
        <Card.Title className="text-center font-weight-bold">{name}</Card.Title>
        <div className="item-details">
          <div>Marca: {brand}</div>
          <div>Quantidade: {quantity} </div>
          <div>Preço: {price} </div>
          <div>Data: {new Date(date).toDateString()}</div>
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
            onClick={() => removeItem(id)}
          >
            Deletar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item
