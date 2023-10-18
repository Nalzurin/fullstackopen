export default function Notification({ message, failure }) {
  if (message === null) {
    console.log("Message null");
    return null;
  }
  console.log("Notification Message: ", message);
  console.log("Fail State: ", failure);
  var colorStyle = "white";
  if (failure) {
    colorStyle = "red";
  } else {
    colorStyle = "green";
  }
  const notificationStyle = {
    fontStyle: "italic",
    fontSize: 16,
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: colorStyle,
  };

  return <div style={notificationStyle}>{message}</div>;
}
