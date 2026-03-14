import React, { useState, useEffect } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserType } from '../../types';
import { loginSchema, signupSchema } from '../../lib/validations';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthProps {
  initialMode: 'login' | 'signup';
  onAuthSuccess: (type: UserType) => void;
}

export const Auth = ({ initialMode, onAuthSuccess }: AuthProps) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [userType, setUserType] = useState<UserType>('customer');
  const [isMobile, setIsMobile] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  useEffect(() => {
    setIsSignUp(initialMode === 'signup');
  }, [initialMode]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAuth = (e: React.FormEvent, isSignupSubmit: boolean) => {
    e.preventDefault();
    try {
      if (isSignupSubmit) {
        signupSchema.parse(formData);
      } else {
        loginSchema.parse({ email: formData.email, password: formData.password });
      }
      onAuthSuccess(userType);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const renderAuthToggle = () => (
    <div className="flex w-full min-h-[44px] gap-1 rounded-2xl bg-border p-1" role="tablist" aria-label="User type selection">
      <button
        type="button"
        role="tab"
        aria-selected={userType === 'customer'}
        onClick={() => setUserType('customer')}
        className={`flex-1 rounded-xl py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
          userType === 'customer' ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'
        }`}
      >
        Customer
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={userType === 'provider'}
        onClick={() => setUserType('provider')}
        className={`flex-1 rounded-xl py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
          userType === 'provider' ? 'bg-white text-ink shadow-sm' : 'text-ink-muted'
        }`}
      >
        Provider
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <main className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-light)] ${userType === 'provider' ? 'provider-active' : ''}`}>
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: isSignUp ? -20 : 20,
              y: isSignUp ? 20 : -20,
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] h-[300px] w-[300px] rounded-full opacity-30 blur-[60px] bg-[var(--brand-deep)]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: isSignUp ? 20 : -20,
              y: isSignUp ? -20 : 20,
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
            className="absolute top-[60%] -right-[10%] h-[300px] w-[300px] rounded-full opacity-30 blur-[60px] bg-[var(--brand-lime)]"
          />
        </div>

        <div className="z-10 w-full max-w-[420px] px-4 py-8">
          <motion.div 
            layout
            className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 p-6 sm:p-8 overflow-hidden relative"
          >
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center text-center w-full"
                >
                  <h1 className="auth-header__title !text-3xl !mb-6">Create Account</h1>
                  
                  <div className="auth-toggle !mb-6">
                    <button
                      type="button"
                      onClick={() => setUserType('customer')}
                      className={`auth-toggle__btn ${userType === 'customer' ? 'active' : ''}`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('provider')}
                      className={`auth-toggle__btn ${userType === 'provider' ? 'active' : ''}`}
                    >
                      Provider
                    </button>
                  </div>

                  <form onSubmit={(e) => handleAuth(e, true)} className="w-full !p-0">
                    <div className="field-group">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="field-group__input"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      <User className="field-group__icon" size={20} />
                      {errors.fullName && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.fullName}</span>}
                    </div>
                    <div className="field-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="field-group__input"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <Mail className="field-group__icon" size={20} />
                      {errors.email && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.email}</span>}
                    </div>
                    <div className="field-group">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="field-group__input"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <Lock className="field-group__icon" size={20} />
                      {errors.password && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.password}</span>}
                    </div>

                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="submit" 
                      className="btn btn--action w-full mt-6"
                    >
                      Register as {userType}
                    </motion.button>

                    <div className="social-grid !mt-6">
                      <motion.a whileTap={{ scale: 0.9 }} href="#" className="social-grid__item" aria-label="Sign up with Google">
                        <img src="https://www.google.com/favicon.ico" className="h-5 w-5" alt="" />
                      </motion.a>
                      <motion.a whileTap={{ scale: 0.9 }} href="#" className="social-grid__item" aria-label="Sign up with Apple">
                        <User size={20} />
                      </motion.a>
                    </div>

                    <p className="mt-8 text-sm text-gray-500">
                      Already have an account?{' '}
                      <button type="button" onClick={() => setIsSignUp(false)} className="font-bold text-[var(--brand-deep)] hover:underline">
                        Login
                      </button>
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center text-center w-full"
                >
                  <h1 className="auth-header__title !text-3xl !mb-6">Welcome Back</h1>
                  
                  <div className="auth-toggle !mb-6">
                    <button
                      type="button"
                      onClick={() => setUserType('customer')}
                      className={`auth-toggle__btn ${userType === 'customer' ? 'active' : ''}`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('provider')}
                      className={`auth-toggle__btn ${userType === 'provider' ? 'active' : ''}`}
                    >
                      Provider
                    </button>
                  </div>

                  <form onSubmit={(e) => handleAuth(e, false)} className="w-full !p-0">
                    <div className="field-group">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="field-group__input"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      <Mail className="field-group__icon" size={20} />
                      {errors.email && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.email}</span>}
                    </div>
                    <div className="field-group">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="field-group__input"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <Lock className="field-group__icon" size={20} />
                      {errors.password && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.password}</span>}
                    </div>

                    <a href="#" className="forgot-link !mb-6">Forgot password?</a>

                    <motion.button 
                      whileTap={{ scale: 0.95 }}
                      type="submit" 
                      className="btn btn--action w-full"
                    >
                      Login as {userType}
                    </motion.button>

                    <div className="social-grid !mt-6">
                      <motion.a whileTap={{ scale: 0.9 }} href="#" className="social-grid__item" aria-label="Login with Google">
                        <img src="https://www.google.com/favicon.ico" className="h-5 w-5" alt="" />
                      </motion.a>
                      <motion.a whileTap={{ scale: 0.9 }} href="#" className="social-grid__item" aria-label="Login with Apple">
                        <User size={20} />
                      </motion.a>
                    </div>

                    <p className="mt-8 text-sm text-gray-500">
                      Don't have an account?{' '}
                      <button type="button" onClick={() => setIsSignUp(true)} className="font-bold text-[var(--brand-deep)] hover:underline">
                        Register
                      </button>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className={`container ${isSignUp ? 'right-panel-active' : ''} ${userType === 'provider' ? 'provider-active' : ''}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={(e) => handleAuth(e, true)}>
          <h1 className="auth-header__title">Create Account</h1>
          
          <div className="auth-toggle">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`auth-toggle__btn ${userType === 'customer' ? 'active' : ''}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType('provider')}
              className={`auth-toggle__btn ${userType === 'provider' ? 'active' : ''}`}
            >
              Provider
            </button>
          </div>
          
          <div className="field-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="field-group__input"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <User className="field-group__icon" size={20} />
            {errors.fullName && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.fullName}</span>}
          </div>
          <div className="field-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="field-group__input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Mail className="field-group__icon" size={20} />
            {errors.email && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.email}</span>}
          </div>
          <div className="field-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="field-group__input"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Lock className="field-group__icon" size={20} />
            {errors.password && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.password}</span>}
          </div>

          <button type="submit" className="btn mt-4 btn--action w-full">
            Register as {userType}
          </button>

          <div className="social-grid">
            <a href="#" className="social-grid__item" aria-label="Sign up with Google">
              <img src="https://www.google.com/favicon.ico" className="h-5 w-5" alt="" />
            </a>
            <a href="#" className="social-grid__item" aria-label="Sign up with Apple">
              <User size={20} />
            </a>
          </div>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={(e) => handleAuth(e, false)}>
          <h1 className="auth-header__title">Login</h1>
          
          <div className="auth-toggle">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`auth-toggle__btn ${userType === 'customer' ? 'active' : ''}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType('provider')}
              className={`auth-toggle__btn ${userType === 'provider' ? 'active' : ''}`}
            >
              Provider
            </button>
          </div>

          <div className="field-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="field-group__input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Mail className="field-group__icon" size={20} />
            {errors.email && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.email}</span>}
          </div>
          <div className="field-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="field-group__input"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Lock className="field-group__icon" size={20} />
            {errors.password && <span className="text-[10px] text-red-500 font-bold absolute -bottom-4 left-4">{errors.password}</span>}
          </div>

          <a href="#" className="forgot-link">Forgot password?</a>

          <button type="submit" className="btn btn--action w-full">
            Login as {userType}
          </button>

          <div className="social-grid">
            <a href="#" className="social-grid__item" aria-label="Login with Google">
              <img src="https://www.google.com/favicon.ico" className="h-5 w-5" alt="" />
            </a>
            <a href="#" className="social-grid__item" aria-label="Login with Apple">
              <User size={20} />
            </a>
          </div>
        </form>
      </div>

      {/* Overlay Container */}
      <div className="overlay-container" aria-hidden="true">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h2 className="auth-sidebar__title">Welcome Back!</h2>
            <p className="auth-sidebar__text">To keep connected with us please login with your personal info</p>
            <button className="btn btn--ghost" onClick={() => setIsSignUp(false)}>Login Now</button>
          </div>

          <div className="overlay-panel overlay-right">
            <h2 className="auth-sidebar__title">Hello, Welcome!</h2>
            <p className="auth-sidebar__text">Login to access your dashboard and book services.</p>
            <button className="btn btn--ghost" onClick={() => setIsSignUp(true)}>Register Now</button>
          </div>
        </div>
      </div>
    </main>
  );
};

