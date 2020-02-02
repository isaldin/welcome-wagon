export interface FillProps {
  fill?: boolean
}

export interface LayoutProps {
  align?: string | string[]
  alignItems?: string | string[]
  justify?: string | string[]
  basis?: string | number | string[] | number[]
  grow?: number
  shrink?: number
  px?: string | number | string[] | number[]
  pt?: string | number | string[] | number[]
  pl?: string | number | string[] | number[]
  pr?: string | number | string[] | number[]
  mb?: string | number | string[] | number[]
  width?: string | number | string[] | number[]
}

export interface RowProps extends LayoutProps, FillProps {
  wrap?: string
}
export interface ColumnProps extends LayoutProps, FillProps {
  wrap?: string
}

export interface BoxProps {
  maxWidth?: string | number | string[] | number[]
  minWidth?: string | number | string[] | number[]
  width?: string | number | string[] | number[]
  height?: string | number | string[] | number[]
  mb?: string | number | string[] | number[]
  ml?: string | number | string[] | number[]
  mr?: string | number | string[] | number[]
  px?: string | number | string[] | number[]
  py?: string | number | string[] | number[]
  pl?: string | number | string[] | number[]
  pr?: string | number | string[] | number[]
  alignItems?: string | string[]
  justifyContent?: string | string[]
  flexDirection?: string | string[]
  backgroundColor?: string
  display?: string | string[]
}
