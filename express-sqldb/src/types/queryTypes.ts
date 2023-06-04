export type ConstraintType = {
  primaryColumn: string;
  primaryValue: string;
  secondaryColumn: string;
  columOnSecondaryTable: string;
};

export type UserType = {
  email: string;
  name?: string;
  password: string;
  verrified?: boolean;
  payment_ref?: string | null;
};
