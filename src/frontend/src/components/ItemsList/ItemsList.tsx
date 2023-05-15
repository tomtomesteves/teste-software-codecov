import { useEffect, useState } from 'react'
import Item from '../Item'
import useAPI from '../../hooks/useAPI'
import { Task } from '../../models/Task'
import ShouldRender from '../ShouldRender'

const ItemsList = () => {
  const api = useAPI()
  const [list, setList] = useState<Task[]>([])

  const getList = async () => {
    try {
      const { data } = await api.get('tasks')
      setList(data?.tasks)
    } catch (e) {
      console.error('ERROR GETTING LIST', e)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const removeItem = async (id: number) => {
    try {
      await api.delete(`tasks/${id}`)
      getList()
    } catch (e) {
      console.error('ERROR DELETING ELEMENT', e)
    }
  }

  return (
    <>
      <ShouldRender if={!!list?.length}>
        <div className="d-flex justify-content-center">
          {list?.map((item: any) => (
            <Item key={item?.id} {...item} removeItem={removeItem} />
          ))}
        </div>
      </ShouldRender>
      <ShouldRender if={!list?.length}>
        <div className="d-flex justify-content-center">
          <div className="alert alert-warning" role="alert">
            Nenhum item cadastrado!
          </div>
        </div>
      </ShouldRender>
    </>
  )
}

export default ItemsList
