import React, { useState } from 'react'; //import React Component
import { auth, cloudStore } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { Nav } from '../components/Nav';

export function Signin() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const handleInputChange = (e) => {
        let { id, value } = e.target

        if (id === "email") {
            setemail(value)
        }
        if (id === "password") {
            setpassword(value)
        }
    }

    const signup = () => {
        window.location.href = "/signup"
    }

    const noDepoly = () => {
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";
        text = document.createTextNode("Do not support currently");
        tips.appendChild(text)
        tips.className = "show";
        setTimeout(() => {
            tips.className = tips.className.replace("show", "disappear");
        }, 2000);
    }

    const signin = async () => {
        let tips = document.getElementById("snackbar");
        tips.innerHTML = '';
        let text = "";

        if (email.trim().length !== 0 && password.trim().length !== 0) {
            if (!validateEmail(email)) {
                text = document.createTextNode("Invalid Email Address");
                tips.appendChild(text)
                tips.className = "show";
                setTimeout(() => {
                    tips.className = tips.className.replace("show", "disappear");
                }, 2000);
            } else {
                const userData = await getDocs(query(collection(cloudStore, "userData"), where("Personal_Information.email", "==", email))); //Check email exsit
                const userData_array = userData.docs.map(doc => doc.data()); //Change promise to array
                if (userData_array.length === 0) {
                    text = document.createTextNode("Email not existed");
                    tips.appendChild(text)
                    tips.className = "show";
                    setTimeout(() => {
                        tips.className = tips.className.replace("show", "disappear");
                    }, 2000);
                } else {
                    let password_check = userData_array[0]["Personal_Information"]["password"]
                    let userID = userData_array[0]["Personal_Information"]["userID"]
                    if (password !== password_check) {
                        text = document.createTextNode("Wrong password");
                        tips.appendChild(text)
                        tips.className = "show";
                        setTimeout(() => {
                            tips.className = tips.className.replace("show", "disappear");
                        }, 2000);
                    } else {

                        text = document.createTextNode("Successfully Log in");
                        tips.style.backgroundColor = "#54b37b"
                        tips.appendChild(text)
                        tips.className = "show";
                        setTimeout(() => {
                            tips.className = tips.className.replace("show", "disappear");
                        }, 2000);

                        signInWithEmailAndPassword(auth, email, password)
                            .catch((error) => {
                                console.error("Error: ", error);
                            });
                        localStorage.setItem("loginUser", userID)

                        let previousPage = localStorage.getItem("previousPage");
                        if (previousPage !== null) {
                            setTimeout(() => {
                                window.location.href = `/${previousPage}`
                                localStorage.removeItem("previousPage")
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                window.location.href = "/main"
                            }, 1000);
                        }
                    }
                }
            }
        } else {
            text = document.createTextNode("You should fill out all the empty blanks");
            tips.appendChild(text)
            tips.className = "show";
            setTimeout(() => {
                tips.className = tips.className.replace("show", "disappear");
            }, 2000);
        }
    }

    return (
        <div id="Signup">
            <Nav />
            <div className='sign_grid'>
                <div>
                    <div className='signup'>
                        <h1 style={{ textAlign: "center" }}>Welcome Back</h1>
                        <div className='decorate_signin' onClick={noDepoly}>
                            <svg t="1689651041086" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2301" width="200" height="200"><path d="M214.101333 512c0-32.512 5.546667-63.701333 15.36-92.928L57.173333 290.218667A491.861333 491.861333 0 0 0 4.693333 512c0 79.701333 18.858667 154.88 52.394667 221.610667l172.202667-129.066667A290.56 290.56 0 0 1 214.101333 512" fill="#FBBC05" p-id="2302"></path><path d="M516.693333 216.192c72.106667 0 137.258667 25.002667 188.458667 65.962667L854.101333 136.533333C763.349333 59.178667 646.997333 11.392 516.693333 11.392c-202.325333 0-376.234667 113.28-459.52 278.826667l172.373334 128.853333c39.68-118.016 152.832-202.88 287.146666-202.88" fill="#EA4335" p-id="2303"></path><path d="M516.693333 807.808c-134.357333 0-247.509333-84.864-287.232-202.88l-172.288 128.853333c83.242667 165.546667 257.152 278.826667 459.52 278.826667 124.842667 0 244.053333-43.392 333.568-124.757333l-163.584-123.818667c-46.122667 28.458667-104.234667 43.776-170.026666 43.776" fill="#34A853" p-id="2304"></path><path d="M1005.397333 512c0-29.568-4.693333-61.44-11.648-91.008H516.650667V614.4h274.602666c-13.696 65.962667-51.072 116.650667-104.533333 149.632l163.541333 123.818667c93.994667-85.418667 155.136-212.650667 155.136-375.850667" fill="#4285F4" p-id="2305"></path></svg>
                            <span>Sign in with Google</span>
                        </div>

                        <div className='sep_auth_email'>
                            <hr /><span>or</span><hr />
                        </div>

                        <form>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                // placeholder="Write your Email"
                                onChange={(e) => handleInputChange(e)}
                                value={email}
                            />
                            <hr />
                            <label htmlFor="password">Password: </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                // placeholder="Password"
                                onChange={(e) => handleInputChange(e)}
                                value={password}
                            />
                            <hr />

                            <div className='decorate_signin' onClick={signin}>Sign in</div>
                            <div>
                                <p>New to Enrich Culture? &nbsp;
                                    <span
                                        onClick={signup}
                                        style={{ color: 'green', cursor: "pointer" }}
                                    >Sign up for free</span>
                                </p>
                            </div>
                        </form>
                        <div id="snackbar"></div>
                    </div>
                </div>
                <img
                    className='signLogo'
                    src='./img/sign.png'
                    alt="sign"
                />
            </div>
        </div>
    );
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};