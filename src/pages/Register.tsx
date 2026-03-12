import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/AuthCard/AuthCard';
import api from '../api';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const isPasswordValid = password.length >= 8;
    const doPasswordsMatch = password === confirmPassword;

    const isFormValid =
        firstName.trim() !== '' &&
        lastName.trim() !== '' &&
        email.includes('@') && isPasswordValid && doPasswordsMatch;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
        await api.post('/api/register', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirmation: confirmPassword,
        });

        setSuccess(true);
        } catch (err: any) {
        setError(
            err.response?.data?.message ||
            'Something went wrong. Please try again.'
        );
        } finally {
        setIsLoading(false);
        }
    };

    if (success) {
        return (
        <AuthCard>
            <h1>Account Created 🎉</h1>
            <p>You can now log in.</p>
            <Link to="/login">Go to Login</Link>
        </AuthCard>
        );
    }

    return (
        <AuthCard>
        <form className="form" onSubmit={handleSubmit}>
            <h1>Register</h1>

            <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
            />

            <input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
            />

            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password (min 8 characters)"
            />

            <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
            />

            {!isPasswordValid && password.length > 0 && (
                <span className="error">Password must be at least 8 characters</span>
            )}

            {password.length > 0 && confirmPassword.length > 0 && !doPasswordsMatch && (
                <span className="error">Passwords do not match</span>
            )}

            {error && <span className="error">{error}</span>}

            <button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? <span className="spinner" /> : 'Create Account'}
            </button>

            <div className="auth-link">
            <Link to="/login">Back to Login</Link>
            </div>
        </form>
        </AuthCard>
    );
}

export default Register;
