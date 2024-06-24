import { createLazyFileRoute } from '@tanstack/react-router'
import List from '../List/List'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <h1 className="mt-4">
        <i className="fa-solid fa-file-lines"></i> Shopping List
      </h1>
      <List></List>
    </>
  )
}
