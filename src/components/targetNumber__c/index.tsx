/**
 * @file 数值指标组件
 * @description 基于 Neo 平台的 XObject 实体对象数值指标组件，用于展示多个关键数值指标
 */
import * as React from 'react';
// @ts-ignore
import { xObject } from 'neo-open-api'; // Neo Open API

import './style.scss';

interface EntityApiKey {
  xObjectApiKey: string;
  objectId: string;
  fieldDescList?: any[];
  fields?: string[];
  autoFetchData?: boolean;
}

/**
 * 字段描述信息接口
 */
interface FieldDesc {
  value: string;
  label: string;
  type?: string;
}

/**
 * 自定义样式配置接口
 */
interface TargetNumberStyle {
  baseStyle?: {
    backgroundColor?: string;
    paddingMargin?: {
      margin?: string;
      padding?: string;
      quantity?: string;
    };
  };
  layoutStyle?: {
    alignClass?: string;
    legendOrient?: string;
  };
  titleStyle?: {
    show?: boolean;
    text?: string;
    fontSize?: number;
    fontWeight?: number;
    color?: string;
  };
  numberStyle?: {
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    linkHref?: string;
  };
  numberTitleStyle?: {
    fontSize?: number;
    fontWeight?: number;
    color?: string;
    linkHref?: string;
  };
}

/**
 * 组件属性接口
 */
interface TargetNumberProps {
  /** 实体对象的 API Key */
  entityApiKey?: EntityApiKey;
  /** 绑定的字段描述信息数组 */
  selectFieldDesc?: FieldDesc[];
  /** 自定义样式配置 */
  targetNumberStyle?: TargetNumberStyle;
  /** 数值格式化函数 */
  formatter?: (value: any, fieldDesc?: FieldDesc) => string;
  /** Neo 平台传递的数据 */
  data?: any;
  /** 组件类名 */
  className?: string;
}

/**
 * 字段值接口
 */
interface FieldValue {
  fieldDesc: FieldDesc;
  value: any;
}

/**
 * 组件状态接口
 */
interface TargetNumberState {
  recordData: any; // 数据列表
  /** 当前字段值数组 */
  targetNumbers: FieldValue[];
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
}

/**
 * 数值指标组件
 * 用于展示多个关键数值指标，支持从 XObject 实体对象获取动态数据
 * 每个字段都会显示为一个独立的数值块，包含字段标签和数值
 */
export default class TargetNumber extends React.PureComponent<
  TargetNumberProps,
  TargetNumberState
> {
  constructor(props: TargetNumberProps) {
    super(props);

    // 初始化组件状态
    this.state = {
      recordData: {},
      targetNumbers: [],
      loading: false,
      error: null,
    };

    // 绑定方法上下文
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    const { entityApiKey, selectFieldDesc } = this.props;

    if (entityApiKey && this.hasValidFieldDesc(selectFieldDesc)) {
      // 加载数据
      this.loadData();
    }
  }

  /**
   * 检查字段描述是否有效
   */
  hasValidFieldDesc(selectFieldDesc?: FieldDesc[]): boolean {
    return Array.isArray(selectFieldDesc);
  }

  componentWillReceiveProps(nextProps: TargetNumberProps) {
    const { selectFieldDesc } = nextProps;
    if (selectFieldDesc && this.hasValidFieldDesc(selectFieldDesc)) {
      this.getTargetNumbers(selectFieldDesc);
    }
  }

  /**
   * 组件更新后执行
   * 当 entityApiKey 或 selectFieldDesc 发生变化时重新加载数据
   */
  async componentDidUpdate(prevProps: TargetNumberProps) {
    const { entityApiKey, selectFieldDesc } = this.props;
    const { entityApiKey: prevEntityApiKey } = prevProps;

    if (
      entityApiKey?.xObjectApiKey !== prevEntityApiKey?.xObjectApiKey ||
      entityApiKey?.objectId !== prevEntityApiKey?.objectId
    ) {
      if (entityApiKey?.xObjectApiKey && entityApiKey?.objectId) {
        this.loadData();
      } else {
        this.setState({
          recordData: {},
          targetNumbers: [],
          error: null,
        });
      }
    }
  }

  /**
   * 提取数值指标数据
   * 根据配置的 selectFieldDesc 数组，提取数据列表中的字段值
   */
  getTargetNumbers(selectFieldDesc: FieldDesc[]) {
    const { recordData } = this.state;

    let fieldValues: FieldValue[] = [];
    if (selectFieldDesc && selectFieldDesc.length > 0) {
      fieldValues = selectFieldDesc.map((fieldDesc: FieldDesc) => ({
        fieldDesc,
        value: recordData[fieldDesc.value],
      }));
    }

    this.setState({
      targetNumbers: fieldValues,
    });
  }

  /**
   * 加载数据
   * 从 Neo 平台获取 XObject 实体数据，直接使用查询结果的第一条记录
   */
  async loadData() {
    const { entityApiKey, selectFieldDesc } = this.props;
    this.setState({ loading: true, error: null });

    try {
      // 查询数据
      const result = await xObject.get(entityApiKey);

      if (result && result.status) {
        const recordData = result.data || {};
        let fieldValues: FieldValue[] = [];

        if (selectFieldDesc && selectFieldDesc.length > 0) {
          fieldValues = selectFieldDesc.map((fieldDesc) => ({
            fieldDesc,
            value: recordData[fieldDesc.value],
          }));
        }

        this.setState({
          recordData: recordData,
          targetNumbers: fieldValues,
          loading: false,
        });
      } else {
        this.setState({
          recordData: {},
          error: result?.msg || '获取数据失败',
          loading: false,
        });
      }
    } catch (error: any) {
      this.setState({
        recordData: {},
        error: error.message || '获取数据失败',
        loading: false,
      });
    }
  }

  /**
   * 格式化数值
   */
  formatValue(value: any, fieldDesc?: FieldDesc): string {
    const { formatter } = this.props;

    if (value === null || value === undefined) {
      return '-';
    }

    // 如果提供了自定义格式化函数，使用自定义格式化
    if (formatter) {
      return formatter(value, fieldDesc);
    }

    // 根据字段类型进行格式化
    if (
      fieldDesc &&
      (fieldDesc.type === 'number' || fieldDesc.type === 'currency')
    ) {
      // 数字类型，添加千分位
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        return numValue.toLocaleString('zh-CN');
      }
    }

    return String(value);
  }

  /**
   * 渲染组件
   */
  render() {
    const { targetNumbers, loading, error } = this.state;
    const { className, targetNumberStyle = {} } = this.props;

    console.log('TargetNumber:', this.props);

    // 从 targetNumberStyle 中获取样式配置
    const {
      baseStyle = {},
      layoutStyle = {},
      titleStyle: titleStyleConfig = {},
      numberStyle: numberStyleConfig = {},
      numberTitleStyle: numberTitleStyleConfig = {},
    } = targetNumberStyle;

    // 获取布局方式，默认为 flex-col
    // 兼容 configSchema 中的值映射：horizontal -> flex-col
    let alignClass = layoutStyle?.alignClass || 'flex-col';
    if (alignClass === 'horizontal') {
      alignClass = 'flex-col';
    }

    // 获取基础样式
    const baseStyleObj: React.CSSProperties = {
      backgroundColor: baseStyle?.backgroundColor || '#ffffff',
    };

    // 处理内外边距
    const paddingMargin = baseStyle?.paddingMargin || {};
    const margin = paddingMargin.margin || '0';
    const padding = paddingMargin.padding || '0';
    const quantity = paddingMargin.quantity || 'px';

    // 应用单位到 margin 和 padding
    const formatSpacing = (value: string, unit: string) => {
      if (!value || value === '0') return '0';
      // 如果值已经包含单位，直接返回；否则添加单位
      if (/\d+(px|rem|em|%)$/.test(value.trim())) {
        return value;
      }
      return `${value}${unit}`;
    };

    baseStyleObj.margin = formatSpacing(margin, quantity);
    // 如果 padding 为 0，使用默认的 16px（保持原有样式）
    const finalPadding =
      padding === '0' ? '16px' : formatSpacing(padding, quantity);
    baseStyleObj.padding = finalPadding;

    // 数值样式
    const numberStyle: React.CSSProperties = {
      fontSize: numberStyleConfig?.fontSize
        ? `${numberStyleConfig.fontSize}px`
        : '32px',
      fontWeight: numberStyleConfig?.fontWeight || 600,
      color: numberStyleConfig?.color || '#262626',
    };

    // 数值标题样式（字段标签）
    const numberTitleStyle: React.CSSProperties = {
      fontSize: numberTitleStyleConfig?.fontSize
        ? `${numberTitleStyleConfig.fontSize}px`
        : '14px',
      fontWeight: numberTitleStyleConfig?.fontWeight || 400,
      color: numberTitleStyleConfig?.color || '#8c8c8c',
    };

    // 组件标题样式（根据 titleStyle 配置，仅当 show 为 true 时展示）
    const showTitle = titleStyleConfig?.show === true;
    const titleStyle: React.CSSProperties = {
      fontSize:
        titleStyleConfig?.fontSize != null
          ? `${titleStyleConfig.fontSize}px`
          : '24px',
      fontWeight: titleStyleConfig?.fontWeight ?? 400,
      color: titleStyleConfig?.color || '#000000',
    };

    // 渲染单个数值块
    const renderFieldValue = (fieldValue: FieldValue, index: number) => {
      const fieldLabel = fieldValue.fieldDesc?.label || '数值指标';
      const formattedValue = this.formatValue(
        fieldValue.value,
        fieldValue.fieldDesc,
      );

      // 处理数值链接
      const numberLinkHref = numberStyleConfig?.linkHref;
      const numberContent = numberLinkHref ? (
        <a
          href={numberLinkHref}
          style={{ ...numberStyle, textDecoration: 'none' }}
        >
          {formattedValue}
        </a>
      ) : (
        formattedValue
      );

      // 处理标题链接
      const titleLinkHref = numberTitleStyleConfig?.linkHref;
      const titleContent = titleLinkHref ? (
        <a
          href={titleLinkHref}
          style={{ ...numberTitleStyle, textDecoration: 'none' }}
        >
          {fieldLabel}
        </a>
      ) : (
        fieldLabel
      );

      return (
        <div key={index} className={`target-number-item ${alignClass}`}>
          <div className="target-number-value" style={numberStyle}>
            {numberContent}
          </div>
          <div className="target-number-label" style={numberTitleStyle}>
            {titleContent}
          </div>
        </div>
      );
    };

    return (
      <div
        className={`targetNumber__c ${className || ''}`}
        style={baseStyleObj}
      >
        {showTitle && (titleStyleConfig?.text ?? '') !== '' && (
          <div className="target-number-title" style={titleStyle}>
            {titleStyleConfig?.text}
          </div>
        )}
        <div className="target-number-block multiple-fields">
          {loading ? (
            <div className="target-number-loading">加载中...</div>
          ) : error ? (
            <div className="target-number-error">{error}</div>
          ) : targetNumbers.length > 0 ? (
            <div className="target-number-list">
              {targetNumbers.map((fieldValue, index) =>
                renderFieldValue(fieldValue, index),
              )}
            </div>
          ) : (
            <div className="target-number-empty">暂无数据</div>
          )}
        </div>
      </div>
    );
  }
}
