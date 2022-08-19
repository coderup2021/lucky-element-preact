import { useState, ChangeEvent } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../styles/index.scss";

import { Input } from "./Input";

export default {
  title: "Example/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const DefaultInput: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState<string>();
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Input style={{ width: 200 }} placeholder="default Input" />
      <Input
        defaultValue={value}
        value={value}
        style={{ width: 200 }}
        placeholder="controlled Input"
        onChange={onValueChange}
      />
    </>
  );
};

const Template: ComponentStory<typeof Input> = (args) => (
  <Input style={{ width: 200 }} {...args} />
);
export const disabled = Template.bind({});
disabled.args = {
  placeholder: "disabled input",
  disabled: true,
};

export const iconInput = Template.bind({});
iconInput.args = {
  placeholder: "icon input",
  icon: "search",
};

export const prependInput = Template.bind({});
prependInput.args = {
  placeholder: "append baidu",
  prepend: "https://",
};

export const appendInput = Template.bind({});
appendInput.args = {
  placeholder: "append input",
  append: ".com",
};
