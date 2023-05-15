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
