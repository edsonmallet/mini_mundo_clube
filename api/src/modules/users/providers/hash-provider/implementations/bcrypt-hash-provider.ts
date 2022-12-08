import { compare, hash } from 'bcrypt'
import IHashProvider from '../models/ihashprovider'

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 10)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
