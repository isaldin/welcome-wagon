import format from 'date-fns/format';
import parse from 'date-fns/parse';
import React, { useEffect, useRef, useState } from 'react';
import DayPicker from 'react-day-picker';

import { localeProps } from './locale';
import TextInput from './TextInput';
import { AbsoluteWrapper, RelativeWrapper } from './ui';

export type DatePickerProps = Partial<
  React.ComponentProps<typeof DayPicker>
> & {
  inputProps?: React.ComponentProps<typeof TextInput>
  onDateChanged: (newDate: Date | undefined) => void
  value: Date | undefined
}

const dateFormatRu = 'd.M.yyyy'
const today = new Date()

const parseDate = (dirty: string): Date | undefined => {
  const [day, month, year] = dirty.split('.')

  if (year && year.length === 4 && month.length > 0 && day.length > 0) {
    const date = parse(dirty, dateFormatRu, 0)

    if (Number.isNaN(date.getMonth())) {
      return null
    }

    return date
  }

  return null
}

const DatePicker = ({
  inputProps,
  value,
  onDateChanged,
  ...dateProps
}: DatePickerProps) => {
  const [inputDate, setInputDate] = useState('')
  const [isToggled, setToggled] = useState(false)

  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (value) {
      const formattedDate = format(value, dateFormatRu)

      setInputDate(formattedDate)
    }
  }, [value])

  const onInputChanged = event => {
    const { value } = event.target

    setInputDate(value)
    const formattedDate = parseDate(value)

    if (formattedDate) {
      onDateChanged(formattedDate)
    }
  }

  const onBlurred = () => {
    setToggled(false)
  }

  const onOverlayFocused = () => {
    inputRef.current.focus()
  }

  const preDateChanged = (date: Date | undefined) => {
    onDateChanged(date)
    setToggled(false)
  }

  return (
    <RelativeWrapper>
      <TextInput
        {...inputProps}
        inputRef={inputRef}
        onFocus={() => setToggled(true)}
        onBlur={onBlurred}
        onChange={onInputChanged}
        value={inputDate || ''}
        placeholder={dateFormatRu}
      />
      <AbsoluteWrapper tabIndex={0} onFocus={onOverlayFocused}>
        {isToggled ? (
          <DayPicker
            fromMonth={today}
            selectedDays={[value].filter(d => !!d)}
            onDayClick={preDateChanged}
            {...localeProps()}
            {...dateProps as React.ComponentProps<typeof DayPicker>}
          />
        ) : null}
      </AbsoluteWrapper>
    </RelativeWrapper>
  )
}

export default DatePicker
