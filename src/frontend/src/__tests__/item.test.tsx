import { render, fireEvent } from '@testing-library/react'
import Item from '../components/Item'
import { BrowserRouter } from 'react-router-dom'

const noop = (_: any) => null as any

describe('Item', () => {
  it('Navigate to the edit page of the selected item when clicking on edit', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Item
          id={1}
          title="Title"
          description="Description"
          removeItem={noop}
        />
      </BrowserRouter>
    )

    const editItemBtn = getByTestId('edit-btn')
    fireEvent.click(editItemBtn)
    expect(global.window.location.pathname).toBe('/edit/1')
  })
})
