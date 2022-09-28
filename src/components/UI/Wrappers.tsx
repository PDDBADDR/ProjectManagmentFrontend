import { between } from 'polished'
import styled from 'styled-components'

export const SlimWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: ${between('250px', '400px')};

  h2 {
    text-align: center;
    font-weight: normal;
  }
`
