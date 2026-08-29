'use client';

import { MOCK_CURRENT_USER, MOCK_LEVELS, MOCK_USERS_BY_ROLE, User, LearningLevel } from './mockData';

export type { User, LearningLevel };

// Local storage key constants
const STORE_KEY_USER = 'hindi_lms_user_state';
const STORE_KEY_ROLE = 'hindi_lms_active_role';
const STORE_KEY_LEVELS = 'hindi_lms_levels_progress';

export function getStoredUser(): User {
  if (typeof window === 'undefined') return MOCK_CURRENT_USER;
  try {
    const saved = localStorage.getItem(STORE_KEY_USER);
    return saved ? JSON.parse(saved) : MOCK_CURRENT_USER;
  } catch (e) {
    return MOCK_CURRENT_USER;
  }
}

export function saveStoredUser(user: User) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user state', e);
  }
}

export function getActiveRole(): User['role'] {
  if (typeof window === 'undefined') return 'student';
  try {
    const saved = localStorage.getItem(STORE_KEY_ROLE) as User['role'];
    return saved || 'student';
  } catch (e) {
    return 'student';
  }
}

export function setActiveRoleInStore(role: User['role']) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORE_KEY_ROLE, role);
    if (MOCK_USERS_BY_ROLE[role]) {
      saveStoredUser(MOCK_USERS_BY_ROLE[role]);
    }
  } catch (e) {
    console.error('Failed to set active role', e);
  }
}

export function loginUserByRole(role: User['role']): User {
  const targetUser = MOCK_USERS_BY_ROLE[role] || MOCK_CURRENT_USER;
  setActiveRoleInStore(role);
  saveStoredUser(targetUser);
  return targetUser;
}

export function addXpToUser(xpAmount: number): User {
  const user = getStoredUser();
  user.xp += xpAmount;
  user.coins += Math.floor(xpAmount / 2);
  saveStoredUser(user);
  return user;
}

export function enrollInCourse(courseId: string): User {
  const user = getStoredUser();
  if (!user.enrolledCourses.includes(courseId)) {
    user.enrolledCourses = [...user.enrolledCourses, courseId];
    saveStoredUser(user);
  }
  return user;
}

export function unenrollFromCourse(courseId: string): User {
  const user = getStoredUser();
  user.enrolledCourses = user.enrolledCourses.filter((id) => id !== courseId);
  saveStoredUser(user);
  return user;
}


