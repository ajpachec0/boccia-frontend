export class CustomFormData<T> {
  constructor(private form: FormData) {}

  get(key: T) {
    return this.form.get(key as unknown as string);
  }

  getAll(key: T) {
    return this.form.getAll(key as unknown as string);
  }
}
