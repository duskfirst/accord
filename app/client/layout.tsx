export default function Layout({
  children,
  chatList,
  sidenav,
}: {
  children: React.ReactNode
  chatList: React.ReactNode
  sidenav: React.ReactNode
}) {
  return (
    <div className="flex h-full w-full">
      <div className="border flex items-center justify-center h-full">
        {sidenav}
      </div>
      <div className="border flex items-center justify-center w-4/12 h-full">
        {chatList}
      </div>
      <div className="border flex items-center justify-center flex-grow h-full">
        {children}
      </div>
    </ div>
  )
}