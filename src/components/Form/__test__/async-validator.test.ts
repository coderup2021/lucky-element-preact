import AsyncValidator, { ErrorInfo } from '../async-validator'

let validator = null
describe('test async-validator.js', () => {
  it('should validte required false rule ok', async () => {
    const rules = [
      {
        required: false,
        message: 'username is required',
      },
    ]
    const ruleMap = { username: rules }
    const instance = new AsyncValidator(ruleMap)
    const res = await instance.validate({ username: '' })
    expect(res).toEqual({ username: '' })
  })
  it('should validte required true rule ok', async () => {
    const rules = [
      {
        required: true,
        message: 'username is required',
      },
    ]
    const ruleMap = { username: rules }
    const instance = new AsyncValidator(ruleMap)
    try {
      await instance.validate({ username: '' })
    } catch (error: any) {
      expect(error.firstMessage).toBe('username is required')
    }
    const cb2 = jest.fn()
    const instance2 = new AsyncValidator(ruleMap)
    instance2.validate({ username: '' }, cb2)
    expect(cb2).toHaveBeenCalledWith(
      false,
      { username: '' },
      {
        errorFields: [{ message: 'username is required', name: 'username' }],
        firstMessage: 'username is required',
        values: { username: '' },
      },
    )
    const cb3 = jest.fn()
    const instance3 = new AsyncValidator(ruleMap)
    instance3.validate({ username: 'lj' }, cb3)
    expect(cb3).toHaveBeenCalledWith(true, { username: 'lj' }, null)
  })

  it('should validte validator rule ok', async () => {
    const errMessage = 'string length should be > 4'
    const rules = [
      {
        validator: (value: string) => {
          return value.length >= 5
        },
        message: errMessage,
      },
    ]
    const ruleMap = { username: rules }
    const instance = new AsyncValidator(ruleMap)
    try {
      await instance.validate({ username: '124' })
    } catch (error: any) {
      expect(error.firstMessage).toBe(errMessage)
    }

    const instance2 = new AsyncValidator(ruleMap)
    const res = await instance2.validate({ username: '12345' })
    expect(res).toEqual({ username: '12345' })
  })

  it('should validte regexp rule ok', async () => {
    const errMessage = 'string should be only numbers'
    const rules = [
      {
        regexp: /\d+/,
        message: errMessage,
      },
    ]
    const ruleMap = { username: rules }
    const instance = new AsyncValidator(ruleMap)
    try {
      await instance.validate({ username: 'abcd' })
    } catch (error: any) {
      expect(error.firstMessage).toBe(errMessage)
    }

    const instance2 = new AsyncValidator(ruleMap)
    const res = await instance2.validate({ username: '12345' })
    expect(res).toEqual({ username: '12345' })
  })

  it('should validte required false and validate rule ok', async () => {
    const requiredMsg = 'username is required'
    const valiMsg = 'username length should > 4'
    const rules = [
      {
        required: false,
        message: requiredMsg,
      },
      {
        validate: (value: string) => {
          return value.length >= 5
        },
        message: valiMsg,
      },
    ]
    const ruleMap = { username: rules }
    const instance = new AsyncValidator(ruleMap)
    const res = await instance.validate({ username: '' })
    expect(res).toEqual({ username: '' })
    try {
      const res = await instance.validate({ username: '123' })
    } catch (error: any) {
      expect(error.firstMessage).toBe(valiMsg)
    }
  })
})
