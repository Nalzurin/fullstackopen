export default function LogoutUser({setUser, setNotification}){

    const Logout = () =>{
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null);
        setNotification({ message: "Logged out", failure: false });
        setTimeout(() => {
          setNotification({
            message: null,
            failure: false,
          });
        }, 5000);
    }


    return(<input type="button" onClick={Logout} value="Logout"></input>);
}