import * as React from 'react';

/**
 * BaseCmpProps 基础组件属性接口
 */
export interface BaseCmpProps {
  [key: string]: any;
}

/**
 * ScopedComponentType 作用域组件类型接口
 */
export interface ScopedComponentType {
  [key: string]: any;
}

/**
 * BaseCmp 基础组件类
 * 继承自 React.PureComponent，提供基础组件功能
 */
export declare class BaseCmp<
  T extends BaseCmpProps = BaseCmpProps,
  S = any
> extends React.PureComponent<T, S> implements ScopedComponentType {
  props: Readonly<T> & Readonly<{ children?: React.ReactNode }>;
  state: Readonly<S>;
  setState<K extends keyof S>(
    state:
      | ((prevState: Readonly<S>, props: Readonly<T>) => Pick<S, K> | S | null)
      | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;
  forceUpdate(callback?: () => void): void;
  render(): React.ReactNode;
}

