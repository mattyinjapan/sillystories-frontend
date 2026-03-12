import { useState } from 'react';
import api from '../api';
import AuthCard from '../components/AuthCard/AuthCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid; 
  const showEmailError = emailDirty && !isEmailValid;
  const showPasswordError = passwordDirty && !isPasswordValid;
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || isLoading) return;

    setIsLoading(true);

    try {

      await api.get('/sanctum/csrf-cookie', {
         withCredentials: true,
      });

      const res = await api.post('/login', {
        email,
        password,
    });

    console.log('Logged in user:', res.data.user);

    const me = await api.get("/me");
    console.log(me.data);

    login({
      user: me.data,
      token: "sanctum-cookie", // token isn't really used with sanctum but your context requires one
    });

    navigate("/");

  } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      console.error(
          err.response?.data?.message || 'Login failed'
      );
  } finally {
      setIsLoading(false);
  }
    
  };

  return (
    <AuthCard>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setEmailDirty(true)}
          placeholder="Email"
          required
        />
        {
          showEmailError && (
            <span className="error">Please enter a valid email</span>
          )
        }

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setPasswordDirty(true)}
            placeholder="Password (min 8 characters)"
            minLength={8}
            required
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {
          showPasswordError && (
            <span className="error">Password must be at least 8 characters</span>
            )
          }

        <button type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? <span className="spinner" /> : 'Login'}
        </button>
        {error && <span className="error">{error}</span>}

        <div className="auth-link">
          <Link to="/register">Register Account</Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default Login;
