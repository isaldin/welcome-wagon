## @ui/flex

It's a silver bullet for your layouts. Basically, you need to code this horrific paddings and flexes no more, you can just do this:

```tsx
import React from 'react'
import { Flex, Layout } from '@ui/flex'

const AmazingThing = ({ things }: { things: string[] }) => {
  return (
    {/** Adds padding to all flex box */}
    <Layout px={20} py={20}>
      {things.map(d => (
        <React.Fragment key={d}>
          <span>{d}</span>
          {/** Adds some padding */}
          <Flex basis={20} />
        </React.Fragment>
      ))}
    </Layout>
  )
}
```
