export interface RootedPropertyDecorator<Target> {
  (
    target: Target,
    propertyKey: Parameters<PropertyDecorator>[1]
  ): ReturnType<PropertyDecorator>;
}

export interface RootedMethodDecorator<Target> {
  (
    target: Target,
    propertyKey: Parameters<MethodDecorator>[1],
    foo: Parameters<MethodDecorator>[2]
  ): ReturnType<MethodDecorator>;
}

export type RootedMethodAndPropDecorator<Target> =
  RootedPropertyDecorator<Target> & RootedMethodDecorator<Target>;
