import InternalRadio, { RadioProps } from './Radio'
import RadioGroup, { RadioGroupProps } from './RadioGroup'
import { FunctionComponent } from 'preact'

export type { RadioProps, RadioGroupProps }

interface CompoundedComponent
    extends FunctionComponent<RadioProps> {
    Group: typeof RadioGroup;
}

const Radio = InternalRadio as unknown as CompoundedComponent;

Radio.Group = RadioGroup

export default Radio