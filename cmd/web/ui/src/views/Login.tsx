import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hostFmt } from '../utils/url'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const login = async () => {
    const res = await fetch(hostFmt`/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      })
    })
    if (!res.ok) {
      setHasError(true)
      return
    }
    navigate('/')
  }

  return (
    <div className='flex items-center justify-center h-[80vh]'>
      <div className='
        w-96 
        rounded-lg 
        border dark:border-neutral-700
        dark:bg-neutral-900
        flex flex-col items-center gap-4 p-8'
      >
        <h1 className='text-2xl font-bold mb-4'>
          Strumm login
        </h1>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className='
            dark:bg-neutral-800 bg-neutral-100
            border dark:border-neutral-700 rounded-lg px-1 py-1.5 w-full'
        />
        <input
          type='text'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          className='
            dark:bg-neutral-800 bg-neutral-100
            border dark:border-neutral-700 rounded-lg px-1 py-1.5 w-full'
        />
        <button
          className={`
            px-1 py-1.5 
            bg-neutral-900 text-neutral-100
            ${hasError ? 'bg-red-500' : 'dark:bg-neutral-100 dark:text-neutral-900'}
            rounded-lg w-full`
          }
          onClick={login}
        >
          Submit
        </button>
        {hasError ? 'Wrong username or password!' : ''}
      </div>
    </div>
  )
}

export default Login