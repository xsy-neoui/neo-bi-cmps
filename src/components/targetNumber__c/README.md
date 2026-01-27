# 数值指标组件 (targetNumber__c)

## 组件描述

数值指标组件用于展示关键数值指标，支持从 XObject 实体对象获取动态数据。组件支持绑定多个字段，每个字段都会显示为一个独立的数值块，支持自定义样式和布局方式。

## 功能特性

- ✅ 支持从 XObject 实体对象获取动态数据
- ✅ 支持数据源配置（使用 `xObjectEntityList`）
- ✅ 支持多个字段绑定（使用 `selectFieldDescApi`，必填）
- ✅ 支持自定义字体大小、颜色等样式配置
- ✅ 支持两种布局方式：上图下文、左图右文
- ✅ 支持数值格式化（数字类型自动添加千分位）
- ✅ 支持加载状态和错误提示
- ✅ 响应式设计，适配移动端和桌面端
- ✅ 每个字段自动显示自己的标签和数值

## 使用方法

### 基础用法

```tsx
<TargetNumber
  entityApiKey="customContact__c"
  selectFieldDesc={[
    {
      apiKey: "amount__c",
      label: "合同金额",
      type: "currency"
    },
    {
      apiKey: "count__c",
      label: "合同数量",
      type: "number"
    }
  ]}
/>
```

### 配置项说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `entityApiKey` | `string` | - | 实体对象的 API Key |
| `selectFieldDesc` | `object[]` | - | 绑定的字段描述信息数组（包含 apiKey、label、type），至少需要配置一个字段 |
| `fontSize` | `number \| string` | `32` | 数值字体大小（单位：px） |
| `fontColor` | `string` | `#262626` | 数值字体颜色 |
| `fontWeight` | `number \| string` | `600` | 数值字体粗细 |
| `titleFontSize` | `number \| string` | `14` | 字段标签字体大小（单位：px） |
| `titleColor` | `string` | `#8c8c8c` | 字段标签字体颜色 |
| `alignClass` | `'flex-col' \| 'flex-row'` | `'flex-col'` | 布局方式：flex-col（上图下文）或 flex-row（左图右文） |
| `formatter` | `function` | - | 自定义数值格式化函数，接收 (value, fieldDesc) 参数 |
| `className` | `string` | - | 组件类名 |

### 编辑器配置

组件在 Neo 平台编辑器中支持以下配置项：

1. **实体对象** (`xObjectEntityList`): 选择要获取数据的实体对象
2. **绑定字段** (`selectFieldDescApi`): 选择要显示的字段，支持多选，至少需要选择一个字段
3. **数值字体大小**: 设置数值的字体大小
4. **数值字体颜色**: 设置数值的字体颜色
5. **数值字体粗细**: 设置数值的字体粗细
6. **标签字体大小**: 设置字段标签的字体大小
7. **标签字体颜色**: 设置字段标签的字体颜色
8. **布局方式**: 选择上图下文或左图右文

### 支持的函数

组件支持以下函数，可在其他组件中触发：

- `loadData`: 刷新数据，重新加载数值指标数据

## 数据获取方式

组件通过以下方式获取数据：

1. 使用 `xObject.query()` API 查询实体数据
2. 根据配置的 `entityApiKey` 和 `selectFieldDesc` 数组获取字段值
3. 直接使用查询结果的第一条记录的字段值，不进行前端聚合计算
4. 从第一条记录中提取所有选中字段的值，每个字段显示为一个独立的数值块

## 样式定制

组件使用 SCSS 编写样式，支持通过以下方式定制：

1. 修改 `style.scss` 文件
2. 通过 `className` 属性添加自定义类名
3. 通过内联样式属性（`fontSize`、`fontColor` 等）动态调整样式

## 注意事项

1. 使用组件前需要先配置 `entityApiKey` 和 `selectFieldDesc`（至少一个字段）
2. `selectFieldDesc` 必须是一个数组，至少包含一个有效的字段描述
3. 字段类型为 `number` 或 `currency` 时，会自动添加千分位格式化
4. 如果数据加载失败，会显示错误提示信息
5. 组件支持响应式设计，在不同屏幕尺寸下自动调整样式
6. 组件直接使用查询结果的第一条记录，不进行前端聚合计算
7. 每个字段都会显示自己的标签和数值，标签使用字段的 `label` 属性
