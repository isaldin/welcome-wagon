import React, { useState } from 'react'
import styled from '@emotion/styled'
import DatePicker from './date-picker'
import { Flex } from '../../ui/flex'

const PrettyWrapper = styled(Flex)`
  padding: 20px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

const Dates = () => {
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)

  return (
    <PrettyWrapper column>
      <span>start date:</span>
      <Flex basis={10} />
      <DatePicker
        value={startDate}
        onDateChanged={date => setStartDate(date)}
      />

      <Flex basis={20} />

      <span>end date:</span>
      <Flex basis={10} />
      <DatePicker value={endDate} onDateChanged={date => setEndDate(date)} />
      <Flex basis={20} />

      <span>
        current date: from {String(startDate || '<not selected>')} to{' '}
        {String(endDate || '<not selected>')}
      </span>
    </PrettyWrapper>
  )
}

export default Dates
