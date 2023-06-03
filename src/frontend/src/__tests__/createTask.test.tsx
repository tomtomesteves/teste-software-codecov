import { render, fireEvent } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import AddItem from '../components/AddItem'

const server = setupServer(
  rest.post('/tasks', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('./../hooks/useAPI', () => {
  return jest.fn(() => ({
    post: jest.fn(),
  }))
})

describe('AddItem', () => {
  it('submits form and redirects to home page', () => {
    const history = createMemoryHistory()
    const serverApi = jest.fn(() => ({
      post: jest.fn(),
    }))

    const { getByTestId } = render(
      <Router history={history}>
        {/* @ts-ignore: */}
        <AddItem history={history} apiServer={serverApi} />
      </Router>
    )

    fireEvent.change(getByTestId('title-control'), {
      target: { value: 'Tarefa 1' },
    })
    fireEvent.change(getByTestId('description-control'), {
      target: { value: 'Descrição da tarefa' },
    })
    fireEvent.click(getByTestId('submit-btn'))

    // Redirects to home page after submit
    expect(history.location.pathname).toBe('/')

    // Verify if the mock api was called
    expect(serverApi.mock.calls.length).toBe(1)
  })
})
