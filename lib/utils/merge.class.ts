type Constructor = new (...args: any[]) => any;

export const merge = (...classes: Constructor[]) => {
  return class MergedClass {
    constructor(...args: any[]) {
      classes.forEach(ClassConstructor => {
        const instance = new ClassConstructor(...args);
        Object.getOwnPropertyNames(ClassConstructor.prototype).forEach(
          method => {
            if (method !== 'constructor') {
              this[method] = ClassConstructor.prototype[method].bind(instance);
            }
          },
        );
      });
    }
  };
};
