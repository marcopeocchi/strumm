import { useRecoilState } from "recoil"
import { themeState, Theme } from "../atoms/settings"

const themes: Record<Theme, Theme> = {
  dark: "dark",
  light: "light",
  system: "system",
}

const Settings: React.FC = () => {
  const [theme, setTheme] = useRecoilState(themeState)

  return (
    <div className="px-8 pt-8">
      <h1 className="font-semibold text-2xl">
        Client Settings
      </h1>
      <div className='border-b pt-4 dark:border-neutral-700' />
      <div className="pt-6 grid grid-cols-4 gap-1.5">
        <div className="font-semibold">
          Theme
        </div>
        <select
          className="
            w-full
            col-span-3
            appearance-none 
            px-2 py-1.5 
          dark:bg-neutral-700 bg-neutral-100 
            rounded 
            border dark:border-neutral-700 
            capitalize"
          onChange={e => { setTheme(e.currentTarget.value as Theme) }}
          value={theme}
        >
          {Object.keys(themes).map((theme, index) => (
            <option key={index}>{theme}</option>
          ))}
        </select>
        <div className="font-semibold">
          Version
        </div>
        <div className="col-span-3">
          v1.0.5
        </div>
      </div>
    </div>
  )
}

export default Settings