
const Notification = ({ message, isErrorMessage }) => {
  const errorStyle = {
    color: 'red',
    fontsize: 30
  }
  const infoStyle = {
    color: 'green',
    fontsize: 30
  }

  const messageStyle = isErrorMessage ? errorStyle : infoStyle

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}
export default Notification