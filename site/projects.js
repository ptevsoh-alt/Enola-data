(() => {
  "use strict";

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const image = (file, alt, ext = "webp") => `<img src="assets/projects/${file}.${ext}" alt="${alt}" loading="lazy" decoding="async">`;
  const calendar = [
    [1,"节庆主线","Feed / Carousel · Facebook / Instagram","What is one little thing Dad always does for you","爸爸总为你做的哪件小事，让你一直记得","What is one little thing Dad always does for you? Tell us in the comments.","爸爸总为你做的哪件小事，让你一直记得？欢迎留言说说。"],
    [2,"长柄电动刷","Reel · Facebook / Instagram","Look closer at an everyday cleaning detail","把目光放到一个日常清洁细节","Look closer at an everyday cleaning detail. Explore the long-handle scrubber.","把目光放到一个日常清洁细节。了解 长柄电动刷。"],
    [3,"黄色双盘拖把","Reel · Facebook / Instagram","Start with the floor, and a clear view of the task","从地面开始，先看清要完成的任务","Start with the floor, and a clear view of the task. Explore the dual-head mop.","从地面开始，先看清要完成的任务。了解 双盘拖把。"],
    [4,"社群话题","Discussion · FB Group","What home-care tip did Dad pass on","爸爸教过你什么照顾家里的小方法","What home-care tip did Dad pass on? Share one tip.","爸爸教过你什么照顾家里的小方法？分享一条经验。"],
    [5,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Before choosing a tool, take a closer look","选择工具前，先把结构看清楚","Before choosing a tool, take a closer look. See the long-handle scrubber details.","选择工具前，先把结构看清楚。查看 长柄电动刷 细节。"],
    [6,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Meet the dual-head mop, from handle to dual-head base","从手柄到双盘底座，认识 双盘拖把","Meet the dual-head mop, from handle to dual-head base. See product details.","从手柄到双盘底座，认识 双盘拖把。查看产品详情。"],
    [7,"节庆主线","Reel · Facebook / Instagram","Care often looks like a very small moment","关心往往藏在很小的瞬间里","Care often looks like a very small moment. Share a moment you remember.","关心往往藏在很小的瞬间里。说说你记得的瞬间。"],
    [8,"长柄电动刷","Reel · Facebook / Instagram","Watch one task, from start to finish","从开始到结束，看清一次操作","Watch one task, from start to finish. Watch the long-handle scrubber demonstration.","从开始到结束，看清一次操作。观看 长柄电动刷 演示。"],
    [9,"黄色双盘拖把","Reel · Facebook / Instagram","See the dual-head mop in a continuous floor-care sequence","用一个连续动作，了解 双盘拖把 地面清洁","See the dual-head mop in a continuous floor-care sequence. Watch the full demonstration.","用一个连续动作，了解 双盘拖把 地面清洁。观看完整演示。"],
    [10,"节庆主线","Feed / Carousel · Facebook / Instagram","A thoughtful gift starts with knowing the person","用心选礼物，从了解对方开始","A thoughtful gift starts with knowing the person. What would suit your dad?","用心选礼物，从了解对方开始。什么更适合你的爸爸？"],
    [11,"长柄电动刷","Feed / Carousel · Facebook / Instagram","The details deserve a closer look","值得仔细看看的产品细节","The details deserve a closer look. Explore the long-handle scrubber.","值得仔细看看的产品细节。了解 长柄电动刷。"],
    [12,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","A closer look at the dual-head mop in an everyday home","在日常家居空间里，仔细看看 双盘拖把","A closer look at the dual-head mop in an everyday home. Explore the dual-head mop.","在日常家居空间里，仔细看看 双盘拖把。了解 双盘拖把。"],
    [13,"社群话题","Discussion · FB Group","Dad’s Little Acts: tell one true story of care","爸爸的小小付出：分享一个真实的关怀故事","Dad’s Little Acts: tell one true story of care. Read the participation rules.","爸爸的小小付出：分享一个真实的关怀故事。先阅读参与规则。"],
    [14,"节庆主线","Reel · Facebook / Instagram","Thank you for the little things I did not always notice","谢谢那些我未必总能注意到的小小付出","Thank you for the little things I did not always notice. Write your own thank-you.","谢谢那些我未必总能注意到的小小付出。写下你想说的谢谢。"],
    [15,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Choose for the task","按任务选择，先确认使用说明","Choose for the task. Check the use guidance first. Read the long-handle scrubber guidance.","按任务选择，先确认使用说明。查看 长柄电动刷 使用说明。"],
    [16,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Every floor is different","地面材质各不相同，使用前先确认适用性","Every floor is different. Check suitability before use. Read the dual-head mop guidance.","地面材质各不相同，使用前先确认适用性。查看 双盘拖把 使用说明。"],
    [17,"节庆主线","Reel · Facebook / Instagram","He showed up in a thousand little ways","他在无数小事里照顾着我们","He showed up in a thousand little ways. Show him you noticed. Explore the story.","他在无数小事里照顾着我们。这次，让他知道你都记得。了解这段故事。"],
    [18,"长柄电动刷","Reel · Facebook / Instagram","Care in the details","把关怀放进细节，认识 长柄电动刷","Care in the details. Meet the long-handle scrubber. See the product film.","把关怀放进细节，认识 长柄电动刷。观看产品短片。"],
    [19,"黄色双盘拖把","Reel · Facebook / Instagram","Everyday floors, thoughtfully considered","认真对待日常地面清洁，认识 双盘拖把","Everyday floors, thoughtfully considered. Meet the dual-head mop. See the product film.","认真对待日常地面清洁，认识 双盘拖把。观看产品短片。"],
    [20,"节庆主线","Feed / Carousel · Facebook / Instagram","For the Hands That Always Help","献给那些总是伸出援手的双手","For the Hands That Always Help. Show him you noticed.","献给那些总是伸出援手的双手。让他知道，你都记得。"],
    [21,"社群话题","Discussion · FB Group","A place for your real stories of everyday care","在这里，分享日常关怀的真实故事","Concept discussion: Which everyday acts of care deserve to be remembered? No audience responses have been collected.","概念讨论：哪些日常关怀值得被记住？当前没有真实留言精选。"],
    [22,"长柄电动刷","Feed / Carousel · Facebook / Instagram","Questions before choosing the long-handle scrubber","选择 长柄电动刷 前有疑问","Questions before choosing the long-handle scrubber? Start with the facts. Read the FAQ.","选择 长柄电动刷 前有疑问？先从产品事实了解。查看常见问题。"],
    [23,"黄色双盘拖把","Feed / Carousel · Facebook / Instagram","Questions before choosing the dual-head mop","选择 双盘拖把 前有疑问","Questions before choosing the dual-head mop? Start with the facts. Read the FAQ.","选择 双盘拖把 前有疑问？先从产品事实了解。查看常见问题。"],
    [24,"长柄电动刷","Reel · Facebook / Instagram","One clear sequence","一个清楚的连续动作，了解 长柄电动刷 的使用过程","One clear sequence. A closer look at the long-handle scrubber in use. Watch the demonstration.","一个清楚的连续动作，了解 长柄电动刷 的使用过程。观看演示。"],
    [25,"黄色双盘拖把","Reel · Facebook / Instagram","Follow the movement, from first contact to finish","从接触地面到收尾，跟随动作看完整过程","Follow the movement, from first contact to finish. Watch the dual-head mop in use.","从接触地面到收尾，跟随动作看完整过程。观看 双盘拖把 演示。"],
    [26,"社群话题","Discussion · FB Group","A five-second moment, a story worth telling","五秒的小小瞬间，也值得被记住","A five-second moment, a story worth telling. Read the creator brief and rights options.","五秒的小小瞬间，也值得被记住。阅读创作说明与授权选项。"],
    [27,"节庆主线","Feed / Carousel · Facebook / Instagram","The best part may be the time you spend together","值得珍惜的，也许正是一起度过的时间","The best part may be the time you spend together. Tell us your favorite way to spend time together.","值得珍惜的，也许正是一起度过的时间。分享你们喜欢一起做的事。"],
    [28,"节庆主线","Feed / Carousel · Facebook / Instagram","Different tools, different everyday tasks","不同工具，对应不同日常任务","Different tools, different everyday tasks. Compare the long-handle scrubber and the dual-head mop use guidance.","不同工具，对应不同日常任务。对照两款产品使用说明。"],
    [29,"内部验收","Internal · Project Review","Asset and message QA","素材与传播信息验收","Review the final assets, product facts, and channel adaptations before closing the campaign.","活动收尾前，检查最终素材、产品事实与渠道版本是否一致。"],
    [30,"内部复盘","Internal · Project Review","Campaign review and next-cycle actions","活动复盘与下一轮行动","Summarize audience questions, content feedback, and open actions for the next campaign.","整理用户问题、内容反馈与待办事项，为下一轮活动确定改进方向。"],
  ];

  function section(title, intro, body, id = "") {
    return `<section ${id ? `id="${id}"` : ""} class="g-module g-project"><header><h2>${title}</h2><p>${intro}</p></header>${body}</section>`;
  }

  function brand() {
    return section("用两种清洁任务讲清品牌定位", "美国市场 · 品牌屋与整合传播", `
      <div class="g-project-feature">
        <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">${image("brand-house", "品牌屋总览，包含定位、四条产品线、目标人群和传播支柱")}</a>
        <div>
          <h3>品牌定位：把产品放回具体清洁任务</h3>
          <p>面向美国市场的家用电动清洁工具，优先解决餐区硬地黏污，以及浴缸内沿、墙砖接缝和边角的刷洗问题。产品由电机带动清洁头，用户控制握持位置、角度和移动路径。</p>
          <h3>按三类购买任务组织沟通</h3>
          <p>餐区清洁者关注扫过后仍然粘脚的脚印和溅渍；浴室清洁者关注刷头够不到的内沿与接缝；替家人购买的人，需要先确认握持、转向、换刷头和适用表面。</p>
          <p><a href="#/case/brand/seasonal-creative-gallery">查看父亲节与黑五视觉创意 ↗</a> · <a href="#/case/brand/brand-collaboration">查看联合抽奖海报 ↗</a> · <a href="#/case/brand/pr-project">查看北美新闻稿分发 ↗</a></p>
        </div>
      </div>
      <div class="g-project-list">
        <article><small>3C / CUSTOMER</small><h3>从任务识别需求</h3><p>餐区硬地的黏污、浴室边角的触达，以及礼赠购买时对操作与配件的确认，是品牌沟通优先回答的问题。</p></article>
        <article><small>3C / COMPETITOR</small><h3>按工具能力建立参照</h3><p>旋转拖把强调动力旋转；吸洗一体机强调碎屑与清洗的组合；长柄电动刷强调杆长与刷头角度。用结构、触达位置和动作比较各工具的任务适配度。</p></article>
        <article><small>STP / POSITIONING</small><h3>主推双盘拖把与长柄刷</h3><p>双盘拖把负责餐区硬地，展示站姿推进和转向；长柄刷负责浴室边角，展示调杆、调角和刷头接触。品牌广告与社媒优先围绕这两类任务建立识别。</p><p><a href="#/case/gtm/launch-decisions">查看餐后硬地场景如何进入 M3 上市方案 ↗</a></p></article>
      </div>
      <div class="g-project-list">
        <article><small>MESSAGE PILLAR 01</small><h3>站着推进</h3><p>双盘持续转动，主握把与辅助手柄帮助用户引导路线；画面从黏脚印切入，再展示站姿推进、转向和双盘接地。</p></article>
        <article><small>MESSAGE PILLAR 02</small><h3>伸得到，贴得上</h3><p>通过杆长与刷头角度调节，让刷头接触浴缸边沿和墙砖接缝；同一机位交代站位、调节动作与接触点。</p></article>
        <article><small>MESSAGE PILLAR 03</small><h3>按表面选刷头</h3><p>根据硬地、浴室边角和专项清洁任务选择拖布或刷头；演示需要说明适用表面和使用条件。</p></article>
      </div>
      <div class="g-project-list">
        <article><small>CHANNEL / BRAND</small><h3>广告主视觉</h3><p>餐区用中景表现站姿推进，低机位展示双盘接地；浴室把人的站位和刷头触达放进同一组画面。</p></article>
        <article><small>CHANNEL / SOCIAL & CREATOR</small><h3>短视频与创作者</h3><p>从真实污渍或用户提问开场，拍清工具接触、运转和同机位前后变化，再邀请观众分享家中难刷的位置。</p></article>
        <article><small>CHANNEL / SEASONAL & PR</small><h3>节庆与媒体传播</h3><p>节庆内容把清洁放进家庭故事；PR 用餐区黏污与浴室边角解释产品分工，并为每个场景匹配动作图和简明说明。</p></article>
      </div>
      <div class="g-story-note">
        <h3>同一个品牌主张，三种具体交付</h3>
        <ul>
          <li><a href="#/case/brand/brand-collaboration">联合抽奖海报</a>将家庭种植和清洁工具放进同一生活场景，交代奖品与参与时间。</li>
          <li><a href="#/case/brand/pr-project">北美新闻稿</a>按全屋清洁任务安排四条产品线，可核对 2026 年 5 月新闻稿栏目分发。</li>
          <li><a href="#/case/creative/video-projects">演示视频拆解</a>把卖点落到接触位置、持握姿势和连续动作。</li>
        </ul>
      </div>
      <div class="g-story-note">
        <h3>把用户反馈变成下一个故事</h3>
        <p>品牌故事从餐后硬地和浴室边角两个使用任务展开。下一轮选题时，从社群与客服的问题中找真实做法，核对在什么表面、用什么配件、哪一步卡住。共性问题优先补进 FAQ；有完整使用过程并取得授权的故事，进入创作者拍摄 Brief。</p>
        <p><a href="#/case/community">查看社群如何收集问题 ↗</a> · <a href="#/case/creative/video-projects">查看家庭场景如何转成镜头 ↗</a></p>
      </div>
      <div class="g-story-note" id="regional-campaign-planning">
        <h3>区域 Campaign｜固定品牌事实，调整当地节奏</h3>
        <p>我在北美品牌项目中统筹季度传播主题与节庆内容，并在 M3 传播方案中比较美国、英国的语言习惯和渠道素材。区域策划的核心，是保持品牌与产品价值一致，同时让当地场景、发布节奏和页面表达适合目标受众。</p>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>节奏 / CALENDAR</small><h3>先看本地消费者日历</h3><p>按地区确认节日日期、季节、渠道档期、物流和审批时区；活动目标与目标人群先于海报排期确定，不直接套用北美节庆时间。</p></article>
          <article><small>创意 / LOCALIZATION</small><h3>保留核心主张，调整使用语境</h3><p>保留品牌主张与产品事实，结合美英市场不同的使用情境、搜索措辞和语言习惯调整标题、场景与 CTA。</p></article>
          <article><small>协作 / OWNERSHIP</small><h3>让各职能明确交付和批准</h3><p>把上市日期、素材版本、内容交付和发布前检查纳入共同排期；我负责内容团队的计划与审核，并与产品、创意及渠道同事对齐交付。</p></article>
          <article><small>学习 / REVIEW</small><h3>同市场内复盘，再讨论跨市场复制</h3><p>先按相同窗口观察内容表现、有效访问和反馈，记录版本与外部变化；市场之间的季节、渠道组合和统计口径不同，不直接拼接结果。</p></article>
        </div>
        <p><a href="#/case/social/fathers-day-calendar">查看父亲节双语日历 ↗</a> · <a href="#/case/gtm/market-adaptation">查看 M3 美英文案对照 ↗</a></p>
      </div>
      `, "brand-positioning");
  }

  function launchFourStage() {
    return `
      <details class="g-story-note v-supporting-evidence" id="launch-four-stages">
        <summary>四阶段传播逻辑 · 查看预热、首发与复盘</summary>
        <h3>从预热到复盘｜新品上市传播节奏</h3>
        <p>从生活场景建立关注，再通过产品演示、上市内容及用户反馈，形成连续的营销节奏。</p>
        <ol class="v-stage-track" aria-label="新品上市传播的四段决策路径">
          <li><span class="v-stage-number">01</span><small>PREHEAT · 预热</small><h4>先识别问题</h4><p>餐后硬地场景、双盘结构、消费者疑问</p><b>阶段交付 · 场景与产品信息</b></li>
          <li><span class="v-stage-number">02</span><small>LAUNCH · 首发</small><h4>让内容同时到位</h4><p>KV、真实演示、FAQ 与渠道页面相互支持</p><b>阶段交付 · 已审核的渠道素材</b></li>
          <li><span class="v-stage-number">03</span><small>SCALE · 持续</small><h4>按反馈调整表达</h4><p>先排查观看、有效访问及用户理解断点</p><b>阶段交付 · 素材与内容优化</b></li>
          <li><span class="v-stage-number">04</span><small>CLOSEOUT · 收束</small><h4>整理下一轮判断</h4><p>统一过期信息、用户反馈与可复用内容</p><b>阶段交付 · 复盘与团队交接</b></li>
        </ol>
      </details>
      <div class="g-story-note" id="launch-cross-channel">
        <h3>多渠道协同｜让每个触点承担不同任务</h3>
        <p>围绕统一的 Campaign 主题，将社媒内容、广告创意、创作者体验、邮件触达、搜索内容和商品信息安排在同一用户决策路径上。我的工作重点是社媒传播与内容侧协同，并与各触点负责人对齐需求、素材和上线节点。</p>
        <div class="v-channel-journey" id="gtm-channel-orchestration" aria-label="新品上市多渠道协作路径">
          <article><span>01 / ATTRACT</span><h4>让用户看见问题</h4><b>Social · Paid · PR</b><p>场景切入、节庆与产品卖点建立相关性</p><small>内容组提供 KV / Hook，投放与公关由对应负责人执行</small></article>
          <article><span>02 / EXPLAIN</span><h4>讲清产品动作</h4><b>Creator · Video · SEO</b><p>使用镜头、结构说明与常见问题回答</p><small>脚本、真实产品演示、FAQ 与素材授权</small></article>
          <article><span>03 / DECIDE</span><h4>完成选购确认</h4><b>Commerce · Paid · EDM</b><p>型号、适用表面与商品信息保持一致</p><small>定价、库存、支付与购买型 CTA 由商业团队放行</small></article>
          <article><span>04 / RELATE</span><h4>把使用反馈带回来</h4><b>CRM · Community · Data</b><p>购后使用教育、社群问题与复盘调整</p><small>许可触达、实际用户反馈与同口径测量</small></article>
        </div>
        <details class="g-chart-disclosure"><summary>查看渠道 Brief 与审核负责人</summary><div class="g-proof-table"><table>
          <thead><tr><th scope="col">执行渠道</th><th scope="col">物料 Brief / 接口</th><th scope="col">谁负责放行</th><th scope="col">状态与风险</th></tr></thead>
          <tbody>
            <tr><th scope="row">Amazon</th><td>A+、主图、场景图、规格与使用限制</td><td>电商渠道 Owner；产品核事实</td><td>产品端提供已批准事实，渠道独立完成上架审核</td></tr>
            <tr><th scope="row">独立站</th><td>落地页、FAQ、演示入口、CTA 与链接</td><td>站点 / 商业 Owner；产品核事实</td><td>页面与库存、价格、结账须现场核验</td></tr>
            <tr><th scope="row">海外渠道</th><td>产品卖点单页、对比说明、渠道培训资料</td><td>销售 / 渠道 Owner</td><td>渠道资料包与培训物料规划</td></tr>
            <tr><th scope="row">社媒</th><td>KV、Feed / Story、短视频脚本、Creator Brief</td><td>我负责内容组排期与审核；产品及品牌分别签核</td><td>有英文 Brief、素材方案和可核验的返工记录</td></tr>
          </tbody>
        </table></div></details>
        <p>我负责社媒内容排期、创意审核与交付跟进，推动产品、视频、设计、广告及电商团队对齐核心信息、素材版本和发布节点。</p>
        <p><a href="#/case/gtm/english-brief">查看社媒英文物料 Brief ↗</a> · <a href="#/case/operations/asset-review">查看真实视觉返工 ↗</a></p>
      </div>
      <div class="g-story-note" id="launch-d7-d30">
        <h3>上市后怎么复盘｜首周内容表现与月度经营反馈</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>D+7 / EARLY SIGNAL</small><h3>先找渠道和物料断点</h3><p>对齐发布日期、资产版本和有效链接，查看首屏观看、点击及 FAQ 问题。若渠道漏发或某版视频动作不清，先补发布和返工；不要由单周互动推断销量提升。</p></article>
          <article><small>D+30 / BUSINESS & LEARNING</small><h3>判断该保留、迭代还是停止</h3><p>按相同市场和统计窗口核对渠道表现、站点访问、净履约订单与售后反馈；区分素材问题、承接问题和供货限制，再确定下期资源与 Owner。</p></article>
        </div>
        
      </div>`;
  }

  function launchDelivery() {
    const milestones = [
      ["5/1–3 · 内容方向", "社媒内容组；产品提供事实支持", "目标场景、内容主题、传播重点与视觉需求", "明确本轮内容计划与产品资料的交接人。"],
      ["5/4–10 · 视觉与视频 Brief", "社媒内容组、设计与视频", "创意方向、镜头清单、KV 版式及平台规格", "内容组审 Brief，产品团队复核结构与适用条件。"],
      ["5/15–21 · 素材审核", "社媒内容组、设计、视频与产品", "KV、轮播、演示镜头、FAQ 与各渠道版本", "复核画面、文案、产品结构、平台安全区和素材使用条件。"],
      ["5/22–25 · 传播发布计划", "社媒内容组与各渠道负责人", "社媒内容、视频及 PR / Creator / EDM 素材交接", "各渠道自行确认发布条件，社媒组完成内容和链接复核。"],
      ["5/26–31 · 内容复盘", "社媒内容组、渠道与数据负责人", "内容表现、用户反馈、素材问题和下期选题", "按平台原有口径调整内容，商业销售结果由业务部门确认。"],
    ];
    return `
      <div class="g-story-note g-launch-delivery" id="launch-delivery">
        <h3>五月上市协作｜内容、渠道与交付节奏</h3>
        <p>围绕首发窗口，把产品核验、创意制作、广告准备、邮件触达、页面承接与数据复盘放进同一张营销排期图。我的主要交付是社媒内容计划、素材 Brief 和跨团队协调。</p>
        <section class="v-release-gantt" id="gtm-visual-schedule" aria-labelledby="v-release-heading">
          <header class="v-release-heading"><div><span>MARKETING DELIVERY / MAY 2026</span><h4 id="v-release-heading">2026 年 5 月｜M3 上市传播排期</h4></div><p>按周安排内容策划、KV 与视频制作、渠道素材准备和发布审核。可筛选社媒主责、渠道协同与业务支持。</p></header>
          <div class="v-gantt-legend" aria-label="排期图说明"><span><i class="v-legend-plan"></i>策略 / Brief</span><span><i class="v-legend-produce"></i>制作 / 准备</span><span><i class="v-legend-launch"></i>渠道放行</span><span><i class="v-legend-learn"></i>运营 / 复盘</span></div>
          <div class="v-gantt-filters" role="group" aria-label="按协作职责筛选传播工作流">
            <button type="button" data-gtm-focus="all" aria-controls="v-gantt-rows" aria-pressed="true">全部工作流 <b>6</b></button>
            <button type="button" data-gtm-focus="lead" aria-controls="v-gantt-rows" aria-pressed="false">内容主责 <b>1</b></button>
            <button type="button" data-gtm-focus="partner" aria-controls="v-gantt-rows" aria-pressed="false">渠道协同 <b>3</b></button>
            <button type="button" data-gtm-focus="support" aria-controls="v-gantt-rows" aria-pressed="false">商业与验收 <b>2</b></button>
          </div>
          <p class="v-gantt-view-caption" aria-live="polite">正在展示 6 条工作流 · 2026 年 5 月营销传播计划</p>
          <p class="v-gantt-mobile-hint" aria-hidden="true">左右滑动排期图，可查看全部阶段 →</p>
          <div class="v-gantt-scroll" tabindex="0" role="region" aria-label="五月上市多渠道可横向浏览排期图">
            <div class="v-gantt-grid" id="v-gantt-rows" role="table" aria-label="M3 五月上市传播工作流、阶段日期和主要交付">
              <div class="v-gantt-axis" role="row"><b role="columnheader">执行工作流</b><span role="columnheader">05 / 01–03<small>内容方向</small></span><span role="columnheader">05 / 04–10<small>视觉与视频 Brief</small></span><span role="columnheader">05 / 15–21<small>制作与预检</small></span><span role="columnheader">05 / 22–25<small>计划首发</small></span><span role="columnheader">05 / 26–31<small>交接与复盘</small></span></div>
              <div class="v-gantt-lane" data-gtm-group="lead" role="row"><b role="rowheader">内容 / Social<small>我的主责</small></b><span class="is-plan" role="cell">主题与场景</span><span class="is-plan" role="cell">场景、KSP、Brief</span><span class="is-produce" role="cell">KV / 视频 / FAQ</span><span class="is-launch" role="cell">社媒发布规划</span><span class="is-learn" role="cell">选题与内容优化</span></div>
              <div class="v-gantt-lane" data-gtm-group="partner" role="row"><b role="rowheader">Paid Media<small>广告负责人</small></b><span class="is-empty" role="cell">—</span><span class="is-plan" role="cell">目标 / 受众假设</span><span class="is-produce" role="cell">Hook 变体 / 追踪</span><span class="is-launch" role="cell">投放前审批</span><span class="is-learn" role="cell">创意测试反馈</span></div>
              <div class="v-gantt-lane" data-gtm-group="partner" role="row"><b role="rowheader">EDM / CRM<small>邮件与用户运营</small></b><span class="is-empty" role="cell">—</span><span class="is-plan" role="cell">许可 / 用户分层</span><span class="is-produce" role="cell">主题 / 模板 / 排除</span><span class="is-launch" role="cell">邮件发送放行</span><span class="is-learn" role="cell">购后教育</span></div>
              <div class="v-gantt-lane" data-gtm-group="partner" role="row"><b role="rowheader">PR / Creator<small>品牌及合作负责人</small></b><span class="is-empty" role="cell">—</span><span class="is-plan" role="cell">传播角度 / 筛选</span><span class="is-produce" role="cell">合作 Brief / 授权</span><span class="is-launch" role="cell">合作内容审核</span><span class="is-learn" role="cell">素材归档</span></div>
              <div class="v-gantt-lane" data-gtm-group="support" role="row"><b role="rowheader">商品与渠道<small>产品、电商、商业</small></b><span class="is-plan" role="cell">产品信息支持</span><span class="is-plan" role="cell">SKU / 价值主张</span><span class="is-produce" role="cell">页面 / FAQ / 库存</span><span class="is-launch" role="cell">可售条件确认</span><span class="is-learn" role="cell">履约与用户反馈</span></div>
              <div class="v-gantt-lane" data-gtm-group="support" role="row"><b role="rowheader">数据 / QA<small>跨部门联合验收</small></b><span class="is-plan" role="cell">指标需求</span><span class="is-plan" role="cell">指标口径</span><span class="is-produce" role="cell">链接 / 事件检查</span><span class="is-launch" role="cell">上线观测</span><span class="is-learn" role="cell">复盘与行动项</span></div>
            </div>
          </div>
          <div class="v-gantt-gates" role="group" aria-label="五个传播交付节点：负责人、素材与审核任务">
            ${milestones.map(([date, owner, input, approval], i) => `<button type="button" data-gtm-gate="${i}" data-gate-owner="${esc(owner)}" data-gate-input="${esc(input)}" data-gate-approval="${esc(approval)}" aria-pressed="${i === 0 ? "true" : "false"}" aria-controls="v-gate-detail"><strong>G${i}</strong><span>${esc(date)}</span></button>`).join("")}
          </div>
          <div class="v-gate-detail" id="v-gate-detail" role="group" aria-label="传播排期节点的协作与验收详情">
            <div class="v-gate-detail-title"><small data-gate-slot="number">G0 / PLANNING GATE</small><strong data-gate-slot="title">${esc(milestones[0][0])}</strong><span>传播计划节点</span></div>
            <dl class="v-gate-detail-fields">
              <div><dt>决策与协作负责人</dt><dd data-gate-slot="owner">${esc(milestones[0][1])}</dd></div>
              <div><dt>本阶段交付物</dt><dd data-gate-slot="input">${esc(milestones[0][2])}</dd></div>
              <div><dt>放行条件 / 下一步</dt><dd data-gate-slot="approval">${esc(milestones[0][3])}</dd></div>
            </dl>
          </div>
        </section>
        <details class="g-chart-disclosure campaign-milestone-details"><summary>查看五个里程碑的负责人、物料与验收要求</summary>
          <ol class="g-milestone-list campaign-milestone-map">
          ${milestones.map(([date, owner, input, approval]) => `
            <li><h4>${esc(date)}</h4><div><b>${esc(owner)}</b><p>${esc(input)}</p></div><p>${esc(approval)}</p></li>`).join("")}
          </ol>
        </details>
        <p><a href="#/case/gtm/english-brief">查看交给创意与制作团队的英文 Brief ↗</a> · <a href="#/case/creative/video-strategy">查看品牌片与演示片的渠道分工 ↗</a></p>
      </div>`;
  }

  function englishBrief() {
    return `
      <div class="g-story-note g-english-brief" id="english-brief">
        <h3>英文制作 Brief</h3>
        <p>美国市场社媒制作 Brief｜用户场景、镜头任务、交付格式与审核标准。</p>
        <dl lang="en-US">
          <div><dt>Audience &amp; task</dt><dd>Show U.S. households how the M3 handles an after-dinner cleanup on a suitable hard floor. Help viewers understand how to hold, steer and use the mop.</dd></div>
          <div><dt>Creative direction</dt><dd>“Dinner’s done. Floor’s next.” Open on the floor after dinner. Follow one pass from hand position to dual-pad contact. The team can choose the household setting and opening frame.</dd></div>
          <div><dt>Deliverables</dt><dd>Provide a 4:5 Feed key visual, a 9:16 Story version and an eight-second demo cut. Include English captions, the opening frame and a link to the approved destination for each placement.</dd></div>
          <div><dt>Approval &amp; fallback</dt><dd>Keep the grip and both pads in frame. Use real footage for motion and approved wording for floor suitability. If motion footage is pending, submit a product-detail visual with “Explore M3.”</dd></div>
        </dl>
        <p><a href="#/case/operations/asset-review">查看主视觉为什么退回修改 ↗</a> · <a href="#/case/gtm/market-adaptation">查看美英文案如何适配 ↗</a></p>
      </div>`;
  }

  function gtm() {
    return section("M3 上市传播策划", "围绕餐后清洁、产品演示与家庭生活的整合 Campaign。", `
      <nav class="v-gtm-quicknav" aria-label="M3 上市案例关键章节">
        <span>CASE NAVIGATION / 快速阅读</span>
        <a href="#/case/gtm/campaign-architecture"><b>01</b> Campaign 策略</a>
        <a href="#/case/gtm/gtm-visual-schedule"><b>02</b> 上市排期</a>
        <a href="#/case/gtm/launch-cross-channel"><b>03</b> 渠道协作</a>
        <a href="#/case/gtm/campaign-mechanism-mapping"><b>04</b> 创意方向</a>
        <a href="#/case/gtm/market-adaptation"><b>05</b> 美英本地化</a>
      </nav>
      <section class="pmm-strategy-board" id="gtm-positioning-decision" aria-labelledby="pmm-decision-heading">
  <header class="pmm-board-head"><small>PRODUCT MARKETING / POSITIONING</small><h3 id="pmm-decision-heading">为什么优先选择餐后硬地场景</h3></header>
  <div class="pmm-decision-layout">
    <div class="pmm-decision-process" aria-label="从使用任务到传播交付的策略决策链">
      <article><span>01 / USER TASK</span><h4>餐后地面整理</h4><p>以真实家庭的具体清洁任务作为产品理解入口。</p><strong>场景优先，而非参数优先</strong></article>
      <article><span>02 / PRODUCT VALUE</span><h4>双盘接地与站姿推进</h4><p>将结构、握持和推进路径转为能够看见的使用价值。</p><strong>产品事实 → 用户收益</strong></article>
      <article><span>03 / PROOF</span><h4>外观、连续演示与 FAQ</h4><p>静态 KV 识别产品；连续实拍说明操作；FAQ 承接适用条件。</p><strong>视觉、视频和技术信息分工</strong></article>
      <article><span>04 / GO-TO-MARKET</span><h4>Social → Creator → Commerce</h4><p>场景内容建立认知，真实使用镜头解释动作，商品信息完成选购理解。</p><strong>传播与选购承接相连</strong></article>
    </div>
    <figure class="pmm-decision-photo"><img src="assets/projects/mop-kv-detail.webp" alt="M3 双盘拖把结构细节视觉" loading="lazy" decoding="async"><figcaption><small>POSITIONING / DECISION</small><b>让用户先看懂使用价值</b><span>餐后硬地 · 产品机制 · 连续动作</span></figcaption></figure>
  </div>
  <div class="pmm-tradeoff"><strong>STRATEGIC CHOICE</strong><p><b>弱化</b> 以转速、单一规格作内容开场</p><p><b>强化</b> 场景问题、结构证明与可连续复核的演示</p></div>
</section>
      <div class="g-story-note" id="launch-decisions">
        <h3>产品主张｜站着推进，清理餐后硬地</h3>
        <p>把双盘拖把最先放进餐后地面的清洁任务。主视觉交代握把和双盘，动作镜头回答怎么用，FAQ 解释适用条件。</p>
        <details class="v-supporting-evidence"><summary>查看产品主张与视觉交付</summary>
        <div class="g-proof-table">
          <table>
            <thead><tr><th scope="col">用户会问</th><th scope="col">主张需要的证据</th><th scope="col">对应物料</th></tr></thead>
            <tbody>
              <tr><th scope="row">双盘怎样工作？</th><td>原图交代双盘结构。连续实拍展示运转、接地与推进。</td><td>主视觉、演示短片</td></tr>
              <tr><th scope="row">怎样握持和转向？</th><td>原图标明握持位置。中景让站姿、手和工具的移动路径同时可见。</td><td>结构轮播、创作者 Brief</td></tr>
              <tr><th scope="row">我的地面适用吗？</th><td>产品与客服按当地型号和说明书核对适用表面及使用限制。</td><td>商品页 FAQ、客服答复</td></tr>
            </tbody>
          </table>
        </div>
        </details>
        <p><a href="#/case/brand/brand-positioning">查看餐区与浴室场景在品牌层如何分工 ↗</a></p>
      </div>
      <section class="gtm-market-map" id="gtm-value-to-launch" aria-labelledby="gtm-market-title">
        <header><small>PRODUCT MARKETING → GO-TO-MARKET</small><h3 id="gtm-market-title">M3 产品信息与上市传播方案</h3><p>在 M3 项目中，传播策划从具体清洁任务出发，再确定证明方式、素材组合和各渠道的上线准备。</p></header>
        <div class="gtm-market-steps">
          <article><span>01 / MARKET</span><h4>消费者从哪里开始理解产品</h4><p>以美国家庭餐后硬地场景为沟通起点，围绕地面污渍、站姿操作与清洁效率相关疑问规划信息。</p><b>我的参与</b><small>场景研究、评论/VOC 线索与竞品内容梳理</small></article>
          <article><span>02 / PRODUCT VALUE</span><h4>一个卖点，需要不同层次的证明</h4><p>双盘外观先解决“这是什么”，真实连续动作回答“怎么用”，适用地面与维护问题由官方说明确认。</p><b>我的参与</b><small>卖点可视化、脚本、产品图与 FAQ Brief</small></article>
          <article><span>03 / CHANNEL READINESS</span><h4>同一主张适配不同渠道任务</h4><p>社媒承担情境认知，短视频解释动作；广告测试不同切入，PR/Creator 建立可信表达，EDM 与商品页承接更深入的问题。</p><b>我的参与</b><small>内容矩阵、渠道 Brief、交付排期与创意审核</small></article>
          <article><span>04 / LAUNCH & LEARN</span><h4>发布节奏与后续复盘相连</h4><p>产品/商业同事确认 SKU、Offer、库存、履约和追踪条件，内容侧按审核结果出片；上市后分 D7 / D30 复核内容与承接。</p><b>我的参与</b><small>物料准备、内容质量验收与项目复盘协作</small></article>
        </div>
        <div class="gtm-message-translation"><span>VALUE TO MARKET / 同一产品信息的落地路径</span><div><b>产品事实</b><i>→</i><b>用户场景</b><i>→</i><b>卖点证明</b><i>→</i><b>渠道内容</b><i>→</i><b>反馈优化</b></div></div>
        <p class="gtm-market-links"><a href="#/case/gtm/campaign-architecture">查看 IMC / Campaign 品牌屋 ↗</a><a href="#/case/gtm/launch-delivery">查看上市传播排期 ↗</a><a href="#/case/gtm/launch-d7-d30">查看 D7 / D30 复盘逻辑 ↗</a></p>
      </section>
      <details class="g-story-note v-supporting-evidence" id="launch-channel-plan">
        <summary>渠道分工与用户任务 · 查看四类触点明细</summary>
        <h3>从识别场景到确认选购</h3>
        <div class="g-proof-table">
          <table>
            <thead><tr><th scope="col">触点</th><th scope="col">用户在这里要解决什么</th><th scope="col">下一步</th></tr></thead>
            <tbody>
              <tr><th scope="row">社媒</th><td>用餐后场景建立识别。Feed 介绍产品，Story 收集清洁问题。</td><td>了解产品</td></tr>
              <tr><th scope="row">创作者 / Paid</th><td>让用户看清动作。创作者按 Brief 交实拍。Paid 计划在相同条件下比较场景开场与结构开场。</td><td>观看获准的演示</td></tr>
              <tr><th scope="row">PR</th><td>用可公开的产品事实和家庭场景解释新品用途。</td><td>查阅产品资料</td></tr>
              <tr><th scope="row">商品页 / CRM</th><td>核对当地型号、适用表面和供货。邮件按有效许可和用户状态触达。</td><td>确认可售后购买</td></tr>
            </tbody>
          </table>
        </div>
        <p>素材审核通过后再承诺「看演示」。商业侧还需核可当地价格、库存、支付与履约，才开放购买。</p>
      </details>
      <section class="g-story-note campaign-lens" id="campaign-architecture" aria-labelledby="campaign-architecture-title">
        <p class="eyebrow">CAMPAIGN STRATEGY / 策略到交付</p>
        <h3 id="campaign-architecture-title">Make Room for What Matters｜从用户情境到跨渠道传播</h3>
        <p>我把产品放回日常餐后清洁场景：用真实的生活问题引起注意，再通过双盘结构、操作演示和场景内容传达产品价值。Campaign 围绕一个核心主题展开，社媒、广告、内容、Creator 与邮件各自承担不同沟通任务。</p>
<div class="campaign-proof-gallery" id="campaign-proof-gallery" aria-label="M3 上市的产品与视觉素材">
 <figure><img src="assets/projects/m3-yellow-main.webp" alt="M3 产品主体主视觉" loading="lazy" decoding="async"><figcaption><b>01 / 产品识别</b><span>KV · 外观与品牌信息</span></figcaption></figure>
 <figure><img src="assets/projects/mop-kv-detail.webp" alt="M3 双盘拖把结构细节" loading="lazy" decoding="async"><figcaption><b>02 / 机制展示</b><span>操作镜头 Brief · 结构细节</span></figcaption></figure>
 <figure><img src="assets/projects/m3-yellow-battery.webp" alt="M3 电池部件外观图" loading="lazy" decoding="async"><figcaption><b>03 / 产品教育</b><span>FAQ · 产品细节与信息承接</span></figcaption></figure>
</div>
<div class="campaign-house" aria-label="M3 Campaign 品牌屋式策略与渠道架构">
          <div class="campaign-house-roof"><span>BRAND IDEA</span><h4>Power Every Move</h4><p>用动力支持每一次日常清洁行动</p></div>
          <div class="campaign-house-message"><span>CAMPAIGN BIG IDEA</span><h4>Make Room for What Matters</h4><p>餐后清洁 × 家庭生活 × 看得见的产品动作</p></div>
          <div class="campaign-house-insight"><span>CREATIVE PATH</span><div><b>真实场景</b><b>双盘机制</b><b>操作细节</b><b>家庭时刻</b><b>用户体验</b></div></div>
          <div class="campaign-house-channels">
            <article><small>OWNED SOCIAL</small><h5>Facebook / Instagram</h5><p>场景认知、产品演示与互动</p></article>
            <article><small>PAID MEDIA</small><h5>Meta Ads / TikTok Ads</h5><p>素材测试、受众触达与有效引流</p></article>
            <article><small>EARNED</small><h5>PR / Creator</h5><p>可信内容、真实体验与合作传播</p></article>
            <article><small>CRM / EDM</small><h5>Email / Lifecycle</h5><p>许可触达、产品教育与购后关系</p></article>
            <article><small>SEARCH</small><h5>SEO / Blog / FAQ</h5><p>搜索需求、疑问解答与长期承接</p></article>
            <article><small>COMMUNITY</small><h5>Facebook Group</h5><p>讨论参与、问题收集与 UGC</p></article>
            <article><small>COMMERCE</small><h5>商品页 / Amazon</h5><p>产品信息、选购解释与购买承接</p></article>
            <article><small>CONTENT PRODUCTION</small><h5>KV / Video / A+</h5><p>跨渠道视觉、脚本与素材版本</p></article>
          </div>
          <div class="campaign-house-base"><span>MEASUREMENT & GOVERNANCE</span><p>内容表现 → 有效访问 → 商业承接 → 复盘迭代</p><small>Social / Paid / PR / CRM / Commerce · 渠道协作规划</small></div>
        </div>
        <section class="campaign-operations-map" id="campaign-activation" aria-label="Campaign 从策划到各渠道激活的工作分工">
          <header><small>INTEGRATED ACTIVATION</small><h4>Campaign 渠道分工</h4><p>统一产品信息、Campaign 主张与素材版本；不同渠道沿着认知、理解、行动和关系维护的路径协作。</p></header>
          <div class="v-activation-journey" id="campaign-channel-path" aria-label="Campaign渠道在四个用户决策阶段中的任务">
            <div><small>01 / AWARENESS</small><strong>让问题被看见</strong><p>Social · Paid · PR</p><span>家庭场景 / Campaign 主题</span></div>
            <div><small>02 / EXPLAIN</small><strong>帮助理解产品</strong><p>Video · Creator · SEO</p><span>双盘动作 / 结构 / FAQ</span></div>
            <div><small>03 / ACTION</small><strong>核对购买信息</strong><p>Commerce · CRM · Paid</p><span>页面信息 / 许可触达 / 可售条件</span></div>
            <div><small>04 / RELATIONSHIP</small><strong>让反馈进入下一轮</strong><p>Group · CRM · Data</p><span>使用教育 / 问题回收 / 复盘</span></div>
          </div>
          <details class="v-channel-detail"><summary><span>渠道工作流</span><b>展开八条渠道的 Brief、物料与复盘任务</b></summary>
          <div class="campaign-workstreams">
            <article><span>01 / OWNED SOCIAL</span><h5>内容运营</h5><p>以季度主题组织 Feed、Story、Reels 和社群内容，按用户问题安排教程、产品演示和互动。</p><dl><dt>交付</dt><dd>内容矩阵、发布日历、KV / 视频 Brief</dd><dt>复盘</dt><dd>曝光、互动质量、视频观看与有效点击</dd></dl></article>
            <article><span>02 / PAID ADS</span><h5>投放创意与素材测试</h5><p>围绕场景问题、产品结构和操作演示规划不同创意家族；按 Awareness、Consideration 和获批的 Conversion 任务分配测试。</p><dl><dt>交付</dt><dd>广告素材变体、受众假设、测试方案与落地页接口</dd><dt>复盘</dt><dd>观看与点击质量；订单与获客成本由投放及数据负责人核对</dd></dl></article>
            <article><span>03 / EDM & CRM</span><h5>邮件触达与生命周期沟通</h5><p>预热阶段传递使用场景，上市窗口介绍产品信息；结合订阅许可、浏览、加购、已购和退订状态安排消息及排除。</p><dl><dt>交付</dt><dd>Launch Email、邮件主题、受众分层、触发与退出规则</dd><dt>复盘</dt><dd>送达、有效点击、退订、购后行为及数据对账</dd></dl></article>
            <article><span>04 / CREATOR</span><h5>第三方内容与素材供给</h5><p>按受众和产品使用场景筛选创作者，提供操作镜头要求、信息重点和使用说明。</p><dl><dt>交付</dt><dd>Creator Brief、成片审核与授权范围记录</dd><dt>复盘</dt><dd>交付完成、有效观看和获授权素材复用</dd></dl></article>
            <article><span>05 / PR & PARTNERSHIP</span><h5>新闻价值与合作传播</h5><p>将产品真实信息转化为可沟通的新闻角度与媒体资料；联合活动明确合作主题、发布节奏和权益。</p><dl><dt>交付</dt><dd>Press Kit、事实表、发布稿及合作素材</dd><dt>复盘</dt><dd>实际刊发、引荐访问与活动参与</dd></dl></article>
            <article><span>06 / SEARCH & CONTENT</span><h5>SEO / Blog / FAQ</h5><p>围绕清洁任务、选型和使用问题建设内容主题，为社媒和邮件带来的进一步搜索提供答案。</p><dl><dt>交付</dt><dd>Pillar Blog、FAQ、产品信息页内容接口</dd><dt>复盘</dt><dd>GSC 查询与点击、页面参与和有效承接</dd></dl></article>
            <article><span>07 / COMMERCE</span><h5>商品页与渠道销售资料</h5><p>统一产品结构、适用场景、参数和 FAQ；把内容流量带到清晰的选购和咨询路径。</p><dl><dt>交付</dt><dd>落地页、Amazon A+ 信息、渠道产品资料</dd><dt>复盘</dt><dd>有效访问、加购及获批的订单经营数据</dd></dl></article>
            <article><span>08 / DATA & DELIVERY</span><h5>测量、排期与项目管理</h5><p>将素材版本、渠道任务、发布时间和跨团队责任汇总；数据分析侧统一指标与来源，识别内容或承接环节的问题。</p><dl><dt>交付</dt><dd>里程碑、协作清单、UTM / 测量需求、复盘会议</dd><dt>复盘</dt><dd>内容表现、页面承接、运营问题与下一轮调整</dd></dl></article>
          </div>
          </details>
        <div class="campaign-assets-showcase" id="campaign-paid-email-assets" aria-label="广告和邮件沟通创意样例">
          <div class="campaign-assets-heading"><small>CREATIVE ADAPTATION / 渠道创意</small><h4>同一产品价值，在不同触点怎样表达</h4><p>从同一个用户问题出发，广告优先呈现注意力与动作，邮件负责解释产品和下一步。</p></div>
          <div class="campaign-assets-pair">
            <article class="campaign-ad-visual"><span>ADS / PAID CREATIVE</span><h5 lang="en">Dinner's done.<br>The floor isn't.</h5><p>场景钩子 → 产品出场 → 双盘操作近景 → 观看完整演示</p><div class="campaign-asset-tags"><small>Hook A · 场景</small><small>Hook B · 结构</small><small>Hook C · 操作</small></div><p class="campaign-asset-caption">Meta / TikTok 广告创意方向；测试和预算由投放负责人核准。</p></article>
            <article class="campaign-email-visual"><span>EDM / LIFECYCLE</span><div class="campaign-email-head"><b>New arrival</b><small>US / EN</small></div><h5 lang="en">Meet M3. Made for everyday floor care.</h5><p>预热邮件引导认知；上市邮件说明产品结构与适用场景；购后邮件围绕使用教育与 FAQ。</p><div class="campaign-asset-tags"><small>Subscribed</small><small>Interested</small><small>Purchased</small></div><p class="campaign-asset-caption">邮件内容、分层与退出逻辑为策划设计；实际发送受用户许可、系统就绪和商业条件约束。</p></article>
          </div>
          <div class="campaign-asset-links"><a href="#/case/crm/crm-handoff">查看 CRM 触达与排除逻辑 ↗</a><a href="#/case/creative/video-strategy">查看视频创意与开场设计 ↗</a></div>
        </div>
          
        </section>
        <section class="v-campaign-logic" id="campaign-decision-logic" aria-label="Campaign 策略决策路径">
          <header><small>THE STRATEGY IN ONE VIEW</small><h4>把一个生活问题，转化成整合传播的核心故事</h4></header>
          <div class="v-campaign-logic-steps">
            <article><span>CONTEXT</span><strong>餐后硬地清洁</strong><small>用户真正面对的日常任务</small></article>
            <article><span>INSIGHT</span><strong>希望清洁更顺手</strong><small>先理解场景，再介绍工具</small></article>
            <article class="is-idea"><span>BIG IDEA</span><strong>Make Room for What Matters</strong><small>让清洁行动回到家庭生活</small></article>
            <article><span>PROOF</span><strong>结构 × 连续操作</strong><small>产品外观、动作与 FAQ 各有证据</small></article>
          </div>
        </section>
        <div class="campaign-journey" aria-label="Campaign 用户决策阶段与渠道任务">
          <div><span>01 · Awareness</span><strong>识别场景</strong><p>Facebook / Instagram：餐后问题、家庭情境、品牌主题</p></div>
          <div><span>02 · Consideration</span><strong>理解产品</strong><p>Reels / Shorts：真实运动；FAQ：适用条件；Creator：授权体验</p></div>
          <div><span>03 · Conversion</span><strong>核对购买条件</strong><p>商品页 / CRM / Paid：价格、库存、支付和数据全通过后才开放购买型 CTA</p></div>
          <div><span>04 · Learning</span><strong>复盘决策</strong><p>早期看观看、疑问与有效访问；成熟后再核订单、退款、履约与净贡献</p></div>
        </div>
        <section class="v-content-map" id="campaign-content-matrix" aria-labelledby="v-content-heading">
          <header><span class="v-section-kicker">CONTENT SYSTEM</span><h4 id="v-content-heading">八个内容支柱，在用户决策路径中各有位置</h4></header>
          <div class="v-content-matrix" aria-label="八个内容支柱与四个传播阶段对应关系">
            <div class="v-matrix-head"><b>内容支柱</b><span>认知</span><span>理解</span><span>行动</span><span>持续</span></div>
            <div class="v-matrix-row"><b>场景问题</b><i class="hit" aria-label="对应认知阶段">●</i><i>·</i><i>·</i><i>·</i></div>
            <div class="v-matrix-row"><b>情绪与品牌</b><i class="hit" aria-label="对应认知阶段">●</i><i>·</i><i>·</i><i>·</i></div>
            <div class="v-matrix-row"><b>产品机制</b><i>·</i><i class="hit" aria-label="对应理解阶段">●</i><i>·</i><i>·</i></div>
            <div class="v-matrix-row"><b>操作教育</b><i>·</i><i class="hit" aria-label="对应理解阶段">●</i><i>·</i><i>·</i></div>
            <div class="v-matrix-row"><b>FAQ 与异议</b><i>·</i><i class="hit" aria-label="对应理解阶段">●</i><i class="hit" aria-label="对应行动阶段">●</i><i>·</i></div>
            <div class="v-matrix-row"><b>Creator / UGC</b><i class="hit" aria-label="对应认知阶段">●</i><i class="hit" aria-label="对应理解阶段">●</i><i>·</i><i>·</i></div>
            <div class="v-matrix-row"><b>转化承接</b><i>·</i><i>·</i><i class="hit" aria-label="对应行动阶段">●</i><i>·</i></div>
            <div class="v-matrix-row is-secondary"><b>品牌组合（辅助）</b><i>·</i><i>·</i><i>·</i><i class="hit" aria-label="对应持续阶段">●</i></div>
          </div>
          <p class="v-matrix-help">内容支柱与传播阶段的主任务分布。</p>
          <details class="g-chart-disclosure"><summary>查看各内容支柱对应的渠道任务与素材要求</summary>
          <div class="g-proof-table"><table class="campaign-content-table">
            <thead><tr><th>内容支柱</th><th>对应用户问题 / 内容</th><th>主要渠道任务</th><th>当前依赖</th></tr></thead>
            <tbody>
              <tr><th>场景问题</th><td>餐后仍需处理的地面清洁任务</td><td>FB / IG Feed、Story 与短视频建立相关性</td><td>真实场景，不以互动投票代替用户研究</td></tr>
              <tr><th>情绪与品牌</th><td>把清洁放回家庭生活的情境</td><td>节庆 KV、短片和较长品牌故事</td><td>人物、音乐与场景使用权待确认</td></tr>
              <tr><th>产品机制</th><td>双盘如何工作、如何接地和移动</td><td>Reels / Shorts、演示视频及结构轮播</td><td>真实 M3 运行视频不足时 HOLD_ASSET</td></tr>
              <tr><th>操作教育</th><td>手柄控制、电池安装和结构细节</td><td>轮播、结构短片与商品信息说明</td><td>官方源图及产品功能核验</td></tr>
              <tr><th>FAQ 与异议</th><td>适用范围、操作方式和维护问题</td><td>Group、FAQ 内容及客服答疑</td><td>真实问题来源与产品签核</td></tr>
              <tr><th>Creator / UGC</th><td>真实家庭中的第三方使用过程</td><td>Creator 渠道；品牌复用需单独授权</td><td>真实交付、披露及 Paid Usage Rights</td></tr>
              <tr><th>转化承接</th><td>已经了解产品的用户如何完成购买</td><td>商品页、许可邮件与获批的 Paid</td><td>Offer、库存、支付、履约、客服、数据核验</td></tr>
              <tr><th>组合教育（辅助）</th><td>四条产品线各解决什么清洁任务</td><td>持续期品牌轮播及教育内容</td><td>每款产品的官方图片和型号事实</td></tr>
            </tbody>
          </table></div>
          <p class="g-chart-note">核心内容 7 组 · 品牌组合教育 1 组</p>
          </details>
        </section>
        <p class="campaign-lens-note"><a href="#/case/gtm/launch-four-stages">上市里程碑 ↗</a> · <a href="#/case/gtm/launch-cross-channel">跨渠道交付责任 ↗</a> · <a href="#/case/creative/video-projects">观看视频节选 ↗</a></p>
      </section>
      ${launchFourStage()}
      ${launchDelivery()}
      ${englishBrief()}
      <p class="g-chart-note">已整理 23 个社媒内容与运营槽位、15 条 IMC 协同安排。复盘方案用观看和商品页访问定位问题，以对账后的净履约订单和净贡献评估商业表现。</p>
<section class="campaign-media-brief" id="gtm-media-plan" aria-labelledby="gtm-media-plan-heading">
  <header><small>IMC CHANNEL PLAN / PAID × EARNED</small><h3 id="gtm-media-plan-heading">不同渠道分工，不等于一份渠道清单</h3><p>Paid 负责受众与素材测试；PR / Creator 负责合作内容与可信表达。内容侧提供一致的产品事实、创意 Brief 和版本管理。</p></header>
  <div class="campaign-media-brief-grid">
    <article class="media-brief-paid"><div class="media-brief-kicker"><span>01 / PAID MEDIA</span><b>创意测试接口</b></div>
      <div class="media-brief-route"><span>场景 Hook</span><i>→</i><span>产品动作</span><i>→</i><span>页面承接</span></div>
      <dl><div><dt>目标任务</dt><dd>验证场景开场与结构开场的内容理解和有效访问</dd></div><div><dt>关键物料</dt><dd>Hook 变体、短视频、KV、落地页与追踪参数</dd></div><div><dt>判断信号</dt><dd>观看、链接点击、有效访问；商业结果由数据与投放负责人对账</dd></div><div><dt>执行接口</dt><dd>Social / Creative 提供素材；Paid Owner 负责测试和媒体预算</dd></div></dl>
    </article>
    <article class="media-brief-earned"><div class="media-brief-kicker"><span>02 / PR & CREATOR</span><b>信任与内容资产</b></div>
      <div class="media-brief-route"><span>产品事实</span><i>→</i><span>使用体验</span><i>→</i><span>媒体内容</span></div>
      <dl><div><dt>目标任务</dt><dd>围绕真实家庭任务解释用途与使用限制</dd></div><div><dt>关键物料</dt><dd>产品 Fact Sheet、英文 Brief、演示素材与媒体信息包</dd></div><div><dt>判断信号</dt><dd>有效发布、素材授权、受众互动与后续内容复用</dd></div><div><dt>执行接口</dt><dd>内容侧协助 Brief；PR / Creator 负责人确认合作与发布</dd></div></dl>
    </article>
  </div>
  <footer><span>CAMPAIGN DECISION → CHANNEL BRIEF → ASSET VERSION → REVIEW</span><a href="#/case/gtm/gtm-visual-schedule">对应上市排期 ↗</a></footer>
</section>
      <section class="g-module g-project v-localization" id="market-adaptation"      <section class="g-module g-project v-localization" id="market-adaptation" aria-labelledby="market-adaptation-heading">
        <header><span class="v-section-kicker">LOCAL MARKET ADAPTATION</span><h2 id="market-adaptation-heading">美英市场传播内容适配</h2><p>统一产品主张；分别调整美国和英国市场的语言、场景与行动号召。</p></header>
        <div class="v-localization-common"><small>ONE PRODUCT · ONE CORE IDEA</small><h3 lang="en">From grip to floor.</h3><p lang="en">Dinner’s done. Floor’s next.</p><span>共享产品原图、场景主题与视觉识别</span></div>
        <div class="v-localization-compare" aria-label="美国和英国市场本地化英文文案并排对照">
          <article lang="en-US" class="v-locale-panel is-us">
            <header><span>US / EN-US</span><b>United States · 美国</b></header>
            <div class="v-locale-copy"><small>STORY / INTERACTION</small><h3>Kitchen or <mark>entryway</mark>?</h3><p>After-dinner <mark>cleanup</mark></p><p><mark>Mom’s favorite</mark> moments</p></div>
            <footer><strong>文案切入</strong><span>以 entryway、cleanup 和美式拼写对齐当地受众</span></footer>
          </article>
          <article lang="en-GB" class="v-locale-panel is-uk">
            <header><span>UK / EN-GB</span><b>United Kingdom · 英国</b></header>
            <div class="v-locale-copy"><small>STORY / INTERACTION</small><h3>Kitchen or <mark>hallway</mark>?</h3><p>After-dinner <mark>clean-up</mark></p><p><mark>Mum’s favourite</mark> moments</p></div>
            <footer><strong>文案切入</strong><span>以 hallway、clean-up 和英式拼写减少理解偏差</span></footer>
          </article>
        </div>
        <div class="v-localization-decisions" aria-label="本地化发布检查重点">
          <div><span>01 / 共享不变</span><strong>产品真值与主视觉</strong><p>同一双盘结构、品牌主张和核心演示镜头</p></div>
          <div><span>02 / 本地调整</span><strong>语境、用词与节日</strong><p>根据当地语言及市场节奏重新组织文案</p></div>
          <div><span>03 / 各自验证</span><strong>商品信息与内容反馈</strong><p>本地 SKU、页面、履约和市场内创意表现分别检查</p></div>
        </div>
<section class="locale-decision-matrix" id="locale-decision-matrix" aria-labelledby="locale-decision-matrix-heading">
  <div class="locale-decision-head"><small>REGIONAL GO-TO-MARKET / LOCAL PLAYBOOK</small><h3 id="locale-decision-matrix-heading">从文案改写，延伸到当地市场决策</h3></div>
  <div class="locale-matrix-grid" role="group" aria-label="美英两市场共同的本地化决策维度">
    <article><span>01 / LANGUAGE</span><b>场景与类别词汇</b><p><strong>US</strong> entryway / cleanup / Mom</p><p><strong>UK</strong> hallway / clean-up / Mum</p></article>
    <article><span>02 / MESSAGE & PROOF</span><b>信息与产品证明</b><p>共享已核对的产品结构、核心价值和连续演示。</p><p>按地区重写 Hook、字幕、FAQ 与购买顾虑表达。</p></article>
    <article><span>03 / CHANNEL ROLE</span><b>传播路径与媒体接口</b><p>社媒与 Creator 负责场景教育，搜索回答高意图问题。</p><p>区域渠道投入依据当地触点表现和可执行资源确定。</p></article>
    <article><span>04 / COMMERCIAL READINESS</span><b>本地购买与服务承接</b><p>分别核对 SKU、价格显示、库存、配送、退货及客户支持。</p><p>每个地区独立复盘内容、有效访问与实际订单链路。</p></article>
  </div>
</section>
        <p class="v-localization-foot">美英双市场创意包：各 25 条文案，搭配静态、视频与 Creator 脚本。</p>
      </section>

      <section class="v-creative-directions" id="campaign-mechanism-mapping" aria-labelledby="v-creative-heading">
        <header><div><span class="v-section-kicker">M3 / CAMPAIGN CREATIVE</span><h2 id="v-creative-heading">M3 Campaign｜三条创意主线</h2></div><p>餐后清洁场景、双盘操作演示、家庭生活情绪。每条路线对应具体素材和渠道任务。</p></header>
        <div class="v-creative-gallery" aria-label="三条 Campaign 核心创意路线">
          <article class="v-creative-card">
            <div class="v-creative-art is-scene"><span>01 / SCENARIO</span><b>AFTER<br>DINNER</b><small>餐后地面场景</small></div>
            <div class="v-creative-text"><span class="v-creative-method">The After-Dinner Reset</span><h3>餐后地面清洁</h3><p>以餐区的具体清洁问题开场，接入 M3 的使用动作。</p><span><b>素材</b> 场景 KV、短视频、Story 互动</span></div>
          </article>
          <article class="v-creative-card">
            <div class="v-creative-art is-motion"><img class="v-creative-product-source" src="assets/projects/m3-yellow-main.webp" alt="M3 双盘电动拖把产品原图" loading="lazy" decoding="async"><span>02 / DEMO</span><b>SEE THE<br>MOTION</b><small>结构与操作</small></div>
            <div class="v-creative-text"><span class="v-creative-method">See the Motion</span><h3>看清双盘如何工作</h3><p>用产品特写和连续操作镜头交代双盘接地、移动路径。</p><span><b>素材</b> 结构图、演示镜头 Brief、FAQ</span></div>
          </article>
          <article class="v-creative-card">
            <div class="v-creative-art is-relationship"><span>03 / BRAND STORY</span><b>WHAT<br>MATTERS</b><small>家庭生活</small></div>
            <div class="v-creative-text"><span class="v-creative-method">Make Room for What Matters</span><h3>把时间留给生活</h3><p>以清洁任务和家庭相处构建品牌情绪，产品动作仍是故事的一部分。</p><span><b>素材</b> 品牌片脚本、生活场景、节庆内容</span></div>
          </article>
        </div>
        <aside class="v-creative-aux"><small>SUPPORTING CONTENT / 品牌组合教育</small><h3>One Home, Different Cleaning Jobs</h3><p>围绕五款产品、四条产品线说明不同清洁任务，作为持续内容补充。</p></aside>
      </section>


`, "product-portfolio");
  }

  function calendarDays() {
    return `<div class="g-calendar-days">${calendar.map(([day, stream, channel, en, zh, bodyEn, bodyZh]) => `
      <details class="g-calendar-day" data-calendar-day="${day}"><summary><span>Day ${String(day).padStart(2, "0")} · ${esc(stream)}</span><b>${esc(zh)}</b></summary>
      <div><small>${esc(channel)}</small><p lang="en"><strong>${esc(en)}</strong></p><p lang="en">${esc(bodyEn)}</p><p>${esc(bodyZh)}</p></div></details>`).join("")}</div>`;
  }

  function social() {
    return section("父亲节 30 天内容与项目日历", "For the Hands That Always Help · 家庭叙事与整合传播", `
<section class="social-outcome-bridge" id="social-outcome-bridge" aria-labelledby="social-outcome-heading">
  <div class="social-outcome-main"><small>2025 / META CONTENT PERFORMANCE</small><h3 id="social-outcome-heading">把内容经营结果连接到下一轮选题</h3><div class="social-outcome-values"><div><strong>96.5万</strong><span>内容曝光 · Meta</span></div><div><strong>3.7万</strong><span>内容互动 · Meta</span></div></div><a href="#/case/social/social-data-decisions">查看社媒分析与优化判断 ↗</a></div>
  <div class="social-decision-loop" aria-label="社媒数据复盘与内容计划循环">
    <article><span>01 / PLAN</span><h4>季度主题与月度日历</h4><p>按主推产品、渠道和季节性话题组织内容。</p></article>
    <article><span>02 / OBSERVE</span><h4>浏览、互动和点击</h4><p>按平台拆开评估内容作用与用户反馈。</p></article>
    <article><span>03 / DECIDE</span><h4>保留、改写或停止</h4><p>将高频问题、内容形式和素材质量写回下期 Brief。</p></article>
  </div>
</section>
      <div class="holiday-campaign-map" aria-label="父亲节 Campaign 主题、场景与阶段规划">
        <div class="holiday-campaign-theme"><small>FATHER'S DAY / CAMPAIGN IDEA</small><h3>For the Hands That Always Help</h3><p>从父亲为家庭做过的日常小事出发，让清洁工具成为家人之间传递关怀的故事载体。</p></div>
        <div class="holiday-campaign-pillars">
          <div><small>INSIGHT</small><strong>日常关怀</strong><p>从家庭生活的小事切入</p></div>
          <div><small>PRODUCT ROLE</small><strong>清洁工具</strong><p>让可观察的操作进入故事</p></div>
          <div><small>EMOTIONAL PAYOFF</small><strong>共同生活</strong><p>将关注点重新带回家人</p></div>
        </div>
        <div class="holiday-phase-title"><small>30-DAY CONTENT JOURNEY</small><h4>主题预热 → 使用场景 → 互动参与 → 内容复盘</h4></div>
        <div class="holiday-campaign-phases">
          <div><span>01 / 预热</span><b>家庭故事</b><p>情绪海报、提问帖与故事征集</p></div>
          <div><span>02 / 教育</span><b>产品演示</b><p>浴室边角与餐后地面使用场景</p></div>
          <div><span>03 / 互动</span><b>社群共创</b><p>Group 讨论、Reels、UGC 与用户问题</p></div>
          <div><span>04 / 收束</span><b>总结回流</b><p>精选内容、FAQ 更新和内容检查</p></div>
        </div>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>主题与主推产品</h3><p>以父亲为家人做过的小事发起互动。长柄电动刷负责浴室边角演示，黄色双盘拖把负责餐后硬地清洁。</p></article>
        <article><h3>平台与内容形式</h3><p>Facebook 和 Instagram 用轮播解释场景与选购问题，用 Reels 演示完整操作；Facebook Group 以家人教过的清洁习惯和生活故事发起讨论。</p></article>
        <article><h3>内容与交付节奏</h3><p>30 天内容排期：28 个传播节点、2 个审核与复盘节点。</p></article>
      </div>

      <div class="g-story-note" id="fathers-day-channel-roles">
        <h3>父亲节 Campaign｜内容主张与渠道联动</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>FACEBOOK / 场景与互动</small><h3>先让人讲家庭清洁故事</h3><p>从“父亲教过你的生活小技巧”开启讨论，再用轮播回应常见使用情境；重点观察真实留言和重复出现的问题。</p></article>
          <article><small>INSTAGRAM / 情境与可观察动作</small><h3>由节庆情绪进入产品演示</h3><p>Stories 和 Reels 分别承担主题传播与动作教育。长柄刷强调边角接触，双盘拖把展示餐后硬地推进，不将两种产品混成同一功能。</p></article>
          <article><small>GROUP / 关系与参与</small><h3>让成员提供真实做法</h3><p>教程、投票和 UGC 邀约是自愿参与。投稿并不自动允许商业复用，活动 Owner、资格与奖励由实际执行方确认。</p></article>
          <article><small>PR / CREATOR / 条件性协作</small><h3>有新闻价值和授权，才加外部传播</h3><p>围绕家庭故事与产品使用场景设计合作 Brief，同步规划创作者交付、内容披露和素材授权。</p></article>
          <article><small>PAID ADS / 创意放大</small><h3>用节庆主题形成广告创意变体</h3><p>规划家庭关系开场、清洁任务开场和产品动作开场，按受众阶段匹配素材与落地页，投放测试与预算由广告负责人审批。</p></article>
          <article><small>EDM / 邮件关系</small><h3>让活动内容进入订阅与购后沟通</h3><p>按活动主题设计邮件标题、产品故事与 FAQ，结合订阅许可和购买状态安排发送，避免向已购买用户重复催购。</p></article>
        </div>
        <p class="g-chart-note">Facebook · Instagram · Group · PR / Creator · Paid · EDM</p>
      </div>
      <p><a href="#/case/creative/video-strategy">查看节庆故事、产品教育与社群反馈各承担什么 ↗</a></p>
      <details class="g-chart-disclosure"><summary>展开 30 天双语内容与项目日历</summary><p class="g-chart-note">Day 01–28｜内容发布计划 · Day 29–30｜审核与复盘</p>${calendarDays()}</details>`, "fathers-day-calendar");
  }

  function pr() {
    return section("北美家庭清洁主题新闻稿发布", "King Newswire 分发 · USA Today Press Release 页面 · 2026 年 5 月", `
      <div class="g-project-feature g-project-wide-image"><figure>${image("pr-home-scene", "北美家庭客厅和厨房的清洁场景配图")}<figcaption>新闻稿配图 · 家庭清洁场景</figcaption></figure>
      <div>
        <h3>传播主题：从单品功能转向全屋清洁任务</h3>
        <p>稿件以北美家庭常见清洁场景组织产品信息，包括宠物毛发、地面污渍、浴室污垢、厨房油污和烧烤后残渣，让不同工具对应不同家庭任务。</p>
        <h3>传播结构：场景问题 → 产品分工 → 使用价值</h3>
        <p>以家庭日常场景作为入口，再说明地面清洁、浴室刷洗、吸尘和烤炉清洁等工具的使用边界；传播表达围绕已确认的产品功能展开。</p>
        <h3>可核验的分发结果</h3>
        <p>现有截图可核验 King Newswire 的新闻稿分发，刊载位置为 USA Today 的 Press Release 栏目。</p>
        
      </div></div>`, "pr-project");
  }

  function seasonalCreative() {
    return section("品牌传播视觉｜品牌屋与合作活动", "品牌定位、传播视觉和跨渠道活动物料。", `
      <div class="seasonal-art-grid" id="seasonal-art-gallery">
        <figure class="seasonal-art-card">
          <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">
            ${image("brand-house", "匿名品牌屋与四条产品线传播信息架构")}
          </a>
          <figcaption><small>BRAND STRATEGY / MESSAGE HOUSE</small><h3>品牌屋与产品线定位</h3><p>以家庭清洁任务划分产品信息层次，统一品牌主张与各产品线的传播重点。</p></figcaption>
        </figure>
        <figure class="seasonal-art-card">
          <a href="assets/projects/joint-giveaway.webp" target="_blank" rel="noopener noreferrer" aria-label="放大品牌联合活动视觉">
            ${image("joint-giveaway", "联合活动主视觉，包含合作产品与活动信息")}
          </a>
          <figcaption><small>CO-MARKETING / CAMPAIGN VISUAL</small><h3>品牌联合活动主视觉</h3><p>围绕共同家居场景组织两类产品、活动日期和参与信息，供双方渠道使用。</p></figcaption>
        </figure>
      </div>
      <div class="seasonal-art-decision" aria-label="品牌定位与合作活动视觉">
        <div><span>品牌策略</span><b>目标场景 → 产品信息 → 品牌表达</b></div>
        <div><span>联合活动</span><b>共用场景 → 活动主题 → 渠道素材</b></div>
      </div>
    `, "seasonal-creative-gallery");
  }

  function brandCampaign() {
    return section("家居品牌联合抽奖", "将家庭种植与日常清洁放进同一个家居场景。", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${image("joint-giveaway", "脱敏的联合抽奖海报，展示家庭种植设备、电动清洁刷和海报日期")}<figcaption>联合活动主视觉 · 4 月 18–28 日活动窗口</figcaption></figure>
        <div class="g-project-list">
          <article><h3>用共同场景连接两类产品</h3><p>家庭种植设备和电动清洁刷同框。画面先让用户看懂两类奖品及其使用场景，再用活动名称和日期交代参与窗口。</p></article>
          <article><h3>合作执行需要双方确认的事项</h3><p>在活动管理方案中，由牵头方统一资格、活动时区与规则。合作双方分别确认发布窗口、素材使用和奖品履约。复盘按各渠道发布记录、有效参与、奖品发放分开核对。</p></article>
          <article><h3>活动创意交付</h3><p>联合主题、奖品组合、产品与活动日期在同一张主视觉中清晰呈现，便于双方渠道使用同一套传播信息。</p></article>
        </div>
      </div>`, "brand-collaboration");
  }


  function creativeStrategy() {
    return section("节庆 Campaign 创意与视频内容分工", "感恩节、圣诞节 TVC 建立品牌情绪；KOL / Creator 内容通过具体清洁任务讲清产品使用。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><small>THANKSGIVING / TVC</small><h3>以团聚和感谢进入产品故事</h3><p>感恩节餐桌、火鸡与人物互动先建立节庆情境，随后进入家人照料和地面清洁。情绪故事与双盘功能展示交替推进，让产品出现在实际生活问题中。</p></article>
        <article><small>CHRISTMAS / TVC</small><h3>让日常家务成为关怀的表达</h3><p>圣诞夜的家庭空间、长者整理地面和家人团聚形成完整故事。产品结构和操作镜头为人物动作服务，最后以家庭关系收束品牌情绪。</p></article>
        <article><small>KOL / CREATOR</small><h3>用竖屏场景回答具体使用问题</h3><p>楼梯吸尘素材聚焦吸头接触、握持、移动方向与开场节奏。与完整 TVC 不同，这类内容优先让观众看清产品如何使用。</p></article>
      </div>
      <div class="g-story-note" id="video-channel-plan">
        <h3>将 Campaign 主题拆成不同的传播内容</h3>
        <ul>
          <li><strong>品牌 TVC：</strong>保留感恩节或圣诞节的完整人物故事、节庆识别与产品进入情节的过程，用于集中解释品牌价值与情绪主张。</li>
          <li><strong>完整 TVC 传播：</strong>感恩节与圣诞节分别展示完整视频，配合主视觉、社媒内容与渠道落地页统一活动主题。</li>
          <li><strong>KOL / Creator：</strong>把真实使用问题交给人物演示；先拍清接触位置与动作，再按渠道要求确定时长、画幅和说明重点。</li>
          <li><strong>后续优化：</strong>分别观察完整观看、动作片段观看和用户问题，调整剪辑、产品解释或 FAQ，而非用一项数据评价所有视频。</li>
        </ul>
        <p><a href="#/case/creative/video-projects">观看感恩节、圣诞节 TVC 与 KOL 视频 ↗</a> · <a href="#/case/gtm/campaign-architecture">查看 IMC / Campaign 渠道角色 ↗</a></p>
      </div>`, "video-strategy");
  }

  function creative() {
    return section("节庆 TVC 与 KOL 内容", "以感恩节、圣诞节两支主题广告建立品牌情绪，用 KOL / Creator 短视频回答真实的产品使用问题。", `
      <section class="tvc-creative-intro" id="video-campaign-showcase">
        <span>SEASONAL CAMPAIGN / TVC & CREATOR CONTENT</span>
        <h3>同一个清洁品牌，不同节日讲不同的家庭故事</h3>
        <p>感恩节关注团聚之后的照料与陪伴，圣诞节关注家人之间默默付出的日常行动。两支 TVC 将产品作用融入人物关系和家庭情境。KOL / Creator 内容分别展示楼梯踏面清洁与客厅中的产品介绍，画面和传播任务不重复。</p>
      </section>
      <div class="tvc-work-grid" aria-label="感恩节和圣诞节两支独立 Campaign TVC">
        <article class="tvc-work-card" id="thanksgiving-tvc" aria-labelledby="thanksgiving-heading">
          <div class="tvc-work-heading"><small>01 / THANKSGIVING · SEASONAL TVC</small><h3 id="thanksgiving-heading">感恩节｜感谢藏在日常照料里</h3><p>节日餐桌、火鸡和家人之间的互动建立节庆氛围；地面清洁成为人物彼此照顾的动作，随后进入双盘清洁工具的使用与功能演示。</p></div>
          <div class="tvc-work-player" id="video-drive-editions">
            <iframe loading="lazy" title="播放感恩节主题 TVC · 101秒视频预览" src="https://drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/preview" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="tvc-work-copy">
            <dl>
              <div><dt>主题切入</dt><dd>感恩节餐叙与家人之间的陪伴</dd></div>
              <div><dt>创意机制</dt><dd>团聚场景 → 生活中的清洁任务 → 家人互助 → 产品使用特写</dd></div>
              <div><dt>传播价值</dt><dd>用情感故事建立关注，以连续操作和功能画面补充产品理解</dd></div>
            </dl>
            <a href="https://drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/view" target="_blank" rel="noopener noreferrer">观看感恩节 TVC 完整视频 ↗</a>
          </div>
        </article>
        <article class="tvc-work-card" id="holiday-full-film" aria-labelledby="christmas-heading">
          <div class="tvc-work-heading"><small>02 / CHRISTMAS · SEASONAL TVC</small><h3 id="christmas-heading">圣诞节｜把关心放进每一个小动作</h3><p>圣诞树、礼物与夜晚的家庭空间建立情绪，年长者默默整理地面、使用黄色双盘拖把，最后让镜头回到一家人的相聚时刻。</p></div>
          <div class="tvc-work-player">
            <iframe loading="lazy" title="播放圣诞节主题 TVC · 90秒视频预览" src="https://drive.google.com/file/d/15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/preview" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="tvc-work-copy" id="long-film-note">
            <dl>
              <div><dt>主题切入</dt><dd>圣诞夜的家庭照料与陪伴</dd></div>
              <div><dt>创意机制</dt><dd>节日空间 → 地面清洁 → 产品操作 → 家人团聚</dd></div>
              <div><dt>传播价值</dt><dd>让功能表达融入人物关系，用完整叙事承载品牌情绪</dd></div>
            </dl>
            <a href="https://drive.google.com/file/d/15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/view" target="_blank" rel="noopener noreferrer">观看圣诞节 TVC 视频预览 ↗</a>
          </div>
        </article>
      </div>
      <section class="tvc-campaign-bridge" id="video-campaign-strategy">
        <header><small>CAMPAIGN → STORY → CHANNEL</small><h3>从节庆主题，到可用于渠道传播的创意内容</h3><p>两支品牌片的任务是情绪联结与产品价值沟通；短视频与商品内容进一步解释使用方式。Campaign 中的素材分工围绕同一产品信息展开。</p></header>
        <div class="tvc-campaign-bridge-grid">
          <article><span>BRAND / TVC</span><h4>情绪与记忆</h4><p>感恩节围绕感谢与相聚，圣诞节围绕日常关怀。让人物和产品动作在故事中发生联系。</p></article>
          <article><span>SOCIAL / PAID CREATIVE</span><h4>节奏与创意适配</h4><p>从完整故事中选取场景、人物和产品镜头，分别适配 Feed、Reels、视频广告等渠道的信息顺序。</p></article>
          <article><span>KOL / CREATOR</span><h4>使用体验与产品教育</h4><p>拆分两个不同画面：楼梯清洁强调吸头接触与行进路径；客厅介绍强调人物讲解、产品识别与握持展示。</p></article>
        </div>
        <p><a href="#/case/gtm/campaign-architecture">查看 IMC / Campaign 渠道协同 ↗</a> · <a href="#/case/operations/asset-review">查看创意与物料审核 ↗</a></p>
      </section>
      <section class="video-storyline" id="video-storyline" aria-label="圣诞 TVC 四段叙事结构">
        <header><small>CHRISTMAS STORY / 画面叙事</small><h3>圣诞 TVC：四个镜头任务</h3><p>从家庭氛围出发，让清洁动作成为人物关系的一部分，最后以团聚收束。</p></header>
        <ol class="video-story-beats">
          <li><span>01 / SETTING</span><strong>圣诞家庭场景</strong><p>灯光、礼物与生活空间建立节日情绪</p></li>
          <li><span>02 / ACTION</span><strong>默默整理地面</strong><p>年长者的动作让照料主题具体可见</p></li>
          <li><span>03 / PRODUCT</span><strong>产品融入故事</strong><p>双盘与地面的接触、推进交代实际用途</p></li>
          <li><span>04 / RELATIONSHIP</span><strong>回到家人团聚</strong><p>人物互动承接品牌情绪，完成故事收束</p></li>
        </ol>
      </section>
      <section class="kol-story" id="kol-shorts">
        <header><small>CREATOR / KOL-STYLE SHORT VIDEO</small><h3>KOL 内容｜用具体的使用情境回答产品问题</h3><p>两支竖屏 Creator 内容分别选择楼梯清洁和客厅产品介绍：前者展示动作与接触面，后者由人物面对镜头介绍产品。不同的空间和镜头任务放在一起，便于看出内容策略差异。</p></header>
        <div class="g-video-gallery">
          <figure class="g-video-demo">
            <video controls playsinline preload="metadata" poster="assets/projects/stairs-video-frame.webp" aria-label="播放 KOL 风格楼梯吸尘产品演示" aria-describedby="stairs-video-note">
              <source src="assets/video/creator-staircase-7s.mp4" type="video/mp4">
              <a href="assets/video/creator-staircase-7s.mp4">观看楼梯清洁短视频</a>
            </video>
            <figcaption id="stairs-video-note"><h3>楼梯场景｜操作演示</h3><p>人物、扶手、踏面和吸头保持在同一生活空间中，通过移动路径让使用方式更清楚。</p></figcaption>
          </figure>
          <figure id="video-opening-comparison">
            <video controls playsinline preload="metadata" poster="assets/projects/vacuum-video-frame.webp" aria-label="播放 KOL 客厅产品介绍镜头（独立于楼梯使用演示）" aria-describedby="opening-video-note">
              <source src="assets/video/creator-livingroom-7s.mp4" type="video/mp4">
              <a href="assets/video/creator-livingroom-7s.mp4">观看客厅产品介绍</a>
            </video>
            <figcaption id="opening-video-note"><h3>客厅场景｜人物介绍产品</h3><p>客厅片段聚焦人物介绍与产品持握；楼梯片段聚焦实际操作与接触面。</p></figcaption>
          </figure>
        </div>
        <p class="kol-role-note">竖屏内容与完整 TVC 的叙事方式不同：先交代清洁问题，再用人物、产品和接触动作完成体验表达。审核重点放在动作是否清晰、产品外观是否准确、开场能否快速传递主题。</p>
      </section>
      <div class="video-format-roles" id="video-format-roles" aria-label="节庆 TVC 与 KOL 内容的传播分工">
        <div><small>THANKSGIVING TVC</small><b>节庆情境与感谢</b><p>用餐桌与家庭互助进入故事，让产品功能自然承接生活场景。</p></div>
        <div><small>CHRISTMAS TVC</small><b>关怀与家庭陪伴</b><p>以默默照料建立品牌情绪，产品实际使用推动人物关系。</p></div>
        <div><small>CREATOR / KOL</small><b>使用证明与动作教育</b><p>将楼梯的操作证明与客厅的人物介绍分开展示，前者解决如何使用，后者帮助快速认识产品。</p></div>
      </div>
      <div class="g-story-note" id="video-decision-strip">
        <h3>三种视频内容，各自解决不同的传播任务</h3>
        <div class="g-video-decision-grid">
          <article><small>感恩节 / TVC</small><h4>从团聚进入产品价值</h4><p>火鸡餐桌、生活问题、家人照料与双盘清洁演示组合成情绪和功能都能被理解的品牌内容。</p></article>
          <article><small>圣诞节 / TVC</small><h4>用清洁动作讲关怀</h4><p>圣诞家庭布置、年长者整理地面和家人团聚形成完整叙事，产品是人物关系中的行动。</p></article>
          <article><small>KOL / Creator</small><h4>让用户看见具体怎么用</h4><p>楼梯演示看实际吸头路径，客厅介绍看人物展示和产品认知。两种不同内容场景分别对应操作教育与新品介绍。</p></article>
        </div>
      </div>
      <div class="g-story-note" id="video-management">
        <h3>我的创意参与与项目交付</h3>
        <p>参与节庆传播主题、创意脚本与画面审核，将品牌情绪、产品卖点和实际使用情境转化为可执行的镜头与传播物料。与产品、视觉、视频及社媒团队协作，分别检查故事连贯性、产品结构、动作真实性、字幕与渠道版本。</p>
        <p>两支 TVC 作为节庆创意预览呈现，Creator 内容分别展示楼梯实操与客厅产品介绍，每条保留完整七秒镜头。通过 Brief、产品事实审核和渠道版本管理维持品牌表达一致。</p>
        <p><a href="#/case/creative/video-strategy">查看视频创意判断 ↗</a> · <a href="#/case/gtm/campaign-architecture">查看 Campaign 协同 ↗</a></p>
      </div>`, "video-projects");
  }

  function expo() {
    return section("海外 B2B 展会与市场活动", "以往储能行业的参展经历，与可迁移的展会设计方法分别呈现。", `
      <div class="expo-scope-banner actual" id="expo-real-work"><span>01 / ACTUAL EXPERIENCE · 真实经历</span><h3>海外储能行业 B2B 展会</h3></div>
      <div class="expo-cover" id="expo-cover">
        <figure>${image("exhibition-booth-overview-redacted","储能行业真实展位照片，品牌标识已脱敏","jpg")}<figcaption>此前任职期间的海外储能展会现场 · 已匿名化</figcaption></figure>
        <div class="expo-cover-story"><small>ENERGY STORAGE / OVERSEAS B2B</small><h3>从系统陈列到客户沟通</h3><p>参与储能行业海外展会传播物料与系统设备展示，结合设备构成和应用场景开展客户沟通。</p>
          <div class="expo-cover-tags"><span>海外市场</span><span>展会物料</span><span>系统展示</span><span>客户沟通</span></div>
          <p><a href="#/case/b2b/expo-visitor-route">查看工作内容 ↗</a></p>
        </div>
      </div>
      <section class="expo-story" id="expo-visitor-route" aria-labelledby="expo-visitor-title">
        <header><small>WORK EXPERIENCE / CONTEXT</small><h3 id="expo-visitor-title">实际工作：让系统方案与采购需求建立联系</h3><p>系统展示、方案介绍、技术问答与商务跟进。</p></header>
        <div class="expo-visitor-map">
          <article><span>01</span><h4>应用领域</h4><p>使用展位信息和设备类别介绍面向的用电场景。</p></article>
          <article><span>02</span><h4>系统组成</h4><p>围绕光伏、逆变器、储能电池、发电机及负载之间的关系说明方案。</p></article>
          <article><span>03</span><h4>技术与商务问题</h4><p>讨论容量、安装、配置及交付条件，专业事项由对应人员确认。</p></article>
          <article><span>04</span><h4>后续业务沟通</h4><p>整理客户意向与问题，衔接销售和渠道负责人。</p></article>
        </div>
      </section>
      <div class="g-product-gallery expo-gallery" aria-label="真实海外储能展会脱敏照片">
        <figure>${image("exhibition-booth-angle-redacted","真实海外储能展台侧面，品牌标识已脱敏","jpg")}<figcaption><b>展位展示</b><span>空间入口、展墙与设备陈列</span></figcaption></figure>
        <figure>${image("exhibition-product-display-redacted","真实储能系统与设备展示墙，品牌标识已脱敏","jpg")}<figcaption><b>方案沟通</b><span>系统结构、应用与产品资料</span></figcaption></figure>
      </div>
      <section class="g-story-note b2b-compare" id="b2b-scale-comparison">
        <h3>同期海外客户开发与渠道推广</h3>
        <p>同期通过 Google、LinkedIn、Facebook、Instagram 与邮件开展海外客户开发和业务沟通。</p>
        <div class="expo-results">
          <article><span>月均潜在客户触达</span><strong>100+</strong><small>任职期海外 B2B 客户开发</small></article>
          <article><span>Facebook 账号粉丝规模</span><strong>400+ → 1,900+</strong><small>任职期渠道账号的阶段变化</small></article>
        </div><p><a href="#/data/b2b">查看 B2B 项目结果 ↗</a></p>
      </section>

      <div class="expo-scope-banner method" id="expo-method-framework"><span>02 / STRATEGY DESIGN · 理论方法</span><h3>品牌策略 × 展位体验 × 活动传播 × 线索承接</h3></div>
      <section class="expo-brand-system" id="expo-brand-activation" aria-labelledby="expo-brand-system-title">
        <div class="expo-system-header"><small>FIELD MARKETING / DESIGN FRAMEWORK</small><h3 id="expo-brand-system-title">一场展会，对应三段沟通任务</h3><p>先建立行业与品牌识别，再解释应用及系统方案，最后转为专业咨询与商务跟进。</p></div>
        <div class="expo-brand-stage" aria-label="通用B2B展会信息路径">
          <div class="expo-brand-stage-copy"><span>GENERIC B2B / NON-BRANDED CONCEPT</span><strong>DISCOVER.<br>UNDERSTAND.<br>CONNECT.</strong><p>识别 → 理解 → 交流</p></div>
          <div class="expo-brand-stage-journey">
            <div><small>01 / ATTENTION</small><b>品牌与行业</b><span>KV · 背景墙 · 导视</span></div>
            <div><small>02 / EXPLAIN</small><b>应用与系统</b><span>系统图 · 专家讲解 · FAQ</span></div>
            <div><small>03 / CONTACT</small><b>商务承接</b><span>资料包 · 需求分类 · CRM</span></div>
          </div>
        </div>
        <section class="expo-identity-editorial" id="expo-visual-language" aria-labelledby="expo-identity-title">
          <header><small>VISUAL IDENTITY / NEUTRAL CONCEPT</small><h4 id="expo-identity-title">视觉识别：每段距离，只解决一个信息问题</h4><p>远距建立品牌识别，中距展示应用方案，近距提供技术信息与商务沟通。</p></header>
          <div class="expo-identity-grid">
            <article class="expo-identity-poster" aria-label="通用系统方案展位示例主视觉">
              <small>MASTER VISUAL / EXAMPLE</small><span class="expo-identity-poster-brand">B2B SOLUTIONS</span><strong>FROM APPLICATION<br>TO SOLUTION.</strong><p>SYSTEMS / SCENARIOS / NEXT STEPS</p>
              <div class="expo-identity-poster-rule"><span>01 / SEE</span><span>02 / LEARN</span><span>03 / TALK</span></div>
            </article>
            <article class="expo-identity-hierarchy"><small>MESSAGE HIERARCHY</small><h4>按观看距离安排信息</h4>
              <ol><li><b>远距：品牌与领域</b><span>一眼识别业务场景与核心类别。</span></li><li><b>中距：应用与方案</b><span>展示系统结构、典型应用和关键价值。</span></li><li><b>近距：技术与决策</b><span>说明参数、适配要求与采购问题。</span></li></ol>
              <div class="expo-identity-swatches" aria-label="通用概念色板"><span class="swatch-dark">深色背景</span><span class="swatch-blue">信息蓝</span><span class="swatch-light">暖白说明区</span></div>
            </article>
            <article class="expo-identity-collateral"><small>ONE STORY / MANY TOUCHPOINTS</small><h4>同一条信息路径，三套渠道物料</h4>
              <div class="expo-brand-touch">
                <div><b>INVITE</b><span>定向邀请、会议预约和展前传播</span></div>
                <div><b>EXPLAIN</b><span>Brochure、系统图与 Press Kit</span></div>
                <div><b>FOLLOW UP</b><span>许可邮件、方案资料与销售跟进</span></div>
              </div><p>视觉交付：主 KV、应用场景图、技术资料、媒体与商务素材。</p>
            </article>
          </div>
        </section>
        <div class="expo-workstream" aria-label="通用展会九类工作模块">
          <article><span>01</span><b>品牌策略</b><small>定位 / 主题 / 信息层级</small></article>
          <article><span>02</span><b>空间设计</b><small>Booth Layout / 动线</small></article>
          <article><span>03</span><b>视觉识别</b><small>KV / 展墙 / 导视</small></article>
          <article><span>04</span><b>宣传物料</b><small>Brochure / 邀请函</small></article>
          <article><span>05</span><b>方案讲解</b><small>系统演示 / 技术 FAQ</small></article>
          <article><span>06</span><b>活动物料</b><small>周边 / 证件 / 包装</small></article>
          <article><span>07</span><b>媒体传播</b><small>Press Kit / 拍摄</small></article>
          <article><span>08</span><b>现场执行</b><small>搭建 / 用电 / 人员</small></article>
          <article><span>09</span><b>后续承接</b><small>Lead Capture / CRM</small></article>
        </div>
      </section>
      <section class="expo-concept-lab" id="expo-concept-lab" aria-labelledby="expo-concept-heading">
        <div class="expo-concept-heading"><div><small>SPACE CONCEPT / HYPOTHETICAL BOOTH</small><h3 id="expo-concept-heading">概念展位：从远距识别走向商务讨论</h3><p>10 × 20 ft 展位布局｜品牌区、应用区、系统讲解区、商务接待区</p></div>
          <div class="expo-concept-signal"><strong>6–10m</strong><span>远距识别示例</span><b>→ 3–5m → 1m → 0.5m</b></div></div>
        <div class="expo-space-map" id="expo-distance-route">
          <div class="expo-space-map-header"><span>VISITOR JOURNEY / INFORMATION</span><b>按距离组织信息</b></div>
          <div class="expo-space-track" role="group" aria-label="通用展位访客距离信息示例">
            <button type="button" class="expo-space-stop is-active" data-expo-select="0" data-expo-summary="主背景墙在远距呈现业务领域与核心方案，内容密度应随场地与真实品牌调整。" aria-pressed="true"><small>01 / 远距</small><strong>6–10m</strong><span>品牌识别</span><em>知道这里做什么</em></button>
            <button type="button" class="expo-space-stop" data-expo-select="1" data-expo-summary="两侧展示板分别介绍应用场景与系统方案，中距解释产品关系和客户问题。" aria-pressed="false"><small>02 / 中距</small><strong>3–5m</strong><span>应用与方案</span><em>看懂系统价值</em></button>
            <button type="button" class="expo-space-stop" data-expo-select="2" data-expo-summary="A3 系统讲解牌和 A4 技术资料卡用于近距解释方案；关键技术信息须经专业人员确认。" aria-pressed="false"><small>03 / 近距</small><strong>1m</strong><span>技术解释</span><em>确认关键问题</em></button>
            <button type="button" class="expo-space-stop" data-expo-select="3" data-expo-summary="接待区分类记录经销、采购与系统集成需求，在取得许可后安排下一步跟进。" aria-pressed="false"><small>04 / 接待</small><strong>0.5m</strong><span>商务咨询</span><em>建立后续联系</em></button>
          </div><div class="expo-space-focus"><span>概念触点</span><p id="expo-selected-detail" aria-live="polite">主背景墙在远距呈现业务领域与核心方案，内容密度应随场地与真实品牌调整。</p></div>
        </div>
        <section class="expo-plan-board" id="expo-floorplan" aria-labelledby="expo-plan-title">
          <div class="expo-plan-intro"><small>SPACE ZONING / DESIGN EXAMPLE</small><h4 id="expo-plan-title">概念平面图：品牌、应用、讲解与接待</h4><p>主墙负责远距识别，左右两区解释场景和系统，中央进行专业讲解，前台承接业务咨询。</p><div class="expo-plan-legend"><span>品牌</span><span>应用</span><span>方案</span><span>咨询</span></div></div>
          <div class="expo-plan-visual" role="img" aria-label="假设10乘20英尺B2B展位，后方主视觉，中部场景、系统与讲解，前方接待">
            <div class="expo-plan-dimensions"><span>CONCEPT / 10 × 20 FT</span><b>6.10m W × 3.05m D</b></div>
            <div class="expo-plan-wall"><small>EXH-MAT-01 / BACKDROP</small><strong>B2B SOLUTIONS</strong><span>业务领域与核心方案</span></div>
            <div class="expo-plan-interior">
              <div class="expo-plan-display"><small>APPLICATION ZONE</small><b>应用场景</b><span>中距解释客户任务</span></div>
              <div class="expo-plan-demo"><small>SYSTEM BRIEFING</small><b>系统讲解</b><span>近距沟通技术问题</span></div>
              <div class="expo-plan-display"><small>SOLUTION ZONE</small><b>系统方案</b><span>中距解释设备关系</span></div>
            </div>
            <div class="expo-plan-front"><div class="expo-plan-entry"><b>↑ 访客入口</b><span>通道视线</span></div><div class="expo-plan-reception"><small>EXH-MAT-06</small><b>商务咨询</b><span>渠道 / 采购 / 集成</span></div></div>
          </div><p class="expo-plan-caption">空间规划：6.10 m × 3.05 m · 开放式动线</p>
        </section>
      </section>
      <section class="expo-asset-studio" id="expo-asset-manifest" aria-labelledby="expo-asset-title">
        <header><small>EXAMPLE ASSET MANIFEST / POSM</small><h3 id="expo-asset-title">六种概念物料，四种阅读任务</h3><p>6 项物料：背景墙、场景板、系统板、讲解卡、技术卡与接待台。</p></header>
        <div class="expo-asset-grid">
          <article class="expo-asset-card expo-asset-wide"><div class="expo-asset-preview backdrop"><span>BUSINESS SOLUTIONS</span><b>APPLICATION & SYSTEM</b><i>DISCOVER / CONNECT</i></div><div class="expo-asset-meta"><small>EXH-MAT-01 / BACKDROP</small><h4>主背景板</h4><p>远距突出业务领域与主张。</p><span>6000 × 2400 mm · 6–10m</span></div></article>
          <article class="expo-asset-card"><div class="expo-asset-preview rollup"><b>USE CASE</b><span>典型场景</span><i>客户问题 / 使用条件</i></div><div class="expo-asset-meta"><small>EXH-MAT-02 / ROLL-UP A</small><h4>应用场景展示板</h4><p>用场景说明方案价值。</p><span>850 × 2000 mm · 3–5m</span></div></article>
          <article class="expo-asset-card"><div class="expo-asset-preview rollup"><b>SYSTEM</b><span>方案结构</span><i>组成 / 接口</i></div><div class="expo-asset-meta"><small>EXH-MAT-03 / ROLL-UP B</small><h4>系统方案展示板</h4><p>用结构图解释设备关系。</p><span>850 × 2000 mm · 3–5m</span></div></article>
          <article class="expo-asset-card"><div class="expo-asset-preview tabletop"><small>HOW IT WORKS</small><b>场景 · 系统 · 配置</b><i>讲解步骤</i></div><div class="expo-asset-meta"><small>EXH-MAT-04 / A3 GUIDE</small><h4>系统讲解牌</h4><p>让专家讲解更有层次。</p><span>420 × 297 mm · 1m</span></div></article>
          <article class="expo-asset-card"><div class="expo-asset-preview spec"><small>TECHNICAL FACTS</small><b>SPEC</b><i>规格与适配</i></div><div class="expo-asset-meta"><small>EXH-MAT-05 / A4 CARD</small><h4>技术规格台卡</h4><p>近距核实参数与适配条件。</p><span>210 × 297 mm · 0.5–1m</span></div></article>
          <article class="expo-asset-card"><div class="expo-asset-preview reception"><b>LET'S TALK</b><span>DISCUSS · CONNECT</span><i>商务咨询</i></div><div class="expo-asset-meta"><small>EXH-MAT-06 / RECEPTION</small><h4>接待台与留资牌</h4><p>按 B2B 合作类型分类联络。</p><span>1000 × 1000 mm + A5 台牌</span></div></article>
        </div>
      </section>
      <section class="expo-activation-lab" id="expo-activation-program" aria-labelledby="expo-activation-heading">
        <header><small>ACTIVATION / METHOD</small><h3 id="expo-activation-heading">现场活动：讲解、内容与需求承接</h3><p>现场活动：方案讲解、客户交流、内容拍摄与线索跟进。</p></header>
        <div class="expo-activation-grid">
          <article><span>01 / EXPLAIN</span><h4>方案介绍</h4><p>从应用场景进入系统组成，技术内容由专家确认。</p><strong>讲解脚本 · 系统图 · FAQ</strong></article>
          <article><span>02 / CONTENT</span><h4>现场传播内容</h4><p>根据许可记录展位、系统图及专业讲解，注意肖像与素材用途。</p><strong>媒体资料 · 图片 · 视频</strong></article>
          <article><span>03 / LEAD</span><h4>B2B 需求分流</h4><p>区分经销、采购、系统集成和后续商务问题。</p><strong>问题清单 · 表单 · CRM</strong></article>
        </div>
        <div class="expo-activation-rhythm">
          <div><small>展前 / 准备</small><b>目标与受众、物料、邀约、展品检查</b></div>
          <div><small>展前 / 验收</small><b>搭建、安全、用电、系统图、现场排班</b></div>
          <div><small>展中 / 执行</small><b>专业讲解、访客交流、内容采集与记录</b></div>
          <div><small>展后 / 跟进</small><b>商机分层、销售交接、内容复用与复盘</b></div>
        </div>
      </section>
      <section class="expo-experience-menu" id="expo-experience-menu" aria-labelledby="expo-experience-title">
        <header><small>ACTIVITY DESIGN / GENERIC</small><h3 id="expo-experience-title">四种活动机制，服务不同 B2B 沟通需求</h3><p>专业讲解、采购问答、现场内容与商务跟进。</p></header>
        <div class="expo-experience-grid">
          <article class="expo-experience-card"><div class="expo-experience-icon">01<span>EXPLAIN</span></div><h4>专家系统讲解</h4><p>展示应用场景、系统架构与配置选择。</p><dl><div><dt>现场</dt><dd>技术图与 A3 讲解卡</dd></div><div><dt>传播</dt><dd>技术图解及 FAQ</dd></div></dl></article>
          <article class="expo-experience-card"><div class="expo-experience-icon">02<span>ASK</span></div><h4>采购问题征集</h4><p>收集技术适配、交付和合作模式问题。</p><dl><div><dt>现场</dt><dd>问答卡与专家咨询</dd></div><div><dt>传播</dt><dd>解决方案文章和答疑</dd></div></dl></article>
          <article class="expo-experience-card"><div class="expo-experience-icon">03<span>SHARE</span></div><h4>专业内容拍摄</h4><p>仅使用取得许可的讲解和展示画面。</p><dl><div><dt>现场</dt><dd>拍摄位、授权核验</dd></div><div><dt>传播</dt><dd>LinkedIn、PR 与展会回顾</dd></div></dl></article>
          <article class="expo-experience-card"><div class="expo-experience-icon">04<span>CONNECT</span></div><h4>商务分流与跟进</h4><p>按照合作意向和阶段交给不同的销售负责人。</p><dl><div><dt>现场</dt><dd>接待表单与分层标签</dd></div><div><dt>传播</dt><dd>许可邮件与商务回访</dd></div></dl></article>
        </div><div class="expo-experience-close"><strong>一次专业交流，连接后续业务动作</strong><span>邀请 → 系统讲解 → 答疑 → 内容复用 → 跟进</span></div>
      </section>
      <section class="expo-program expo-campaign-flight" id="expo-event-plan" aria-labelledby="expo-program-title">
        <header><small>FIELD MARKETING / PLAN</small><h3 id="expo-program-title">展前、现场、展后的整合协作</h3><p>线上邀约、现场专业交流、展后商务跟进。</p></header>
        <div class="expo-flight-grid">
          <article class="expo-flight-card"><div class="expo-flight-number">01</div><small>PRE-EVENT</small><h4>建立目标客户到访理由</h4><div class="expo-flight-channel"><b>线下</b><p>展位、物料、设备与专业接待准备</p></div><div class="expo-flight-channel online"><b>线上</b><p>LinkedIn、官网、许可邮件和商务预约</p></div><div class="expo-flight-outcome"><span>目的</span><strong>让合适客户找到展位</strong></div></article>
          <article class="expo-flight-card"><div class="expo-flight-number">02</div><small>AT EVENT</small><h4>让客户理解系统方案</h4><div class="expo-flight-channel"><b>线下</b><p>场景讲解、设备展示与技术答疑</p></div><div class="expo-flight-channel online"><b>线上</b><p>获准的现场内容与媒体材料</p></div><div class="expo-flight-outcome"><span>目的</span><strong>形成具体采购沟通</strong></div></article>
          <article class="expo-flight-card"><div class="expo-flight-number">03</div><small>POST-EVENT</small><h4>把需求交接给业务负责人</h4><div class="expo-flight-channel"><b>线下</b><p>客户分类、专家答疑与销售跟进</p></div><div class="expo-flight-channel online"><b>线上</b><p>许可邮件、展会回顾与方案资料</p></div><div class="expo-flight-outcome"><span>目的</span><strong>区分线索与有效商机</strong></div></article>
        </div><div class="expo-flight-note"><b>协作角色</b><span>市场 / 产品技术 / 销售 / 设计 / 执行供应商 / CRM</span></div>
      </section>
      <section class="expo-collaboration" id="expo-team-handoff"><div><small>CROSS-FUNCTIONAL SOP / METHOD</small><h3>谁负责什么，在哪个节点验收</h3><p>协作分工：品牌市场、产品技术、销售商务、现场供应商。</p></div>
        <div class="expo-handoff-rails">
          <div><b>市场与品牌</b><span>主题、视觉、传播、活动组织</span></div>
          <div><b>产品与技术</b><span>架构、参数、演示内容审核</span></div>
          <div><b>销售与商务</b><span>采购问题、客户分流与跟进</span></div>
          <div><b>现场与供应商</b><span>搭建、安全、运输和人员安排</span></div>
        </div>
        <details class="g-chart-disclosure" id="expo-handoff"><summary>展会执行 SOP 与交接核查</summary><p>展前核对场地与展品、图纸、审批、预算、人员和物流；现场核对安全、设备、导视、接待与数据许可；展后安排客户交接、授权素材归档、物料清点与效果复盘。</p></details>
      </section>
    `, "expo-project");
  }

  function creator() {
    return section("Creator Desk 创作者合作审核", "工作台原型 · 从来信提取候选事项，由负责人确认合作承诺及素材权利。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题和交付先写进 Brief</h3><p>按目标市场、受众和内容风格筛选创作者。Brief 写清产品事实、演示任务、交付形式和审核责任，供内容审核时逐项核对。</p></article>
        <article><h3>报价、交付和付款逐项核对</h3><p>演示邮件将报价、交付、付款放入待确认清单。负责人查原邮件，确认条款后再审核对应回复草稿。</p></article>
        <article><h3>授权用途分开管理</h3><p>合作内容的品牌转发、剪辑和付费广告需要分别明确可使用的平台、地域、期限与用途；内容审核与商业授权同步交接。</p></article>
        <article><h3>交付审核对应具体版本</h3><p>逐条核对产品事实、合作披露和修订意见。通过审核的内容版本与对应授权一起留档，方便后续查找和复用。</p></article>
      </div>
      <div class="g-story-note" id="partner-handoff">
        <h3>外部创作者从 Brief 到交付</h3>
        <p>合作交付：邀约时确认寄样、脚本初稿与成片日期。首稿审核看开场能否交代使用场景、动作能否支持主张，以及合作披露是否清楚。把返修意见标到对应版本和时间点。</p>
        <p>验收时将成片与书面使用许可一起归档，注明渠道、地域、期限、剪辑与付费使用范围，供后续复用时核查。</p>
        <p><a href="#/case/gtm/english-brief">查看一份英文制作 Brief ↗</a> · <a href="#/case/creative/video-projects">查看接触面与操作路径的镜头样例 ↗</a></p>
      </div>
      <p class="g-chart-note">Creator Desk 原型：创作者资料审核、素材交接、授权记录与邮件工作流设计。</p>`, "creator-project");
  }

  function seo() {
    const articles = [
      ["ART-01", "The Post-Halloween Survival Guide: Deep Cleaning Sticky Floor & Makeup Disasters", "Pillar", "Informational / Guide"],
      ["ART-02", "How to Remove Fake Blood and Face Paint from Grout, Sinks, and Porcelain", "Cluster", "Problem-solving"],
      ["ART-03", "Sticky Candy Meltdown: Safely Dissolving Sugar and Syrup from Hardwood Floors", "Cluster", "How-To / Educational"],
      ["ART-04", "Pumpkin Guts, Candle Wax, and Porch Grime: Outdoor Entryway Restoration", "Cluster", "Seasonal Maintenance"],
      ["ART-05", "Fall Costume Glitters and Faux Cobweb Cleanup: Vacuuming Without Bristle Tangles", "Cluster", "How-To / Product Selection"],
      ["ART-06", "Hosting a Spooktacular Party? The 30-Minute Speed Cleaning Checklist", "Cluster", "Checklist / List"],
      ["ART-07", "Bathroom Horror Stories: Eliminating Soap Scum, Hair Dye, and Tile Grime Fast", "Cluster", "Comparison / Problem-solving"],
      ["ART-08", "Electric Spin Scrubber vs. Traditional Mop: Tackling High-Traffic Holiday Footprints", "Cluster", "Commercial Investigation"],
      ["ART-09", "Pet Costumes, Shedding Season, and Autumn Flea Dirt: Whole-Home Hygiene Guide", "Cluster", "Hygiene / Lifestyle"],
      ["ART-10", "Post-Party Kitchen Degreasing: Air Fryers, Stovetops, and Caramel Splatters", "Cluster", "How-To / Deep Cleaning"],
    ];
    return section("Halloween SEO 主题集群规划", "No Scares, Just Spotless · 美国 / 北美市场 · 英文优先", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>先用主指南承接节后清洁</h3><p>1 篇主指南负责把万圣节后的清洁任务讲清楚，9 篇专题再按地面、浴室、门廊、宠物毛发和厨房等具体问题展开。</p></article>
        <article><h3>按搜索意图决定内容深度</h3><p>糖浆黏污专题先说明表面与操作条件，服务有明确清洁问题的读者。电动刷与传统拖把的对比服务正在选工具的人，按污渍、接触表面和操作方式组织比较。</p></article>
      </div>
      <div class="g-story-note">
        <h3>选题决定入口，内容决定下一步</h3>
        <p>节庆社媒先让读者识别「派对结束后的黏脚印」。搜索端用总指南承接这个问题，再按地面、浴室与厨房分流。已经在比较工具的读者可从专题进入选型或 FAQ。规划复盘时，先看每个入口的搜索点击，再看访问后是否继续阅读相关内容。</p>
        <p><a href="#/case/social/execution">查看节庆主题如何拆成社媒内容 ↗</a> · <a href="#/data/search">查看现有搜索数据口径 ↗</a></p>
      </div>
      <details class="g-chart-disclosure"><summary>查看十篇英文选题与搜索意图</summary>
        <div class="g-project-list g-project-calendar-plan">${articles.map(([id, title, type, intent]) => `
          <article><small>${esc(id)} · ${esc(type)}</small><h3 lang="en">${esc(title)}</h3><p lang="en">${esc(intent)}</p></article>`).join("")}</div>
      </details>
      `, "seo-cluster");
  }

  function operations() {
    return section("社媒团队｜内容规划与素材审核", "社媒小组的项目分工与审核清单", `
      <section class="operations-control" id="operations-control" aria-labelledby="operations-control-heading">
 <header><span>TEAM OWNERSHIP / DELIVERY SYSTEM</span><h3 id="operations-control-heading">从季度主题到发布验收，明确每一个交接</h3><p>社媒小组直接管理与审核，横向对齐产品、视觉、视频和渠道负责人。</p></header>
 <div class="operations-role-board" aria-label="跨职能工作流与责任">
  <article class="is-my-role"><span>01 / 我的主责 · SOCIAL</span><h4>主题、Brief 与内容审核</h4><p>季度主题、月度日历、素材初审、反馈与复盘。</p><b>OWNER / CONTENT</b></article>
  <article><span>02 / 产品同事 · FACT</span><h4>参数与适用条件</h4><p>确认产品结构、关键规格和传播主张。</p><b>PROOF / CLAIM GATE</b></article>
  <article><span>03 / 设计与视频 · ASSET</span><h4>素材制作与版本</h4><p>制作 KV、轮播、演示镜头及渠道版本。</p><b>VERSION / REWORK</b></article>
  <article><span>04 / 渠道负责人 · RELEASE</span><h4>发布与商业承接</h4><p>按渠道核查链接、权限、发布和商业条件。</p><b>HANDOFF / RELEASE</b></article>
 </div>
 <div class="operations-issue-panel">
   <div class="operations-issue-visual"><img src="assets/projects/m3-yellow-main.webp" alt="M3 产品结构核对参考图" loading="lazy" decoding="async"><span>PRODUCT STRUCTURE / REFERENCE</span></div>
   <div class="operations-issue-copy"><span>REAL REVIEW / M3 KV</span><h4>CTA 遮挡双盘：一次具体的退回修改</h4>
    <ol><li><b>发现</b><span>4:5 主视觉底部 CTA 侵占关键产品结构。</span></li><li><b>修订</b><span>调整 CTA 安全区，确保双盘完整露出。</span></li><li><b>验收</b><span>Feed / Story 分别检查产品外观、裁切与文字区域。</span></li></ol><a href="#/case/operations/asset-review">查看审核记录 ↗</a>
   </div>
 </div>
</section>
      <details class="operations-process-details"><summary>查看内容组排期与审核工作流程</summary><div class="g-project-list g-project-calendar-plan">
        <article><h3>选题与排期</h3><p>我从季度主推主题选定产品和场景，给 Facebook、Instagram 和 Group 分配内容任务，并确认每条内容的负责人和交付时间。</p></article>
        <article><h3>产品与素材确认</h3><p>产品同事核对功能、参数和适用条件。社媒小组确认拍摄清单、素材权限和链接后，将 Brief 交给设计和视频同事。</p></article>
        <article><h3>创意与发布审核</h3><p>脚本审用户问题和演示顺序，画面审产品结构与操作，发布前检查文案、字幕、链接和平台版本。</p></article>
        <article><h3>复盘与下月安排</h3><p>按平台看浏览、互动和反馈。把反复出现的产品问题补进 FAQ，把返工项写回审核清单和下一轮 Brief。</p></article>
      </div>
      </details>
      <div class="g-story-note" id="asset-review">
        <h3>一次真实的物料返工：首图看不到双盘</h3>
        <ul>
          <li><strong>发现</strong> 4:5 版主视觉底部 CTA 框遮挡并裁切了双盘。静态首图的任务是让人看懂产品结构，这一版需要返工。</li>
          <li><strong>修改与复核</strong> 制作样例保留产品原图，调整版式和 CTA 区域。后续版本的产品外观已复核，最终品牌与产品签核待确认。</li>
          <li><strong>写回交付清单</strong> Feed 和 Story 分别查裁切、安全区和关键结构。涉及运行的表达回到连续实拍，由产品团队核对对应说明。</li>
        </ul>
        <p class="g-chart-note">M3 主视觉 · 审核退回与修订记录</p>
        <a class="featured-detail" href="#/case/gtm/english-brief">查看对应英文 Brief ↗</a>
      </div>
      <div class="g-story-note" id="cross-functional-governance">
        <h3>横向推进的三件事：催节点、收反馈、对齐口径</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>节点</small><h3>谁迟交，影响哪一步</h3><p>把素材输入、Owner、版本和截止时间写进工作单。产品事实尚未签核，相关视频、A+ 或页面不能直接放行；协调方提出替代交付和更新时点。</p></article>
          <article><small>反馈</small><h3>用可复现的问题退回素材</h3><p>例如 M3 主视觉 CTA 遮挡双盘，返工要求是让关键结构完整可见，而非笼统反馈“再高级一点”。图片由制作方修改，内容侧复核。</p></article>
          <article><small>口径</small><h3>同一 Claim，只能有一个已批准版本</h3><p>社媒、商品页、渠道培训与 PR 表达可因受众不同而调整顺序，但参数、适用条件和权利要求由各自事实/审批 Owner 确认。</p></article>
          <article><small>升级</small><h3>不能用赶进度替代授权</h3><p>对于产品信息、素材权利和购买承接，使用 HOLD / REWORK 管理异常；社媒内容组负责 Brief 和审核，其他业务由对应负责人放行。</p></article>
        </div>
      </div>
      <div class="g-story-note">
        <h3>父亲节 Campaign 交付节奏</h3>
        <p>长柄刷聚焦浴室边角，双盘拖把聚焦餐后硬地。社媒小组先确定平台、负责人和素材需求，产品同事确认结构及使用条件，设计与视频分别完成轮播和操作镜头。Day 29 核对文案、画面、字幕、链接和各平台版本，Day 30 汇总待处理问题，作为下一轮 Brief 的输入。</p>
        <p class="g-chart-note">内容排期：28 个对外节点 · 2 个内部验收节点</p>
        <a class="featured-detail" href="#/case/social/fathers-day-calendar">查看双语日历与验收节点 ↗</a>
      </div>`, "team-delivery");
  }

  function amazonPriority() {
    return section("店铺先解决哪一段问题", "运营诊断 · 商品、流量与履约", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>有浏览，详情页解释不清</h3><p>先检查点击进入的人在看什么词，以及主图、A+ 和商品页有没有回答用途、规格和适用条件。把买家重复提问交给商品与设计改信息。</p></article>
        <article><h3>有转化，供货和售后出现压力</h3><p>广告和促销节奏要与库存、配送和退换预期一起核。补齐承接后，再评估是否增加流量投入。</p></article>
      </div>
      <p>任职期销售、转化和利润指标见经营数据。复盘维度：商品、广告、售价、库存及订单。</p>
      <p><a href="#/data/commerce">查看店铺经营记录 ↗</a></p>`, "amazon-priority");
  }

  function crmHandoff() {
    return section("谁可以收到邮件，谁要先排除", "生命周期策略 · 事件、许可与顾客状态", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>浏览或加购后，先检查状态</h3><p>有有效许可、符合等待窗口且尚未购买，才进入对应提醒。已经下单时，退出催购，进入购后信息流程。</p></article>
        <article><h3>退款或服务问题，先交客服</h3><p>出现退款、退订或待解决的服务问题时，暂停相应营销触发。运营与电商对齐状态来源，测试频控、退出和重复进入。</p></article>
      </div>
      <p>交付以用户旅程、触达条件、名单排除与频控规则为核心，连接商品页和邮件内容，帮助团队明确系统配置与沟通任务。</p>`, "crm-handoff");
  }


  const caseInsights = {
    gtm: [
      "为什么首发从餐后硬地讲起",
      "同一品牌覆盖地面、浴室等多种清洁任务。美国上市规划把优先场景收敛到餐后硬地，因为餐区污渍、站姿推进和双盘接地可以在同一组镜头里讲清。长柄刷继续承接浴室边角的问题。",
      "2026 年 5 月上市规划以餐后硬地为优先场景，串联 VOC、产品事实、内容制作与各渠道发布 Gate。",
    ],
    brand: [
      "用户先选清洁任务，再认产品线",
      "品牌屋把五款产品放回四条产品线。餐区黏污和浴室边角各有明确的接触表面、操作动作和对应工具，因此可作为品牌传播最先讲清的两个场景。",
      "围绕家庭任务组织品牌屋、新闻稿与联合营销素材，重点统一产品主张、使用场景和视觉信息层级。",
    ],
    social: [
      "内容复盘先看用户停在哪一步",
      "同样是数据上涨，浏览、互动与点击回答的问题不同。复盘时先检查内容有没有吸引人停留，再看用户是在讨论场景、追问用法，还是进入下一步。",
      "负责季度主题、月度日历和社媒小组审核；以展示、互动、点击和社群反馈调整内容结构。",
    ],
    operations: [
      "主视觉返工，优先保护用户需要看到的结构",
      "M3 的 4:5 主视觉被 CTA 框遮住双盘。首图承担介绍产品结构的任务，因此审核时先要求双盘完整可见，再调整按钮位置和不同版位的裁切。",
      "我负责内容侧交付与审核；产品事实由产品/研发确认，最终公开权限由相应角色签核。把必须入镜的部件、安全区、素材版本和审核责任写回 Brief，现有记录不支持量化节省工时。",
    ],
    community: [
      "把成员的使用问题带回内容和产品",
      "规划教程、投票和讨论时，优先选择成员能描述具体场景的问题，例如用在什么表面、哪一步卡住。运营汇总共性问题，产品确认用法，内容组更新 FAQ 或演示。",
      "成员快照说明社群规模，查看和发帖评论说明各自窗口内的行为。评估单场活动还需要参与记录、反馈和素材授权。",
    ],
    b2b: [
      "先问客户怎么用，再决定跟进什么",
      "客户开发按应用场景、产品匹配和采购条件判断优先级。展会现场的系统展示可以从具体用电场景开启对话，后续由商务核实报价、配置和交付。",
      "照片支持展会参与和陈列。衡量展会贡献需要核对现场登记、会后跟进和机会来源。任职期经营数据按各自窗口查看。",
    ],
    seo: [
      "用搜索问题决定页面分工",
      "节后清洁既有人想解决眼前的黏污，也有人在比较工具。主指南按清洁任务分流，专题解释表面与操作条件，FAQ 或商品页承接需要选型的人。",
      "现有工作物是主题集群规划。发布后可按页面核对收录、查询与点击，再观察读者是否进入下一页。",
    ],
    amazon: [
      "先找出经营瓶颈，再决定投入",
      "流量少时检查搜索词和点击。有浏览却少下单时，检查商品页是否讲清用途和规格。销量起来以后，再核对库存、退换和广告成本能否支撑继续投放。",
      "任职期经营记录可用来说明阶段表现。判断某次改动的贡献，需要同商品、同窗口的流量、广告、库存与订单。",
    ],
    creative: [
      "开场由观众要解决的问题决定",
      "节庆短片用聚餐和污渍引出工具，在结尾回到人物。楼梯吸尘片面向操作疑问，开场就给吸头和踏面。两种开场各有需要拍到的动作。",
      "现有节选可观察故事顺序、构图和接触位置。若要比较开场效果，可固定受众、版位、片长与后续镜头，再观察留存。",
    ],
    crm: [
      "发送之前先核对用户的真实状态",
      "加购用户可能已经下单，也可能正在处理退款。旅程规划先核同意记录、订单与售后状态，再决定发提醒、转入购后信息或暂停营销。",
      "旅程设计围绕触发、退出、频控、重复进入与发送测试展开。",
    ],
    creator: [
      "先看创作者能否拍清用户最关心的动作",
      "为产品教育筛选创作者时，优先看目标受众、过往镜头和理解产品的能力。Brief 明确需要拍到的动作，验收时逐项对照片段、披露与可使用范围。",
      "以创作者筛选、合作 Brief、版本审核、授权记录和发布回链组织交付。",
    ],
  };

  function renderInsight(main, id) {
    const insight = main.querySelector("#insight > div:last-child");
    const choice = caseInsights[id];
    if (!insight || !choice) return;
    const [title, decision] = choice;
    const heading = insight.querySelector("h2");
    heading.textContent = title;
    insight.querySelector("h2 + p").textContent = decision;

  }

  const extras = {
    brand: { strategy: brand, execution: () => seasonalCreative() + pr() + brandCampaign() },
    gtm: { strategy: gtm },
    social: { execution: social },
    creative: { strategy: creativeStrategy, execution: creative },
    b2b: { execution: expo },
    creator: { execution: creator },
    seo: { execution: seo },
    operations: { management: operations },
    amazon: { strategy: amazonPriority },
    crm: { strategy: crmHandoff },
  };
  window.enhancePortfolioProjects = (main, { page, id }) => {
    if (page !== "case" || !Object.hasOwn(caseInsights, id)) return;
    renderInsight(main, id);
    for (const [chapter, render] of Object.entries(extras[id] ?? {})) {
      const content = main.querySelector(`#${chapter}>div:last-child`);
      if (!content) continue;
      if (chapter === "strategy") {
        for (const legacy of content.querySelectorAll(".brand-house, .channel-grid")) legacy.hidden = true;
      }
      const introduction = content.querySelector("h2 + p");
      if (introduction) introduction.insertAdjacentHTML("afterend", render());
      else content.querySelector("h2")?.insertAdjacentHTML("afterend", render());
    }
    if (id === "gtm") {
      const filters = [...main.querySelectorAll("#gtm-visual-schedule [data-gtm-focus]")];
      const lanes = [...main.querySelectorAll("#gtm-visual-schedule .v-gantt-lane")];
      const status = main.querySelector("#gtm-visual-schedule .v-gantt-view-caption");
      const scroller = main.querySelector("#gtm-visual-schedule .v-gantt-scroll");
      const labels = {all: "全部工作流", lead: "内容主责", partner: "渠道协同", support: "商业与验收"};
      for (const button of filters) button.addEventListener("click", () => {
        const focus = button.dataset.gtmFocus;
        if (!Object.hasOwn(labels, focus)) return;
        filters.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        let shown = 0;
        for (const row of lanes) {
          row.hidden = focus !== "all" && row.dataset.gtmGroup !== focus;
          if (!row.hidden) shown++;
        }
        if (status) status.textContent = `正在展示 ${shown} 条工作流 · ${labels[focus]}`;
        if (scroller) scroller.scrollLeft = 0;
      });
      const gates = [...main.querySelectorAll("#gtm-visual-schedule [data-gtm-gate]")];
      const gatePanel = main.querySelector("#v-gate-detail");
      if (gatePanel) for (const button of gates) button.addEventListener("click", () => {
        gates.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        const field = (name, value) => {
          const node = gatePanel.querySelector(`[data-gate-slot="${name}"]`);
          if (node) node.textContent = value;
        };
        field("number", "G" + button.dataset.gtmGate + " / PLANNING GATE");
        field("title", button.querySelector("span")?.textContent || "");
        field("owner", button.dataset.gateOwner || "");
        field("input", button.dataset.gateInput || "");
        field("approval", button.dataset.gateApproval || "");
      });
    }
    if (id === "b2b") {
      const steps = [...main.querySelectorAll("#expo-distance-route [data-expo-select]")];
      const output = main.querySelector("#expo-selected-detail");
      if (output) {
        steps.forEach((button) => button.addEventListener("click", () => {
          steps.forEach((item) => {
            const active = item === button;
            item.classList.toggle("is-active", active);
            item.setAttribute("aria-pressed", String(active));
          });
          output.textContent = button.dataset.expoSummary || "";
        }));
      }
    }
  };
})();
