import { FC, useEffect, useReducer, useState } from 'react'
import ItemForm from '../ItemForm'
import { RouteComponentProps, useParams } from 'react-router-dom'
import { Task } from '../../models/Task'
import useAPI from '../../hooks/useAPI'
import { Toast } from 'react-bootstrap'
import ShouldRender from '../ShouldRender'

interface Params extends RouteComponentProps<any> {}

const EditItem: FC<Params> = ({ history }) => {
  const { id } = useParams<{ id: string }>()
  const api = useAPI()

  const [itemToEdit, setItemToEdit] = useState<Task>()
  const [show, toggleToast] = useReducer((x: boolean) => !x, false)

  const getItem = async () => {
    try {
      const { data } = await api.get(`tasks/${id}`)
      setItemToEdit(data)
    } catch (e) {
      console.error('ERROR GETTING ELEMENT', e)
    }
  }

  useEffect(() => {
    getItem()
  }, [id])

  const onSubmit = async (item: Task) => {
    try {
      await api.put(`tasks/${id}`, { ...item })
      history.push('/')
    } catch (e) {
      console.error('ERROR EDIT ELEMENT', e)
    }
  }

  return (
    <div>
      <ShouldRender if={!!itemToEdit}>
        <Toast show={show} onClose={toggleToast}>
          <Toast.Body>Algo de errado ocorreu! Tente novamente</Toast.Body>
        </Toast>
        <ItemForm item={itemToEdit} handleOnSubmit={onSubmit} />
      </ShouldRender>
    </div>
  )
}

export default EditItem
