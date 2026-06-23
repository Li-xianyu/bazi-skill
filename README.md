# 赛博算命 - 现代 AI Agent 八字技能包 (Skill)

这是一个符合通用 Agent 行业规范的八字排盘与命理分析 Skill。它通过“大模型自然语言交互 + Node.js 底层脚本精准计算”的最佳实践模式，彻底解决了纯 Prompt 驱动下大模型在天文历法与天干地支推演上容易产生严重幻觉的痛点。

## 项目结构

```
bazi-skill-main/
├── SKILL.md                 # Agent 核心 Prompt 与行为指南
├── scripts/                 # 精确计算代码库
│   ├── bazi_calc.js         # 八字/大运排盘核心脚本
│   └── package.json         # 依赖配置 (lunar-javascript)
├── references/              # 知识库
│   └── classical-texts.md   # 九本命理经典古籍摘要
└── README.md                # 项目说明
```

## 功能特性

1. **零幻觉排盘**：通过底层 JavaScript 历法库进行精准的节气切割与平太阳时计算，完美避开大模型“口算”排盘带来的误差。
2. **通用性强**：抛弃了针对单一平台（如 Claude Code）的特异性指令，遵循通用 Agent Skill 规范，可无缝接入任何支持本地终端执行代码的 AI Agent 框架。
3. **经典理论支撑**：内置《滴天髓》、《三命通会》、《子平真诠》等经典文献核心摘要，让 AI 的分析与断语有理有据，告别江湖术士般的信口开河。

## 环境依赖与初始化

本 Skill 依赖 Node.js 环境进行后台数据运算。在使用此技能包前，请务必在 `scripts` 目录安装依赖：

```bash
cd scripts
npm install
```

## 触发与使用

将此工程挂载或放入你的 AI Agent 的工作区/技能目录中。用户只需在对话中提及以下意图即可触发该技能：

- `算八字`、`批八字`
- `帮我排个盘`
- `算命`、`四柱命理分析`
- `小六壬`、`掐指一算`（触发小六壬起卦）

触发后，Agent 会主动引导用户收集关键出生或起卦信息，随后在后台静默调用计算脚本进行复杂推演，最终为用户呈现一份图文并茂且专业的分析报告。

## ⚖️ 开源声明与致谢 (Open Source & Credits)

本项目基于原作者 [jinchenma94/bazi-skill](https://github.com/jinchenma94/bazi-skill) 项目进行二次开发与功能扩展，遵守 MIT 开源协议。

在此向以下项目及作者表示诚挚的感谢：
*   **原项目**：[bazi-skill](https://github.com/jinchenma94/bazi-skill) (作者: @jinchenma94) - 提供了优秀的八字排盘与 AI Agent 整合思路。
*   **核心计算库**：[lunar-javascript](https://github.com/6tail/lunar-javascript) (作者: @6tail) - 提供了强大的农历、干支及节气底层计算支持。

### 本版本新增/修改功能 (What's New in this fork)
*   **新增道传小六壬算法**：在 `scripts/xiaoliuren.js` 中完整实现了小六壬起卦逻辑（包含：五行、体用生克、六亲、活死六神等判定）。
*   **扩展 Agent 技能指令**：更新了 `SKILL.md`，使 AI Agent 能够同时支持 `/bazi`（八字命盘）和 `/liuren`（小六壬起卦）双重指令。
*   **丰富项目结构**：
    ```
    bazi-skill-main/
    ├── scripts/
    │   ├── bazi_calc.js     # 原八字排盘核心
    │   └── xiaoliuren.js    # [新增] 道传小六壬核心算法
    ```

