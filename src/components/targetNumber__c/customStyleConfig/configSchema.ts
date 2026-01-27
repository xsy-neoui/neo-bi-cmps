/**
 * 用于定制组件的样式配置
 * 备注：使用 JSONEditor 渲染配置内容
 */
export const configSchema = {
  "type": "object",
  "name": "targetNumber",
  "title": "自定义样式配置",
  "properties": {
    "baseStyle": {
      "type": "object",
      "title": "基础样式",
      "isFixed": true,
      "properties": {
        "backgroundColor": {
          "type": "color",
          "title": "背景色",
          "default": "#ffffff",
          "description": ""
        },
        "paddingMargin": {
          "type": "padding-margin",
          "title": "内外边距",
          "isContainer": false,
          "properties": {
            "margin": {
              "title": "外边距",
              "type": "input",
              "default": "0",
              "description": ""
            },
            "padding": {
              "title": "内边距",
              "type": "input",
              "default": "0",
              "description": ""
            },
            "quantity": {
              "type": "select",
              "default": "px",
              "options": [
                {
                  "label": "px",
                  "value": "px"
                },
                {
                  "label": "rem",
                  "value": "rem"
                },
                {
                  "label": "em",
                  "value": "em"
                },
                {
                  "label": "%",
                  "value": "%"
                }
              ],
              "title": "单位类型"
            }
          },
          "propertyOrder": [
            "margin",
            "padding",
            "quantity"
          ],
          "description": ""
        }
      },
      "propertyOrder": [
        "backgroundColor",
        "paddingMargin"
      ]
    },
    "layoutStyle": {
      "type": "object",
      "title": "布局配置",
      "isFixed": true,
      "properties": {
        "legendOrient": {
          "type": "radio",
          "title": "图例排列方向",
          "options": [
            {
              "label": "水平方向",
              "value": "horizontal"
            },
            {
              "label": "垂直方向",
              "value": "vertical"
            }
          ],
          "description": ""
        },
        "alignClass": {
          "type": "radio",
          "title": "排列方式",
          "options": [
            {
              "label": "上图下文",
              "value": "horizontal"
            },
            {
              "label": "上文下图",
              "value": "flex-col-reverse"
            },
            {
              "label": "左图右文",
              "value": "flex-row"
            },
            {
              "label": "左文右图",
              "value": "flex-row-reverse"
            }
          ],
          "description": "用于设置数值和标题的排列方式",
          "default": "horizontal"
        }
      },
      "propertyOrder": [
        "legendOrient",
        "alignClass"
      ]
    },
    "titleStyle": {
      "type": "object",
      "title": "标题样式",
      "isFixed": true,
      "properties": {
        "show": {
          "type": "boolean",
          "title": "显示标题",
          "default": false,
          "description": ""
        },
        "text": {
          "title": "标题文字",
          "type": "input",
          "default": "",
          "description": "",
          "placeholder": "",
          "onShow": "show"
        },
        "fontSize": {
          "type": "number",
          "title": "标题字号",
          "default": 24,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": "show"
        },
        "fontWeight": {
          "type": "number",
          "title": "标题字钟",
          "default": 400,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": "show"
        },
        "color": {
          "type": "color",
          "title": "字体颜色",
          "default": "#ffffff",
          "description": "",
          "onShow": "titleShow"
        }
      },
      "propertyOrder": [
        "show",
        "text",
        "fontSize",
        "fontWeight",
        "color"
      ]
    },
    "numberStyle": {
      "type": "object",
      "title": "数值样式",
      "isFixed": true,
      "properties": {
        "fontSize": {
          "type": "number",
          "title": "标题字号",
          "default": 18,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": ""
        },
        "fontWeight": {
          "type": "number",
          "title": "标题字钟",
          "default": 800,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": ""
        },
        "color": {
          "type": "color",
          "title": "字体颜色",
          "default": "#ffffff",
          "description": "",
          "onShow": ""
        },
        "linkHref": {
          "type": "url",
          "title": "数值链接",
          "default": "",
          "description": "配置点击数值跳转的地址",
          "placeholder": ""
        }
      },
      "propertyOrder": [
        "fontSize",
        "fontWeight",
        "color",
        "linkHref"
      ]
    },
    "numberTitleStyle": {
      "type": "object",
      "title": "数值标题样式",
      "isFixed": true,
      "properties": {
        "fontSize": {
          "type": "number",
          "title": "标题字号",
          "default": 16,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": ""
        },
        "fontWeight": {
          "type": "number",
          "title": "标题字钟",
          "default": 400,
          "minimum": 0,
          "maximum": 1000,
          "description": "",
          "onShow": ""
        },
        "color": {
          "type": "color",
          "title": "字体颜色",
          "default": "#ffffff",
          "description": "",
          "onShow": ""
        },
        "linkHref": {
          "type": "url",
          "title": "数值标题链接",
          "default": "",
          "description": "配置点击数值标题跳转的地址",
          "placeholder": ""
        }
      },
      "propertyOrder": [
        "fontSize",
        "fontWeight",
        "color",
        "linkHref"
      ]
    }
  },
  "propertyOrder": [
    "baseStyle",
    "layoutStyle",
    "titleStyle",
    "numberStyle",
    "numberTitleStyle"
  ],
  "lastUpdateTime": 1769497373733
}