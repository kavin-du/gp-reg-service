import { Role } from "src/roles/role.enum"

export type jwtPayload = {
  sub: number,
  roles: Role[],
}