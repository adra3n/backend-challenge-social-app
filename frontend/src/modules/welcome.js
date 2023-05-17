import { Input, Ripple, initTE } from 'tw-elements'
import React, { useContext } from 'react'
import axios from 'axios'
import './welcome.css'
// import { UserContext } from '../contexts/UserContext'
initTE({ Input, Ripple })
const Welcome = ({ setUser, setToken }) => {
  //   const Context = useContext(UserContext)
  let username
  let email
  let password

  function handleLogin(e) {
    e.preventDefault()
    const username = document.getElementById('usernameInput').value
    const password = document.getElementById('passwordInput').value
    const email = document.getElementById('emailInput').value
    const data = { username, password, email }
    console.log('___data___', data)

    axios
      .post('http://localhost:9000/api/auth/login', data)
      .then((res) => {
        console.log('___res.data___', res.data)
        setUser(res.data)
        setToken(res.data.token)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div class="flex flex-col items-center justify-center">
      <h1 class="pb-10  text-2xl">Welcome!</h1>
      <form>
        <p class="mb-4 items-center text-center">
          Please login to your account
        </p>
        {/* <!--Username input--> */}
        <div class="relative mb-4" data-te-input-wrapper-init>
          <input
            type="text"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="usernameInput"
            placeholder="Username"
            value={username}
          />
          <label
            for="usernameInput"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Username
          </label>
        </div>
        {/* <!--Email input--> */}
        <div class="relative mb-4" data-te-input-wrapper-init>
          <input
            type="email"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="emailInput"
            placeholder="Email"
            value={email}
          />
          <label
            for="emailInput"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Email
          </label>
        </div>

        {/* <!--Password input--> */}
        <div class="relative mb-4" data-te-input-wrapper-init>
          <input
            type="password"
            class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="passwordInput"
            placeholder="Password"
            value={password}
          />
          <label
            for="passwordInput"
            class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
          >
            Password
          </label>
        </div>

        {/* <!--Submit button--> */}
        <div class="mb-12 pb-1 pt-1 text-center">
          <button
            class="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            style={{
              background:
                'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
            }}
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>

        {/* <!--Register button--> */}
        <div class="flex items-center justify-between pb-6">
          <p class="mb-0 mr-2">Don't have an account?</p>
          <button
            type="button"
            class="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Welcome
