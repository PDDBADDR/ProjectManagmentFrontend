import styled from 'styled-components'
import BlankProfileImg from '../../assets/img/blank-profile.svg'

interface AvatarProps {
  username: string
  img?: string
}

interface AvatarStyleProps {
  username: string
  url: string
}

export default function Avatar(props: AvatarProps) {
  const url = props.img || BlankProfileImg
  return <AvatarWrapperStyled username={props.username} url={url}></AvatarWrapperStyled>
}

const AvatarWrapperStyled = styled.div<AvatarStyleProps>`
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.muted};
  background-image: url(${(p) => p.url});
  background-position: center;
  background-size: cover;

  &::after {
    content: '${(p) => p.username}';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    border: none;
    border-radius: 5px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: white;
    background-color: ${(p) => p.theme.primary};
    padding: 1px;
    font-size: 9px;
  }
`
