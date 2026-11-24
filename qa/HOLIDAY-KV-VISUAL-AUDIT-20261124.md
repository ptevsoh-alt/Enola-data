# Holiday Campaign KV｜三节庆视觉与全站可视化核查（2026-11-24）

## 本轮设计与资产
- **Black Friday**：黑五家居焕新与品类选购，使用既有清洁工具细节图 `assets/projects/mop-kv-detail.webp`。
- **Mother's Day**：家庭关怀与礼赠，使用既有生活场景照片 `assets/projects/pr-home-scene.webp`。
- **Father's Day**：家人关怀与使用情境，使用既有视频画面 `assets/projects/vacuum-video-frame.webp`。
- 三款全尺寸营销版式均为 **Portfolio Creative Study**；不使用历史审核拒绝的 AI 产品结构图、不虚构折扣、价格、销售成效、用户证言和正式发布事实。
- 单独的可下载 4:5 艺术创意稿由本轮新生成的无产品生活场景素材制作。**它们与网站使用既有产品素材的交互 KV 是两套不同的可视化表达**；站点不声称单独艺术稿已经发布或用于广告。

## 网站入口与呈现方式
- Cases 首页设置三张节庆项目预览卡，分别跳到 `#/case/brand/promotion-kv-black`、`.../promotion-kv-mother`、`.../promotion-kv-father`。
- 品牌案例 `#/case/brand/promotion-campaign-kv` 展示完整三张 4:5 KV；支持 Feed 4:5、Story 9:16、Hero 16:9 比例切换（是真实改变画布尺寸的按钮）。
- `#/case/brand/promotion-channel-adaptations` 展示 Social Feed、EDM、Landing Page 三种分发与版式工作物，前端使用源仓既有产品图。
- 表格继续提供节日目标人群、内容重点与营销触点，不让图上文字替代具体场景与素材。

## 视觉 QA 项目
- 11 个案例以及 Cases、Experience、Capabilities：在 1440px 桌面和 390px 手机分别执行 **14 × 2 = 28** 次真实 Chrome 页面访问及图片解码检查。
- 所有站内图片核对可用性、alt 文本、视口横向溢出。
- KV 的三种真实 CSS 比例按渲染矩形测量，`aria-pressed` 必须只允许一个按下状态。
- 特别检验文字是否与行动入口重叠：不能把有意裁切的背景装饰圈当作内容溢出。
- 审核用 Chrome 环境安装中文字体，以免因 CI 缺字误判公开页面中文布局。
- 页面截图和机器审查结果随独立预览仓库 Actions 保存；静态与交互测试依然保留在源仓 `npm test`。

## 视觉风险与边界
- 促销数字缺少商业审批，故不显示百分比、价格、折扣码与倒计时。
- 本轮网站照片与文本均可以直接在 GitHub Pages 项目内访问，不依赖外部图片域名。
- 线上排版验收以视觉 QA 的完整通过和 Pages Deploy 结果为准，不用单纯的 Jest/JSDOM 通过替代浏览器证据。
- 个人真实项目与营销演示创意应区别归类；匿名公司和既有脱敏规则不变。
