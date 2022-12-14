import { StoreObj } from './store'

export interface ErrorField {
  name: string
  message: string
}
export interface ErrorInfo {
  errorFields: ErrorField[]
  values: StoreObj
  firstMessage?: string
}
type Validator = (value: any) => boolean
type AsyncValidatorFunc = Promise<StoreObj>

export type Rules = Rule[]

export interface Rule {
  required?: boolean
  validator?: Validator
  asyncValidator?: AsyncValidatorFunc
  regexp?: RegExp
  message?: string
}
export type RuleMap = {
  [key: string]: Rules
}
type validateCallback = (
  ok: boolean,
  value: StoreObj,
  errorInfo: ErrorInfo | null,
) => void

class AsyncValidator {
  descriptors: RuleMap
  errInfo: ErrorInfo

  constructor(descriptors: RuleMap) {
    this.descriptors = descriptors || Object.create(null)
    this.errInfo = {
      errorFields: [],
      values: {},
    }
  }
  checkNoMessage(k: string, rule: Rule) {
    let ruleName = ''
    if (Object.prototype.hasOwnProperty.call(rule, 'required')) {
      ruleName = 'required'
    } else if (Object.prototype.hasOwnProperty.call(rule, 'validate')) {
      ruleName = 'validate'
    } else if (Object.prototype.hasOwnProperty.call(rule, 'regexp')) {
      ruleName = 'regexp'
    }

    if ([void 0, null].some((x) => x === rule.message)) {
      console.warn(`error message with '${ruleName}' of '${k}' is not set`)
    }
  }
  checkRegexp(k: string, rule: Rule) {
    if (Object.prototype.toString.call(rule.regexp) !== '[object RegExp]') {
      console.error(`${k}'s regexp rule should be a RegExp express`)
      return false
    }
    return true
  }
  checkValidateFunction(k: string, rule: Rule) {
    if (typeof rule.validator !== 'function') {
      console.error(`${k}'s validator rule should be a sync function`)
      return false
    }
    return true
  }
  requiredIsFalse(rules: Rules) {
    let required
    for (const rule of rules) {
      if (Object.prototype.hasOwnProperty.call(rule, 'required')) {
        required = rule.required
      }
    }
    return required === false
  }
  isEmptyVoidNull(value: string | null | undefined) {
    return value === void 0 || value === undefined || value === ''
  }
  validate(values: StoreObj, cb?: validateCallback) {
    const keys = Object.keys(values)
    for (const k of keys) {
      const rules = this.descriptors[k]
      if (rules && rules.length > 0) {
        const requiredIsFalse = this.requiredIsFalse(rules)
        for (const rule of rules) {
          if (
            Object.prototype.hasOwnProperty.call(rule, 'required') &&
            rule.required === true
          ) {
            if (['', void 0, null].some((x) => x === values[k])) {
              this.checkNoMessage(k, rule)
              this.errInfo.errorFields.push({
                name: k,
                message: rule.message || '',
              })
              this.errInfo.values[k] = values[k]
              break
            }
          } else if (Object.prototype.hasOwnProperty.call(rule, 'validator')) {
            if (this.checkValidateFunction(k, rule)) {
              if (requiredIsFalse && this.isEmptyVoidNull(values[k])) {
                //don't check when (not required && isEmtpyVoidNull)
                break
              }
              if (rule.validator && rule.validator(values[k]) === false) {
                this.checkNoMessage(k, rule)
                this.errInfo.errorFields.push({
                  name: k,
                  message: rule.message || '',
                })
                this.errInfo.values[k] = values[k]
                break
              }
            }
          } else if (Object.prototype.hasOwnProperty.call(rule, 'regexp')) {
            if (this.checkRegexp(k, rule)) {
              if (requiredIsFalse && this.isEmptyVoidNull(values[k])) {
                //don't check when (not required && isEmtpyVoidNull)
                break
              }
              if (!rule.regexp?.test(values[k])) {
                this.checkNoMessage(k, rule)
                this.errInfo.errorFields.push({
                  name: k,
                  message: rule.message || '',
                })
                this.errInfo.values[k] = values[k]
                break
              }
            }
          }
        }
      }
    }

    let ret = true
    if (this.errInfo.errorFields.length > 0) {
      ret = false
      this.errInfo.firstMessage = this.errInfo.errorFields[0].message
    }

    if (cb) {
      cb(ret, values, ret ? null : this.errInfo)
    } else {
      return new Promise((resolve, reject) => {
        ret ? resolve(values) : reject(this.errInfo)
      })
    }
  }
}
export default AsyncValidator
