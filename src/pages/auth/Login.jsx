import { useContext, useState } from 'react';
import { useAuth } from '../../hook/useAuth.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Kirish</h1>
          <p className="text-gray-500">Hisobingizga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
            Parol
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parol"
            className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-700 py-3 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:from-blue-300 disabled:to-blue-400 disabled:hover:scale-100"
        >
          {submitting ? 'Kuting...' : 'Kirish'}
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
