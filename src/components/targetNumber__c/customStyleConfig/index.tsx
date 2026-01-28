// @ts-ignore
import { FormItem, RendererProps } from 'amis';
import React from 'react';
import { Input, Button, Modal, message } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
// @ts-ignore
import JSONEditor from '@wibetter/json-editor';
import '@wibetter/json-editor/lib/index.css';

import { configSchema } from './configSchema';
import './index.scss';

interface ICustomStyleConfigProps {
  onChange?: Function;
  value?: any;
  name: string;
}

interface ICustomStyleConfigState {
  isModalVisible: boolean;
  editorValue: any;
}

@FormItem({
  type: 'customStyleConfig',
  detectProps: ['data'],
})
export default class CustomStyleConfigRenderer extends React.Component<
  RendererProps & ICustomStyleConfigProps,
  ICustomStyleConfigState
> {

  constructor(props: RendererProps & ICustomStyleConfigProps) {
    super(props);

    this.state = {
      isModalVisible: false,
      editorValue: props.value || {},
    };

    this.showModal = this.showModal.bind(this);
    this.handleModalOk = this.handleModalOk.bind(this);
    this.handleModalCancel = this.handleModalCancel.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {
    const value = this.props.value || {};
    this.setState({ editorValue: value });
  }

  componentWillReceiveProps(nextProps: RendererProps & ICustomStyleConfigProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ editorValue: nextProps.value || {} });
    }
  }

  handleEditorChange = (value: any) => {
    this.setState({ editorValue: value });
  };

  handleModalOk = () => {
    const { editorValue } = this.state;
    const { onChange } = this.props;

    try {
      onChange && onChange(editorValue);
      this.setState({ isModalVisible: false });
    } catch (error) {
      message.error('保存配置失败');
    }
  };

  handleModalCancel = () => {
    // 取消时恢复原始值
    const value = this.props.value || {};
    this.setState({ 
      isModalVisible: false,
      editorValue: value 
    });
  };

  showModal = () => {
    const value = this.props.value || {};
    this.setState({ 
      isModalVisible: true,
      editorValue: value 
    });
  };

  getDisplayValue = () => {
    const { value } = this.props;

    if (!value || Object.keys(value).length === 0) {
      return '';
    }

    return '已配置自定义样式';
  };

  render() {
    const { disabled, viewStyle, wideScreen } = this.props;
    const { isModalVisible, editorValue } = this.state;

    return (
      <div className="properties-panel-custom-style-config">
        <div className="custom-style-config-input-container">
          <Input
            value={this.getDisplayValue()}
            placeholder="请配置自定义样式"
            disabled={disabled}
            readOnly
            className="custom-style-config-input"
          />
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={this.showModal}
            disabled={disabled}
            className="custom-style-config-setting-btn"
          />
        </div>
        <Modal
          title="自定义样式配置"
          visible={isModalVisible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
          width={800}
          centered={true}
          okText="确定"
          cancelText="取消"
          destroyOnClose={false}
        >
          <div className="custom-style-config-modal-content">
            {isModalVisible && (
              <JSONEditor
                schemaData={configSchema}
                jsonData={editorValue}
                onChange={this.handleEditorChange}
                viewStyle={viewStyle || 'tabs'}
                tabPosition="left"
                wideScreen={wideScreen ?? false}
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
