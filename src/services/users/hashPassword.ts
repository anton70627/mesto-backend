import bcrypt from 'bcryptjs'

const LENGTH = 10

export const getHashPassword = async (password: string) => bcrypt.hash(password, LENGTH)

export const checkPassword = async (currentPassword: string, userPasswordHash: string) => bcrypt.compare(currentPassword, userPasswordHash)
