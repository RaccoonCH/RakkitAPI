export abstract class FrontType {
  readonly type: {
    name: string,
    subject: string
  };

  constructor(typeName: string, typeSubject?: string) {
    this.type = {
      name: typeName,
      subject: typeSubject || "other"
    };
  }
}
