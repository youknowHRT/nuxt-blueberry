export interface ValidationCode {
  id: number,
  email: string,
  code: string,
  usedAt: Date,
  createdAt: Date,
  updatedAt: Date,
}