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

  it('Render the edit button correctly', () => {
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
    expect(editItemBtn.textContent).toBe('Editar')
  })

  it('Render the delete button correctly', () => {
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
  
    const deleteItemBtn = getByTestId('delete-btn')
    expect(deleteItemBtn.textContent).toBe('Deletar')
  })

  it('Call removeItem function when clicking on delete button', () => {
    const removeItemMock = jest.fn()
    const { getByTestId } = render(
      <Item
        id={1}
        title="Title"
        description="Description"
        removeItem={removeItemMock}
      />
    )
  
    const deleteItemBtn = getByTestId('delete-btn')
    fireEvent.click(deleteItemBtn)
  
    expect(removeItemMock).toHaveBeenCalledWith(1)
  })  
})
