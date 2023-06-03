import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import ItemsList from '../components/ItemsList'
import { Task } from '../models/Task'

const server = setupServer(
  rest.post('/tasks', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const MOCKED_LIST: Task[] = [
  { id: 1, title: 't1', description: 'd1', done: true },
  { id: 2, title: 't2', description: 'd2', done: false },
]

jest.mock('./../hooks/useAPI', () => {
  return jest.fn(() => ({
    get: jest.fn(),
  }))
})

describe('Task List', () => {
  it('submits form and redirects to home page', () => {
    const serverApi = jest.fn(() => ({
      get: jest.fn().mockReturnValue({ data: { tasks: MOCKED_LIST } }),
    }))

    const { getByTestId } = render(<ItemsList apiServer={serverApi} />)

    // Check if items were rendered
    expect(getByTestId('item-1')).toBeInTheDocument()
    expect(getByTestId('item-2')).toBeInTheDocument()

    // Verify if the mock api was called
    expect(serverApi.mock.calls.length).toBe(1)
  })
})
