import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router'



function register() {
  const router = useRouter()
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    password: "",
    password1: "",
  });

  const handleButton = async () => {
    console.log(registerInfo);
    if (registerInfo.password === registerInfo.password1) {
        axios.post("http://localhost:3000/api/createaccount", registerInfo)
        .then((res) => {
            console.log(res);
            router.push('/login')
        })
        .catch((err) => {
            console.log(err);
        })

     
    } else {
      console.log("password not matched");
    }
    setRegisterInfo({
      name: "",
      password: "",
      password1: "",
    });
  };
  return (
    <>
      <div className="container w-25 mx-auto mt-5 border border-primary rounded p-4">
      <Link href="/" className="cc-btn"><i className=" icon bi bi-house"></i></Link>
        <h1 className="text-primary text-center mb-5">Register</h1>
        
        <div className="form-group">
          <input
            className="form-control"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, name: e.target.value })
            }
            value={registerInfo.name}
            type="text"
            name="name"
            placeholder="Your name"
          />
          <input
            className="form-control my-4"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password: e.target.value })
            }
            value={registerInfo.password}
            type="password"
            name="password"
            placeholder="Your passs"
          />
          <input
            className="form-control my-4"
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password1: e.target.value })
            }
            value={registerInfo.password1}
            type="password"
            name="password1"
            placeholder="Your passs again"
          />
          <button className="btn btn-primary" onClick={handleButton}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default register;
