// 导入自定义配置项（用于对接复杂自定义配置）
import './customStyleConfig';
/**
 * @file 数值指标组件对接编辑器的描述文件
 * @description 定义组件在 Neo 平台编辑器中的配置信息
 * @author Neo Custom Widget CLI
 * @version 1.0.0
 */
export class TargetNumberModel {
  /**
   * 组件类型标识
   * 用于标识组件的唯一性，在构建时根据当前组件目录名称自动生成
   * 注意：此字段在构建时会被自动替换，不需要手动设置
   */
  // cmpType: string = 'targetNumber';

  /** 组件名称，用于设置在编辑器左侧组件面板中展示的名称 */
  label: string = '数值指标';

  /** 组件描述，用于设置在编辑器左侧组件面板中展示的描述 */
  description: string =
    '用于展示关键数值指标，支持从 XObject 实体对象获取动态数据，支持绑定多个字段进行展示';

  /** 分类标签，用于设置在编辑器左侧组件面板哪个分类中展示  */
  // tags: string[] = ['自定义组件'];

  /** 组件图标，用于设置在编辑器左侧组件面板中展示的图标 */
  iconUrl: string = 'https://custom-widgets.bj.bcebos.com/TargetNumber.svg';

  /**
   * 用于设置组件支持的页面类型
   *
   * 当前 NeoCRM 平台存在的页面类型：
   * all:	1	全页面
   * entityFormPage:	4	实体表单页
   * customPage:	6	自定义页面
   */
  targetPage: string[] = ['all'];

  /**
   * 用于设置组件支持的终端类型
   *
   * 当前 NeoCRM 平台存在的终端类型：
   * web:	网页端
   * mobile: 移动端
   */
  targetDevice: string = 'all';

  /** 初次插入页面的默认属性数据 */
  defaultComProps = {
    entityApiKey: '',
    targetNumberStyle: {
      baseStyle: {
        backgroundColor: '#ffffff',
        paddingMargin: {
          margin: '0',
          padding: '0',
        },
      },
      layoutStyle: {
        alignClass: 'flex-col',
      },
      titleStyle: {
        show: false,
        text: '',
        fontSize: 24,
        fontWeight: 400,
        color: '#000',
      },
      numberStyle: {
        fontSize: 32,
        fontWeight: 600,
        color: '#262626',
      },
      numberTitleStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#8c8c8c',
      },
    },
  };

  /**
   * 组件属性配置模式
   * 支持静态配置：propsSchema，优先级比 propsSchemaCreator 低
   * 定义组件在编辑器中可配置的属性
   */
  propsSchema = [
    {
      type: 'xObjectDetailApi',
      name: 'entityApiKey',
      label: '绑定实体业务数据',
      placeholder: '绑定实体业务数据源',
      disabledFieldSelect: true,
      disabledAutoFetchData: true,
    },
    {
      type: 'selectFieldDescApi',
      name: 'selectFieldDesc',
      xObjectApiKey: 'entityApiKey.xObjectApiKey',
      mode: 'tags', // 多选，必填
      label: '绑定字段',
      placeholder: '请至少选择一个要显示的字段',
    },
    {
      type: 'customStyleConfig',
      name: 'targetNumberStyle',
      label: '自定义样式配置',
      viewStyle: 'tabs', // 'tabs'、'fold'
      wideScreen: false, // 是否开启宽屏展示模式
    },
  ];
}

export default TargetNumberModel;
