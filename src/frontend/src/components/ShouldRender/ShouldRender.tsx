import type { FC, ReactNode } from 'react'

export type ShouldRenderProps = {
  if: boolean
  children: ReactNode
}

const ShouldRender: FC<ShouldRenderProps> = ({ if: condition, children }) => {
  return <>{condition ? children : null}</>
}

export default ShouldRender
