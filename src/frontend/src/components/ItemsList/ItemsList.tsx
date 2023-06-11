import React, { FC, useEffect, useState } from 'react'
import Item from '../Item'
import useAPI from '../../hooks/useAPI'
import { Task } from '../../models/Task'
import ShouldRender from '../ShouldRender'

type Params = {
  apiServer?: any
}
const ItemsList: FC<Params> = ({ apiServer }) => {
  const api = useAPI()
  const [list, setList] = useState<Task[]>([])

  const getList = async () => {
    try {
      let data = undefined
      if (!!apiServer) {
        data = apiServer().get('tasks')?.data
      } else {
        data = (await api.get('tasks')).data
      }
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
            <div data-testid={`item-${item?.id}`} key={item?.id}>
              <Item {...item} removeItem={removeItem} />
            </div>
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
