import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Login data:', data);

    navigate('/dashboard');
  }
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Kirish</h1>
          <p className="text-gray-500">Hisobingizga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email', {
              required: "Email kiritishingiz shart!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email formati noto'g'ri!"
              }
            })}
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
            Parol
          </label>
          <input
            {...register('password', {
              required: "Parol kiritishingiz shart!",
              minLength: {
                value: 4,
                message: "Parol kamida 4 ta belgidan iborat bo'lishi kerak!"
              }
            })}
            type="password"
            placeholder="Parol"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-700 py-3 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-400 disabled:hover:scale-100"
        >
          {isSubmitting ? 'Kuting...' : 'Kirish'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Hisobingiz yo'qmi?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Ro'yxatdan o'tish
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
