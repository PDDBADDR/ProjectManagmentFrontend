import { useAppSelector } from '../../app/hooks'

export default function IndexPage() {
  const username = useAppSelector((state) => state.user.username)
  return <div>{(username && <>Hello {username}</>) || <>Please log in</>}</div>
}
