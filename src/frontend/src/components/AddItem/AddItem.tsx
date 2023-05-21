import React, { FC, useReducer } from 'react'
import ItemForm from '../ItemForm'
import { Task } from '../../models/Task'
import { RouteComponentProps } from 'react-router-dom'
import useAPI from '../../hooks/useAPI'
import { Toast } from 'react-bootstrap'

interface Params extends RouteComponentProps<any> {}

const AddItem: FC<Params> = ({ history }) => {
  const api = useAPI()
  const [show, toggleToast] = useReducer((x: boolean) => !x, false)

  const onSubmit = async (item: Task) => {
    try {
      await api.post('tasks', { ...item })
      history.push('/')
    } catch (e) {
      toggleToast()
      console.error('ERROR ADD ELEMENT', e)
    }
  }

  return (
    <React.Fragment>
      <Toast show={show} onClose={toggleToast}>
        <Toast.Body>Algo de errado ocorreu! Tente novamente</Toast.Body>
      </Toast>

      <ItemForm handleOnSubmit={onSubmit} />
    </React.Fragment>
  )
}

export default AddItem
