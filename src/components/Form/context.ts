import { createContext } from 'preact'
import { StoreInterface } from './store'

const context = createContext<StoreInterface | null>(null)

export default context
