import { Role } from "src/roles/role.enum"

export type jwtPayload = {
  name: string,
  sub: number,
  roles: Role[],
}