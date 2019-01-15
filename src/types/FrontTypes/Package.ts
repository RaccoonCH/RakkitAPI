export interface IPackage {
  readonly className: string;
  readonly name: string;
  readonly attributes: {};
  readonly description?: string;
  readonly requiredRole?: "default" | "admin";
  readonly icon?: string;
}

export interface IPackageParams extends Pick<IPackage, "description" | "requiredRole" | "icon"> {
  readonly name?: string;
  readonly description?: string;
  readonly requiredRole?: "default" | "admin";
  readonly icon?: string;
}
