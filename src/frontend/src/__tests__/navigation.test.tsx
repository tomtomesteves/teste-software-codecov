import { render, fireEvent, screen } from '@testing-library/react'
import Header from '../components/Header'
import { BrowserRouter } from 'react-router-dom'

//test block
test('test navigation', () => {
  // render the component on virtual dom
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )

  //select the elements you want to interact with
  const addItemBtn = screen.getByTestId('add-item')

  //interact with those elements
  fireEvent.click(addItemBtn)

  //assert the expected result
  expect(global.window.location.pathname).toContain('/add')
})
