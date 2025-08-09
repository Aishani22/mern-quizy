import { useState } from "react";
import { useAuth } from "../store/auth";

const Contact = () => {

    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: ""
    });

    const [userData, setUserData] = useState(true);

    const {user} = useAuth();

    if(userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: ""
        })

        setUserData(false);
    }

    const handleChange = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3000/api/form/contact`, {
                method: "POST", 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(contact)
            })
            if(response.ok) {
                setContact({
                    username: user.username,
                    email: user.email,
                    message: ""
                })
                alert("Message sent successfully!");
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
    <>
         <section>
            <main>
                <div className="contact-container">
                    <div className="contact-image">
                        <img src="/images/registerImage.jpeg" alt="contact image"></img>
                    </div>
                    <div className="contact-form">
                        <h1>
                            Contact
                        </h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <br/>
                                <input type="text" name="username" placeholder="Enter Your Username" id="username" required autoComplete="off" value={contact.username} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <br/>
                                <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off" value={contact.email} onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="message">Message</label>
                                <br/>
                                <textarea name= "message" rows= "5" placeholder="Enter Your Message" id="message" required autoComplete="off" value={contact.message} onChange={handleChange}/>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    </>)
}

export default Contact;