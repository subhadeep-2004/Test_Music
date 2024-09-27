import { Icon } from '@iconify/react';
import TextInput from '../components/shared/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import Password from '../components/shared/Password';
import { useState } from 'react';
import { makeUnAuthenticatedpostRequest } from '../util/serverHelper';
import { useCookies } from 'react-cookie';

function SignUp() {
  const [email, setEmail] = useState("");
  const [Confirmemail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);

  async function signUp() {
    if (Confirmemail !== email) {
      alert("Emails do not match");
      return;
    }

    const data = {
      email,
      pwd: password,
      userName: username,
      firstName: FirstName,
      lastName: LastName,
    };

    const response = await makeUnAuthenticatedpostRequest("/auth/register", data);
    if (response) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);

      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/home");
    } else {
      console.log("Failure", response);
    }
  }

  return (
    <div className="signUp w-full h-full flex flex-col items-center">

      {/* Logo Section */}
      <div className="logo bg-neutral-200 p-5 w-full flex justify-center items-center">
        <Icon icon="fxemoji:musicalnote" width={40} />
        <h1 className="ml-2 font-bold text-2xl md:text-3xl">Musicify</h1>
      </div>

      {/* Form Section */}
      <div className="TextInput w-full max-w-xs md:max-w-md py-8 flex flex-col items-center justify-center">
        <div className="font-bold mb-5 text-base md:text-lg text-center">
          Sign up to start Listening
        </div>

        {/* Email Input */}
        <TextInput
          label="Email address"
          placeholderName="Enter your email address"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email address"
          placeholderName="Enter your email again"
          value={Confirmemail}
          setValue={setConfirmEmail}
        />

        {/* Password Input */}
        <Password
          label="Create password"
          placeholderName="Enter your password"
          value={password}
          setValue={setPassword}
        />

        {/* Username Input */}
        <TextInput
          label="What should we call you?"
          placeholderName="Enter a username"
          value={username}
          setValue={setUsername}
        />

        {/* First Name Input */}
        <TextInput
          label="First Name"
          placeholderName="First Name"
          value={FirstName}
          setValue={setFirstName}
        />

        {/* Last Name Input */}
        <TextInput
          label="Last Name"
          placeholderName="Last Name"
          value={LastName}
          setValue={setLastName}
        />

        {/* Sign Up Button */}
        <div className="Button w-full flex justify-end mb-2">
          <button
            className="button bg-emerald-300 font-semibold py-2 px-4 rounded-full w-full md:w-auto"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Divider */}
        <div className="my-2 w-full border-b border-solid border-gray-400"></div>

        {/* Login Section */}
        <div className="my-2 font-semibold text-xs md:text-sm">
          Already have an account?
        </div>

        <div className="SignUp w-full border border-black rounded-full flex justify-center items-center p-2 hover:underline">
          <Link to="/login">LOGIN FOR MUSIC</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
