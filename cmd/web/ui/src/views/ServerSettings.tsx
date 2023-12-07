import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hostFmt } from '../utils/url'

const Settings: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [hasError, setHasError] = useState(false)

  const navigate = useNavigate()

  const changePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setHasError(true)
      return
    }
    const res = await fetch(hostFmt`/api/user/password`, {
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword,
        newPassword,
      })
    })
    if (!res.ok) {
      setHasError(true)
      return
    }
    navigate('/')
  }

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Server settings
      </h1>
      <div className='border-b pt-4 dark:border-neutral-700' />
      <div className="pt-6 flex flex-col gap-2">
        <div className="font-semibold mb-1.5">
          Change password
        </div>
        <input
          type='text'
          placeholder='Current password'
          onChange={(e) => setOldPassword(e.target.value)}
          className='
            dark:bg-neutral-800 bg-neutral-100
            border dark:border-neutral-700 rounded-lg px-1 py-1.5 w-full md:w-96'
        />
        <input
          type='text'
          placeholder='New password'
          onChange={(e) => setNewPassword(e.target.value)}
          className='
            dark:bg-neutral-800 bg-neutral-100
            border dark:border-neutral-700 rounded-lg px-1 py-1.5 w-full md:w-96'
        />
        <input
          type='text'
          placeholder='Confirm new password'
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className='
            dark:bg-neutral-800 bg-neutral-100
            border dark:border-neutral-700 rounded-lg px-1 py-1.5 w-full md:w-96'
        />
        <button
          className={`
            px-1 py-1.5 
            bg-neutral-900 text-neutral-100
            ${hasError ? 'bg-red-500' : 'dark:bg-neutral-100 dark:text-neutral-900'}
            rounded-lg w-full md:w-96`
          }
          onClick={changePassword}
        >
          Change
        </button>
        <div className="font-semibold mt-8">
          Version 1.0
        </div>
      </div>
    </div>
  )
}

export default Settings