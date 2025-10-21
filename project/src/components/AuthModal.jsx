import { useState } from 'react';
import { X } from './icons';
import { useAuth } from '../contexts/AuthContext';

export function AuthModal({ isOpen, onClose }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onClose();
      } else {
        if (!fullName.trim()) {
          setError('Please enter your full name');
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white/95 p-8 shadow-soft">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-brand-earth/60 transition-colors duration-300 hover:bg-brand-powder/60 hover:text-brand-earth"
          aria-label="Close authentication modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8 space-y-3">
          <span className="badge-soft">welcome</span>
          <h2 className="text-3xl font-display text-brand-charcoal">
            {mode === 'signin' ? 'Reconnect to your ritual' : 'Create your beauty sanctuary'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-accent uppercase tracking-[0.18em] text-brand-earth/70">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-brand-sage/50 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-earth/50 shadow-inner transition-all duration-300 ease-out focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-accent uppercase tracking-[0.18em] text-brand-earth/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-brand-sage/50 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-earth/50 shadow-inner transition-all duration-300 ease-out focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-accent uppercase tracking-[0.18em] text-brand-earth/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-brand-sage/50 bg-white px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-earth/50 shadow-inner transition-all duration-300 ease-out focus:border-brand-rose focus:outline-none focus:ring-2 focus:ring-brand-rose/30"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-brand-rose/40 bg-brand-powder/60 px-4 py-3 text-sm text-brand-earth">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
            }}
            className="text-sm font-accent text-brand-earth/80 transition-colors duration-300 hover:text-brand-earth"
          >
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span className="font-semibold text-brand-charcoal">
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
