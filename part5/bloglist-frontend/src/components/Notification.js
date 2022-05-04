
const Notification = ({ message, isErrorMessage }) => {

  const messageStyle = isErrorMessage ? 'error common' : 'info common'

  return (
    <div class={messageStyle}>
      {message}
    </div>
  )
}
export default Notification