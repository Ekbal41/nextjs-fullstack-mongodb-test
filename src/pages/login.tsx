import { useState } from "react";
import axios from 'axios'
import Link from "next/link";
import { useRouter } from 'next/router'





function login() {
   
    const router = useRouter();

    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        password: "",

    });

    const handleLogin = async () => {
        axios.post('http://localhost:3000/api/login', registerInfo)
        .then((res) => {
            console.log(res)
            router.push('/')

        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (

        <div className="container w-25 mx-auto mt-5 border border-primary rounded p-4">
            <Link href="/" className="cc-btn"><i className=" icon bi bi-house"></i></Link>
            <h1 className="text-primary text-center mb-5">Log In</h1>
            <div className="form-group">
                <input className="form-control" type='text' name="name" onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, name: e.target.value })
                }
                    value={registerInfo.name} placeholder="Your name" />
                <input className="form-control my-4" type='password' onChange={(e) =>
                    setRegisterInfo({ ...registerInfo, password: e.target.value })
                }
                    value={registerInfo.password} name="password" placeholder="Your passs" />

                <button className="btn btn-primary" onClick={handleLogin}>Log In</button>

            </div>

        </div>

    )
}

export default login