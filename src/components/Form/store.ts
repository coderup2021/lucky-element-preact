import { StateUpdater, useRef, useState } from 'preact/hooks'
import Schema, { Rule, RuleMap, ErrorInfo } from './async-validator'

export interface StoreObj {
  [key: string]: any
}
type Rerender = () => void
export type FinishCallback = (value: StoreObj) => void
export type FinishErrCallback = (errorInfo: ErrorInfo) => void
interface Callbacks {
  onFinish?: FinishCallback
  onFinishFail?: FinishErrCallback
}
interface FieldEntity {
  name: string
  onStoreChange: () => void
  onErrChange: (error: string) => void
  rules?: Rule[]
}

export interface StoreInterface {
  store: StoreObj
  reRender: StateUpdater<any>
  callbacks: Callbacks
  fieldEntities: FieldEntity[]
  getFieldValue(name: string): void
  getFieldsValue: () => StoreObj
  setFieldValue(name: string, value: any): void
  setFieldsValue(value: StoreObj): void
  setCallbacks(cb: Callbacks): void
  notifyStoreChange?: () => void
  notifyErrChange?: (errInfo: ErrorInfo) => void
  validateFields: (value: StoreObj) => Promise<StoreObj>
  validateField: (name: string, value: any) => Promise<StoreObj>
  submit(): void
  registerField(field: FieldEntity): void
  getInstance: () => {
    getFieldValue(name: string): void
    getFieldsValue: () => StoreObj
    setFieldValue(name: string, value: any): void
    setFieldsValue(value: StoreObj): void
    setCallbacks(cb: Callbacks): void
    registerField(field: FieldEntity): void
    validateFields: (value: StoreObj) => Promise<StoreObj>
    validateField: (name: string, value: string) => Promise<StoreObj>
    submit(): void
    store: StoreObj
  }
}
class Store implements StoreInterface {
  store: StoreObj
  reRender: StateUpdater<any>
  callbacks: Callbacks
  fieldEntities: FieldEntity[]

  constructor(initValue: StoreObj, reRender: Rerender) {
    this.store = initValue || Object.create(null)
    this.reRender = reRender
    this.callbacks = {}
    this.fieldEntities = []
  }

  getFieldValue = (name: string) => {
    return this.store[name]
  }

  notifyStoreChange = () => {
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange()
    })
  }

  notifyErrChange = (errInfo: ErrorInfo) => {
    errInfo.errorFields.forEach((error) => {
      for (const entity of this.fieldEntities) {
        if (entity.name === error.name) {
          entity.onErrChange(error.message)
          break
        }
      }
    })
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange()
    })
  }

  setFieldValue = (name: string, value: string) => {
    this.store[name] = value
    this.notifyStoreChange()
  }

  getFieldsValue = () => {
    return this.store
  }

  setFieldsValue = (obj: StoreObj) => {
    for (const field in obj) {
      this.store[field] = obj
    }
    this.notifyStoreChange()
  }

  setCallbacks = (callbacks: Callbacks) => {
    this.callbacks = callbacks
  }

  validateFields: (value: StoreObj) => Promise<StoreObj> = (
    values: StoreObj,
  ) => {
    const descriptors: RuleMap = this.fieldEntities.reduce(
      (discrip: any, field: FieldEntity) => {
        const rules = field.rules
        if (rules && rules.length > 0) {
          discrip[field.name] = rules
        }
        return discrip
      },
      {},
    )
    return new Promise((resolve, reject) => {
      if (!values) return
      ;(new Schema(descriptors) as any)
        ?.validate(values)
        .then((values: StoreObj) => {
          resolve(values)
        })
        .catch((err: ErrorInfo) => {
          console.error('validateFields err', err)
          this.notifyErrChange(err)
          reject(err)
        })
    })
  }

  validateField: (name: string, value: string) => Promise<StoreObj> = (
    name: string,
    value: any,
  ) => {
    const descriptor: RuleMap = this.fieldEntities.reduce(
      (discrip: any, field) => {
        const rules = field.rules
        if (rules && rules.length > 0) {
          discrip[field.name] = rules
        }
        return discrip
      },
      {},
    )

    return new Promise((resolve, reject) => {
      ;(new Schema({ [name]: descriptor[name] }) as any)
        .validate({ [name]: value })
        .then((values: StoreObj) => {
          resolve(values)
        })
        .catch((err: ErrorInfo) => {
          console.error('validateField err', err)
          this.notifyErrChange(err)
          reject(err)
        })
    })
  }

  submit() {
    this.validateFields(this.store)
      .then(() => {
        const { onFinish } = this.callbacks
        if (typeof onFinish === 'function') onFinish(this.store)
      })
      .catch((errInfo) => {
        const { onFinishFail } = this.callbacks
        if (typeof onFinishFail === 'function') onFinishFail(errInfo)
      })
  }

  registerField = (field: FieldEntity) => {
    this.fieldEntities.push(field)
  }
  getInstance = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldValue: this.setFieldValue,
      setCallbacks: this.setCallbacks,
      registerField: this.registerField,
      validateFields: this.validateFields,
      validateField: this.validateField,
      store: this.store,
      submit: this.submit,
    }
  }
}

const useStore = (initValue: StoreObj) => {
  const storeRef = useRef<StoreInterface>()
  const [, forceUpdate] = useState(Object.create(null))
  if (!storeRef.current)
    storeRef.current = new Store(initValue, forceUpdate as any)
  const store = storeRef.current
  return [store]
}

export default useStore
