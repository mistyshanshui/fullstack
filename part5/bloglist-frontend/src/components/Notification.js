
const Notification = ({ message, isErrorMessage }) => {

  const messageStyle = isErrorMessage ? 'error common' : 'info common'

  return (
    <div className={messageStyle}>
      {message}
    </div>
  )
}
export default Notification