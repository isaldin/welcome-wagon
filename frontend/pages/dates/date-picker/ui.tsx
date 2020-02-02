import styled from '@emotion/styled'

export const RelativeWrapper = styled('div')({
  position: 'relative',
  width: '100%',
})

export const AbsoluteWrapper = styled.div`
  position: absolute;
  z-index: 1;
  background: #fff;
  border: 1px solid #fafafa;
`
