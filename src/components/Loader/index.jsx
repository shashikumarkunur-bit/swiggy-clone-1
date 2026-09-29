import { Oval } from 'react-loader-spinner'
import './index.css'

const AppLoader = ({ testId }) => (
  <div className="loader-container" testid={testId} data-testid={testId}>
    <Oval color="gold" height={40} width={50} />
  </div>
)

export default AppLoader
