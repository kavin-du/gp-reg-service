import { Role } from "src/roles/role.enum"

export type jwtPayload = {
  nhsNumber: string,
  sub: number,
  roles: Role[],
}