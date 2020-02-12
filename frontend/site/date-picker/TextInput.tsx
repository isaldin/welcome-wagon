import React from 'react'
import styled from '@emotion/styled'

const NativeInput = styled.input`
  border: 2px solid #c5c5c5;
  font-family: sans-serif;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
`

export type TextInputProps = React.ComponentProps<typeof NativeInput> & {
  inputRef: React.Ref<HTMLInputElement>
}

const TextInput = ({ inputRef, ...inputProps }: TextInputProps) => {
  return <NativeInput ref={inputRef} {...inputProps} />
}

export default TextInput
