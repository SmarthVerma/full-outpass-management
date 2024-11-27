
import { useController, Control } from 'react-hook-form'
import { Label } from "@/components/ui/label"
import { USER_FACULTY, USER_STUDENT } from '@/assets/constant'

interface UserTypeSwitcherProps {
  control: Control<any>
  name: string
}

export default function UserTypeSwitcher({ control, name }: UserTypeSwitcherProps) {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: USER_STUDENT,
  })

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="user-type-switcher" className="text-sm font-medium text-gray-700">
        Select User Type
      </Label>
      <div className="flex rounded-md border shadow-sm" role="group" aria-labelledby="user-type-switcher">
        <button
          type="button"
          className={`px-4 py-2 flex-grow text-sm font-medium rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
            value === 'student'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onChange(USER_STUDENT)}
          aria-pressed={value === USER_STUDENT}
        >
          Student
        </button>
        <button
          type="button"
          className={`px-4 py-2 flex-grow text-sm font-medium rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-050 transition-colors ${
            value === 'faculty'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => onChange(USER_FACULTY)}
          aria-pressed={value === USER_FACULTY}
        >
          Faculty
        </button>
      </div>
    </div>
  )
}