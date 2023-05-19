import { render, fireEvent } from '@testing-library/react'
import ItemForm from '../components/ItemForm'

const noop = (_: any) => null as any

describe('ItemForm', () => {
  it('find right fields on task creation', () => {
    const { getByTestId } = render(<ItemForm handleOnSubmit={noop} />)
    expect(getByTestId('title-label')).toBeInTheDocument()
    expect(getByTestId('description-label')).toBeInTheDocument()
  })

  it('initial state should be empty', () => {
    const { getByTestId } = render(<ItemForm handleOnSubmit={noop} />)
    expect((getByTestId('title-control') as any).value).toBe('')
    expect((getByTestId('description-control') as any).value).toBe('')
  })

  it('show error when form is empty', () => {
    const { getByTestId } = render(<ItemForm handleOnSubmit={noop} />)
    fireEvent.click(getByTestId('submit-btn'))
    expect(getByTestId('error-message')).toBeInTheDocument()
  })

  it('do not show error when form is valid', () => {
    const { getByTestId, queryByTestId } = render(
      <ItemForm handleOnSubmit={noop} />
    )

    fireEvent.change(getByTestId('title-control'), {
      target: { value: 'Tarefa 1' },
    })
    fireEvent.change(getByTestId('description-control'), {
      target: { value: 'Descrição da tarefa' },
    })
    fireEvent.click(getByTestId('submit-btn'))
    expect(queryByTestId('error-message')).not.toBeInTheDocument()
  })

  it('handleOnSubmit is called when submit form', () => {
    const handleOnSubmit = jest.fn()
    const { getByTestId } = render(<ItemForm handleOnSubmit={handleOnSubmit} />)
    fireEvent.change(getByTestId('title-control'), {
      target: { value: 'title' },
    })
    fireEvent.change(getByTestId('description-control'), {
      target: { value: 'description' },
    })
    fireEvent.click(getByTestId('submit-btn'))
    expect(handleOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('edit content is rightly initialized', () => {
    const { getByTestId } = render(
      <ItemForm
        handleOnSubmit={noop}
        item={{
          title: 'Tarefa 1',
          description: 'Descrição da tarefa',
          done: true,
        }}
      />
    )
    expect((getByTestId('title-control') as any).value).toBe('Tarefa 1')
    expect((getByTestId('description-control') as any).value).toBe(
      'Descrição da tarefa'
    )
    expect((getByTestId('complete-control') as any).checked).toBe(true)
  })
})
