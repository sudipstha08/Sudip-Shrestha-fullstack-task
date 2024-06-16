import { FC } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { User } from '@/interfaces'
import { userService } from '@/services'
import { VALIDATION_SCHEMA } from '@/utils'
import { PublicRoute } from '@/components'

export type SignUpDto = z.infer<typeof VALIDATION_SCHEMA.login>

const SignupPageComponent: FC = () => {
  const navigate = useNavigate()

  const initialValues: Partial<User> = {
    username: '',
    password: '',
  }

  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: userService.signUp,
    onSuccess: async () => {
      toast.success('Signed up successfully')
      navigate('/login')
    },
    onError: ({ error }: { error: { message: string } }) => {
      toast.error(error.message)
    },
  })

  const { control, handleSubmit } = useForm<SignUpDto>({
    defaultValues: initialValues,
    mode: 'all',
    resolver: zodResolver(VALIDATION_SCHEMA.login),
  })

  const onSubmit = (data: SignUpDto) => {
    signupUser({ ...data })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="username"
                control={control}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="johndoe"
                      required
                    />
                    <p className="text-red-600 sm:text-sm">{error?.message}</p>
                  </div>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <p className="text-red-600 sm:text-sm">{error?.message}</p>
                  </div>
                )}
              />
              <button
                type="submit"
                disabled={isPending}
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isPending ? 'cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 inline-block text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : (
                  'Sign Up'
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-green-300"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export const SignupPage = PublicRoute(SignupPageComponent)
