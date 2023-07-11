import { attachReduxDevTools } from '@effector/redux-devtools-adapter'
import './App.scss'
import './init'
import PageCheckForm from '../pages/PageCheckForm/PageCheckForm'
import Layout from '../processes/Layout/Layout'

attachReduxDevTools({
  name: 'check-user',
  trace: true,
})

function App() {
  return (
    <Layout>
      <PageCheckForm />
    </Layout>
  )
}

export default App
