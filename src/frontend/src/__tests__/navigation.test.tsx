import { render, fireEvent, screen } from '@testing-library/react'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'

test('Navigate to add page when press ad', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  const addItemBtn = screen.getByTestId('add-btn')
  fireEvent.click(addItemBtn)
  expect(global.window.location.pathname).toBe('/add')
})

test('Navigate to home page when press home', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  const addItemBtn = screen.getByTestId('home-btn')
  fireEvent.click(addItemBtn)
  expect(global.window.location.pathname).toBe('/')
})

test('Navigate to the delete page of the selected item when clicking on delete', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  const deleteItemBtn = screen.getByTestId('del-btn')
  fireEvent.click(deleteItemBtn)
  expect(global.window.location.pathname).toBe('/delete')
})

test('Navigate to the edit page of the selected item when clicking on edit', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  const editItemBtn = screen.getByTestId('edit-btn')
  fireEvent.click(editItemBtn)
  expect(global.window.location.pathname).toBe('/edit')
})


