export default function LogoutUser({setUser}){

    const Logout = () =>{
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null);
    }


    return(<input type="button" onClick={Logout} value="Logout"></input>);
}