import { useCallback, useMemo, useState } from 'react'
import {
  clearStoredUser,
  createUserFromSignup,
  findDemoAccount,
  loadStoredUser,
  saveStoredUser,
} from '../utils/auth'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = loadStoredUser()
    return { isAuthenticated: Boolean(stored), user: stored }
  })

  const login = useCallback((email, password) => {
    const account = findDemoAccount(email, password)
    if (!account) {
      return { ok: false, error: 'Invalid email or password.' }
    }
    saveStoredUser(account.user)
    setState({ isAuthenticated: true, user: account.user })
    return { ok: true, user: account.user }
  }, [])

  const signup = useCallback((payload) => {
    const user = createUserFromSignup(payload)
    saveStoredUser(user)
    setState({ isAuthenticated: true, user })
    return user
  }, [])

  const logout = useCallback(() => {
    clearStoredUser()
    setState({ isAuthenticated: false, user: null })
  }, [])

  const updateUser = useCallback((partial) => {
    setState((prev) => {
      if (!prev.user) return prev
      const user = { ...prev.user, ...partial }
      saveStoredUser(user)
      return { ...prev, user }
    })
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      login,
      signup,
      logout,
      updateUser,
    }),
    [state.isAuthenticated, state.user, login, signup, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
