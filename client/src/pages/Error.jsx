import { NavLink } from "react-router";

const Error = () => {
    return(
        <>
            <section id = "error-page">
                <div className="content">
                    <h1 className="header">404</h1>
                    <h4>Sorry! Page not found!</h4>
                    <p>
                        Oops! It seems like the page you're trying to access doesn't exist!
                    </p>
                    <div className="btns">
                        <NavLink to = "/">Return Home</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error;