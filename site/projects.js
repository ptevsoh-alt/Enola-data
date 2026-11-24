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
    return section("品牌定位与产品线传播", "美国市场 · 品牌屋与整合传播", `
      <div class="g-project-feature">
        <a href="assets/projects/brand-house.webp" target="_blank" rel="noopener noreferrer" aria-label="放大匿名品牌屋">${image("brand-house", "品牌屋总览，包含定位、四条产品线、目标人群和传播支柱")}</a>
        <div>
          <h3>品牌定位：把产品放回具体清洁任务</h3>
          <p>面向美国市场的家用电动清洁工具，优先解决餐区硬地黏污，以及浴缸内沿、墙砖接缝和边角的刷洗问题。产品由电机带动清洁头，用户控制握持位置、角度和移动路径。</p>
          <h3>按三类购买任务组织沟通</h3>
          <p>餐区清洁者关注扫过后仍然粘脚的脚印和溅渍；浴室清洁者关注刷头够不到的内沿与接缝；替家人购买的人，需要先确认握持、转向、换刷头和适用表面。</p>
          <p><a href="#/case/brand/promotion-campaign-kv">查看黑五、母亲节与父亲节 Campaign KV ↗</a> · <a href="#/case/brand/brand-collaboration">查看联合抽奖海报 ↗</a> · <a href="#/case/brand/pr-project">查看北美新闻稿分发 ↗</a></p>
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
        <h3>品牌传播素材与应用</h3>
        <ul>
          <li><a href="#/case/brand/brand-collaboration">联合抽奖海报</a>将家庭种植和清洁工具放进同一生活场景，交代奖品与参与时间。</li>
          <li><a href="#/case/brand/pr-project">北美新闻稿</a>按全屋清洁任务安排四条产品线，可核对 2026 年 5 月新闻稿栏目分发。</li>
          <li><a href="#/case/creative/video-projects">演示视频拆解</a>把卖点落到接触位置、持握姿势和连续动作。</li>
        </ul>
      </div>
      <div class="g-story-note">
        <h3>社群问题与后续选题</h3>
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
        <h3>M3 五月传播安排</h3>
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
            <tr><th scope="row">社媒</th><td>KV、Feed / Story、短视频脚本、Creator Brief</td><td>我负责内容组排期与审核；产品及品牌分别签核</td><td>有英文 Brief、内容排期与素材版本记录</td></tr>
          </tbody>
        </table></div></details>
        <p>我负责社媒内容排期、创意审核与交付跟进，推动产品、视频、设计、广告及电商团队对齐核心信息、素材版本和发布节点。</p>
        <p><a href="#/case/gtm/english-brief">查看社媒英文物料 Brief ↗</a> · <a href="#/case/operations/asset-review">查看内容排期与制作交接 ↗</a></p>
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
        <p>五月计划以社媒内容为主，列出 Brief、视觉与视频制作、审核、计划发布及复盘节点。Paid、PR、Creator 和 EDM 只展示需要配合的素材和时间，不代表由我负责投放或商业审批。</p>
        <section class="v-release-gantt" id="gtm-visual-schedule" aria-labelledby="v-release-heading">
          <header class="v-release-heading"><div><span>MARKETING DELIVERY / MAY 2026</span><h4 id="v-release-heading">2026 年 5 月｜M3 上市传播排期</h4></div><p>按周安排内容策划、KV 与视频制作、渠道素材准备和发布审核。可筛选社媒主责、渠道协同与业务支持。</p></header>
          <div class="v-gantt-legend" aria-label="排期图说明"><span><i class="v-legend-plan"></i>策略 / Brief</span><span><i class="v-legend-produce"></i>制作 / 准备</span><span><i class="v-legend-launch"></i>渠道放行</span><span><i class="v-legend-learn"></i>运营 / 复盘</span></div>
          <div class="v-gantt-filters" role="group" aria-label="按协作职责筛选传播工作流">
            <button type="button" data-gtm-focus="all" aria-controls="v-gantt-rows" aria-pressed="true">全部工作流 <b>6</b></button>
            <button type="button" data-gtm-focus="lead" aria-controls="v-gantt-rows" aria-pressed="false">内容主责 <b>1</b></button>
            <button type="button" data-gtm-focus="partner" aria-controls="v-gantt-rows" aria-pressed="false">渠道协同 <b>3</b></button>
            <button type="button" data-gtm-focus="support" aria-controls="v-gantt-rows" aria-pressed="false">其他部门接口 <b>2</b></button>
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
      <section class="m3-kv-showcase" id="m3-campaign-kv" aria-labelledby="m3-kv-heading">
        <header><small>CAMPAIGN VISUAL / MAY 2026</small><h3 id="m3-kv-heading">M3 Campaign KV｜主视觉与渠道适配</h3><p>官方黄色 M3 产品图、品牌色和两套传播主张，分别用于横版传播与社媒 Feed。</p></header>
        <div class="m3-kv-comps">
          <figure class="m3-kv-landscape">
            <div class="m3-kv-copy"><small>M3 / PRODUCT MARKETING</small><h4>From grip<br>to floor.</h4><p>Dual-head electric mop.<br>D-shaped handle.</p><span>POWER EVERY MOVE.</span></div>
            <img src="assets/projects/m3-yellow-main.webp" alt="黄色 M3 双盘电动拖把官方产品图，包含手柄与双盘结构" loading="lazy" decoding="async">
            <figcaption>16:9 / Campaign KV</figcaption>
          </figure>
          <figure class="m3-kv-feed">
            <div class="m3-kv-copy"><small>M3 / BRAND CAMPAIGN</small><h4>Make Room for<br>What Matters.</h4><p>Meet M3.</p></div>
            <img src="assets/projects/m3-yellow-main.webp" alt="黄色 M3 产品主视觉用于社媒 Feed 版式" loading="lazy" decoding="async">
            <figcaption>4:5 / Social Feed</figcaption>
          </figure>
        </div>
        <p class="m3-kv-footer"><a href="#/case/operations/asset-review">查看 M3 KV 修改与审核过程 ↗</a></p>
      </section>
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
          <header><span class="v-section-kicker">CONTENT SYSTEM</span><h4 id="v-content-heading">七类核心内容与一项品牌组合补充内容</h4></header>
          <div class="v-content-matrix" aria-label="七类核心内容、一项辅助内容与四个传播阶段的对应关系">
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
      <section class="g-module g-project v-localization" id="market-adaptation" aria-labelledby="market-adaptation-heading">
        <header><span class="v-section-kicker">LOCAL MARKET ADAPTATION</span><h2 id="market-adaptation-heading">美英市场传播内容适配</h2><p>产品信息保持一致，美国与英国分别校对内容用词、场景和发布渠道。</p></header>
        <div class="v-localization-common"><small>M3 / 市场文案对照</small><h3 lang="en">POWER EVERY MOVE.</h3><p lang="en">MAKE ROOM FOR WHAT MATTERS.</p><span>共享产品原图、场景主题与视觉识别</span></div>
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
  <div class="locale-decision-head"><small>REGIONAL GO-TO-MARKET / LOCAL PLAYBOOK</small><h3 id="locale-decision-matrix-heading">美英市场内容与发布检查</h3></div>
  <div class="locale-matrix-grid" role="group" aria-label="美英两市场共同的本地化决策维度">
    <article><span>01 / LANGUAGE</span><b>场景与类别词汇</b><p><strong>US</strong> entryway / cleanup / Mom</p><p><strong>UK</strong> hallway / clean-up / Mum</p></article>
    <article><span>02 / MESSAGE & PROOF</span><b>信息与产品证明</b><p>共享已核对的产品结构、核心价值和连续演示。</p><p>按地区重写 Hook、字幕、FAQ 与购买顾虑表达。</p></article>
    <article><span>03 / CHANNEL ROLE</span><b>传播路径与媒体接口</b><p>社媒与 Creator 负责场景教育，搜索回答高意图问题。</p><p>区域渠道投入依据当地触点表现和可执行资源确定。</p></article>
    <article><span>04 / COMMERCIAL READINESS</span><b>素材与链接发布前核对</b><p>内容组确认产品版本、CTA 和渠道链接；价格、库存与履约条件由相应业务团队核验。</p><p>发布后分别查看两地内容互动、有效访问与实际用户问题。</p></article>
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
      <section class="g-story-note" id="social-creative-editorial">
        <h3>社媒内容策略与创意制作</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>TOPICS</small><h4>主题与内容支柱</h4><p>结合季度主题、节庆活动、产品重点和评论区问题，安排产品演示、家庭清洁、教程 FAQ、互动和 UGC 栏目，并落实到月度日历。</p></article>
          <article><small>CREATIVE HOOK</small><h4>开场与视觉创意</h4><p>根据内容任务选择 POV、Before/After、产品细节、LED 显尘和家庭清洁突发场景；审核画面中的产品结构、操作动作与字幕。</p></article>
          <article><small>PLATFORMS</small><h4>平台与内容形式</h4><p>Facebook 以品牌信息与导流为主，Instagram 用视觉演示和 Reels 组织关注，Group 以教程、讨论和反馈推进参与。</p></article>
          <article><small>OPTIMIZATION</small><h4>内容效果与选题调整</h4><p>分别观察内容展示、互动、点击和社群提问；把高频问题、有效 Hook 与需要调整的画面写入次月 Brief。</p></article>
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
        <p>新闻稿经 King Newswire 分发，刊载于 USA Today 的 Press Release 栏目。</p>
        
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

  function promotionCreative() {
    return section("节庆促销 Campaign KV｜三组视觉方案", "Black Friday · Mother's Day · Father's Day", `
      <section class="promotion-campaign-editorial" id="promotion-kv-gallery" aria-labelledby="promotion-kv-heading">
        <header class="promotion-kv-header">
          <div><small>SEASONAL CREATIVE / MARKETING KV</small><h3 id="promotion-kv-heading">节庆促销视觉设计</h3>
          <p>黑五聚焦节日采购与家居焕新；母亲节以日常关怀进入礼赠场景；父亲节结合家人关系与产品使用。视觉取自项目既有产品和生活场景素材。</p></div>
          <span class="promo-visual-status">CREATIVE STUDIES / PORTFOLIO</span>
        </header>
        <div class="promotion-format-switch" role="group" aria-label="切换促销主视觉画幅">
          <span>画幅预览</span>
          <button type="button" data-promo-ratio="feed" aria-pressed="true">Feed · 4:5</button>
          <button type="button" data-promo-ratio="story" aria-pressed="false">Story · 9:16</button>
          <button type="button" data-promo-ratio="hero" aria-pressed="false">Hero · 16:9</button>
        </div>
        <div class="promotion-kv-grid" data-promo-layout="feed">
          <figure class="promotion-kv-card promotion-kv-black" id="promotion-kv-black">
            <div class="promotion-kv-art promotion-kv-black-art" role="img" aria-label="黑五节庆主题 KV，清洁产品照片与英文活动文案">
              <img class="promo-kv-scene" src="assets/projects/mop-kv-detail.webp" alt="清洁工具产品细节素材" loading="lazy" decoding="async">
              <span class="promo-kv-overlay" aria-hidden="true"></span><span class="promo-kv-ornament" aria-hidden="true"></span>
              <div class="promo-kv-content" lang="en"><div class="promo-kv-edition"><span>HOLIDAY / 01</span><span>HOME CARE EDITION</span></div>
                <div class="promo-kv-main"><small>BLACK FRIDAY / SEASONAL CAMPAIGN</small><strong><span>MAKE ROOM</span><span>FOR WHAT</span><span>MATTERS.</span></strong><p>Everyday cleaning. Thoughtful choices.</p></div>
                <div class="promo-kv-action"><span>EXPLORE THE COLLECTION</span><i aria-hidden="true">↗</i></div>
              </div>
            </div>
            <figcaption><small>THE HOLIDAY HOME EDIT</small><h4>Black Friday｜节日采购</h4><p>用家居焕新与产品价值组织主视觉、品类组合及选购入口。优惠数字留给实际审批后的版本。</p><div class="promo-kv-tags">Facebook / Landing / EDM</div></figcaption>
          </figure>
          <figure class="promotion-kv-card promotion-kv-mother" id="promotion-kv-mother">
            <div class="promotion-kv-art promotion-kv-mother-art" role="img" aria-label="母亲节礼赠主题 KV，家庭场景照片和英文主张">
              <img class="promo-kv-scene" src="assets/projects/pr-home-scene.webp" alt="既有家居清洁家庭场景素材" loading="lazy" decoding="async">
              <span class="promo-kv-overlay" aria-hidden="true"></span><span class="promo-kv-ornament" aria-hidden="true"></span>
              <div class="promo-kv-content" lang="en"><div class="promo-kv-edition"><span>HOLIDAY / 02</span><span>HOME CARE EDITION</span></div>
                <div class="promo-kv-main"><small>MOTHER'S DAY / GIFT CAMPAIGN</small><strong><span>A LITTLE</span><span>CARE GOES</span><span>A LONG WAY.</span></strong><p>For all the moments that matter.</p></div>
                <div class="promo-kv-action"><span>DISCOVER GIFT IDEAS</span><i aria-hidden="true">↗</i></div>
              </div>
            </div>
            <figcaption><small>GIFT OF EVERYDAY CARE</small><h4>Mother's Day｜家庭礼赠</h4><p>以关怀与家庭场景承接礼赠需求，关联英文邮件主题、内容轮播与产品使用教育。</p><div class="promo-kv-tags">Instagram / Facebook / EDM</div></figcaption>
          </figure>
          <figure class="promotion-kv-card promotion-kv-father" id="promotion-kv-father">
            <div class="promotion-kv-art promotion-kv-father-art" role="img" aria-label="父亲节家庭主题 KV，清洁产品使用画面与英文主张">
              <img class="promo-kv-scene" src="assets/projects/vacuum-video-frame.webp" alt="已收录清洁产品操作视频的画面" loading="lazy" decoding="async">
              <span class="promo-kv-overlay" aria-hidden="true"></span><span class="promo-kv-ornament" aria-hidden="true"></span>
              <div class="promo-kv-content" lang="en"><div class="promo-kv-edition"><span>HOLIDAY / 03</span><span>HOME CARE EDITION</span></div>
                <div class="promo-kv-main"><small>FATHER'S DAY / FAMILY CAMPAIGN</small><strong><span>FOR THE</span><span>HANDS THAT</span><span>ALWAYS HELP.</span></strong><p>Make everyday moments count.</p></div>
                <div class="promo-kv-action"><span>SEE GIFT IDEAS</span><i aria-hidden="true">↗</i></div>
              </div>
            </div>
            <figcaption><small>THOUGHTFUL GIFTS FOR DAD</small><h4>Father's Day｜家人关怀</h4><p>借助产品演示画面和人物关系建立主题，延伸到 Reels、社群讨论与父亲节内容日历。</p><div class="promo-kv-tags">Facebook / Reels / Group</div></figcaption>
          </figure>
        </div>
      </section>
      <section class="promotion-channel-showcase" id="promotion-channel-adaptations" aria-labelledby="promo-channel-heading">
        <header><small>CAMPAIGN APPLICATION / CHANNEL VERSIONS</small><h3 id="promo-channel-heading">视觉怎样延伸到不同渠道</h3><p>将同一主题按平台版位调整开场信息、场景比例、产品解释和行动入口。</p></header>
        <div class="promotion-channel-mockups">
          <article class="promo-device-preview">
            <div class="promo-preview-label">FACEBOOK / INSTAGRAM FEED</div>
            <div class="promo-social-mock">
              <div class="promo-social-bar"><span class="promo-avatar" aria-hidden="true"></span><span>HOME CARE<small>Seasonal Campaign</small></span><span aria-hidden="true">···</span></div>
              <div class="promo-social-photo"><img src="assets/projects/mop-kv-detail.webp" alt="用于社媒内容预览的产品场景" loading="lazy"><strong>THE HOLIDAY<br>HOME EDIT</strong></div>
              <div class="promo-social-caption"><span aria-hidden="true">♡　↗　▣</span><p>Scene → benefit → next step</p></div>
            </div>
            <h4>Social Feed / Reels</h4><p>从家庭清洁场景或一个具体问题进入，重点呈现产品动作和核心利益。</p>
          </article>
          <article class="promo-device-preview">
            <div class="promo-preview-label">LIFECYCLE / EDM</div>
            <div class="promo-email-mock">
              <div class="promo-email-chrome"><span>To: subscribers</span><span>Subject: A little extra care</span></div>
              <div class="promo-email-heading"><small>MOTHER'S DAY</small><strong>A LITTLE CARE<br>GOES A LONG WAY.</strong></div>
              <img src="assets/projects/pr-home-scene.webp" alt="用于邮件首屏预览的家庭场景" loading="lazy">
              <div class="promo-email-bottom"><span>GIFT IDEAS</span><i>View the collection</i></div>
            </div>
            <h4>EDM / Email</h4><p>礼赠主题与邮件标题、主视觉、产品内容和 CTA 保持一致，按受众和发送节奏组织。</p>
          </article>
          <article class="promo-device-preview">
            <div class="promo-preview-label">CAMPAIGN / LANDING PAGE</div>
            <div class="promo-landing-mock">
              <div class="promo-landing-nav"><span>HOME CARE</span><span>Explore　 ·　 About</span></div>
              <div class="promo-landing-hero"><div><small>SEASONAL CAMPAIGN</small><strong>FOR THE HANDS<br>THAT ALWAYS HELP.</strong><span>EXPLORE GIFT IDEAS →</span></div>
                <img src="assets/projects/vacuum-video-frame.webp" alt="用于活动页面预览的清洁工具使用场景" loading="lazy"></div>
              <div class="promo-landing-trail" aria-hidden="true"><span></span><span></span><span></span></div>
            </div>
            <h4>Landing Page</h4><p>首屏解释节庆主题与用户价值，实际销售页面再承接产品信息和活动细则。</p>
          </article>
        </div>
      </section>
      <div class="g-story-note" id="promotion-campaign-matrix">
        <h3>活动内容与传播角色</h3>
        <div class="operations-table-scroll"><table class="operations-sample-table"><thead><tr><th>节点</th><th>人群与创意</th><th>内容重点</th><th>渠道任务</th></tr></thead><tbody>
          <tr><td>Black Friday</td><td>家庭采购与产品比较</td><td>品类组合、使用场景、确认后的活动规则</td><td>Social / Paid / EDM / Landing</td></tr>
          <tr><td>Mother's Day</td><td>家庭礼赠与日常关怀</td><td>情感主题、生活场景、礼赠选择</td><td>Social / Email / Product</td></tr>
          <tr><td>Father's Day</td><td>父亲节礼赠与家庭互动</td><td>人物故事、产品动作、社群参与</td><td>Feed / Reels / Facebook Group</td></tr>
        </tbody></table></div>
        <p><a href="#/case/social/fathers-day-calendar">父亲节内容日历 ↗</a> · <a href="#/case/crm/crm-campaign-email-plan">母亲节 EDM 策划 ↗</a> · <a href="#/case/gtm/campaign-architecture">IMC / Campaign 策略 ↗</a></p>
      </div>
    `, "promotion-campaign-kv");
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
    return section("视频创意策划与渠道内容", "围绕节庆情绪、产品演示和 Creator 真实使用内容安排创意与镜头任务。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><small>THANKSGIVING / TVC</small><h3>以团聚和感谢进入产品故事</h3><p>感恩节餐桌、火鸡与人物互动先建立节庆情境，随后进入家人照料和地面清洁。情绪故事与双盘功能展示交替推进，让产品出现在实际生活问题中。</p></article>
        <article><small>CHRISTMAS / TVC</small><h3>让日常家务成为关怀的表达</h3><p>圣诞夜的家庭空间、长者整理地面和家人团聚形成完整故事。产品结构和操作镜头为人物动作服务，最后以家庭关系收束品牌情绪。</p></article>
        <article><small>KOL / CREATOR</small><h3>用竖屏场景回答具体使用问题</h3><p>楼梯吸尘素材聚焦吸头接触、握持、移动方向与开场节奏。与完整 TVC 不同，这类内容优先让观众看清产品如何使用。</p></article>
      </div>
      <div class="g-story-note" id="video-channel-plan">
        <h3>将 Campaign 主题拆成不同的传播内容</h3>
        <ul>
          <li><strong>品牌 TVC：</strong>保留感恩节或圣诞节的完整人物故事、节庆识别与产品进入情节的过程，用于集中解释品牌价值与情绪主张。</li>
          <li><strong>短视频与渠道版本：</strong>按 Feed、Reels 和视频广告等版位调整开场、画面比例、字幕、产品证明与行动信息，保留已确认的产品事实。</li>
          <li><strong>KOL / Creator：</strong>把真实使用问题交给人物演示；先拍清接触位置与动作，再按渠道要求确定时长、画幅和说明重点。</li>
          <li><strong>后续优化：</strong>分别观察完整观看、动作片段观看和用户问题，调整剪辑、产品解释或 FAQ，而非用一项数据评价所有视频。</li>
        </ul>
        <p><a href="#/case/creative/video-projects">查看节庆品牌片与 Creator 内容案例 ↗</a> · <a href="#/case/gtm/campaign-architecture">查看 IMC / Campaign 渠道角色 ↗</a></p>
      </div>`, "video-strategy");
  }

  function creative() {
    return section("视频创意与 Campaign 内容案例", "展示部分节庆品牌影片与 Creator 产品演示，说明创意方向、脚本、镜头审核和渠道适配工作。", `
      <section class="tvc-creative-intro" id="video-campaign-showcase">
        <span>SEASONAL CAMPAIGN / TVC & CREATOR CONTENT</span>
        <h3>节庆品牌叙事与产品演示</h3>
        <p>感恩节关注团聚之后的照料与陪伴，圣诞节关注家人之间默默付出的日常行动。节庆影片将产品作用融入人物关系和家庭情境。KOL / Creator 内容分别展示楼梯踏面清洁与客厅中的产品介绍，画面和传播任务不重复。</p>
      </section>
      <div class="tvc-work-grid" aria-label="节庆 Campaign 视频案例">
        <article class="tvc-work-card" id="thanksgiving-tvc" aria-labelledby="thanksgiving-heading">
          <div class="tvc-work-heading"><small>01 / THANKSGIVING · SEASONAL TVC</small><h3 id="thanksgiving-heading">感恩节｜感谢藏在日常照料里</h3><p>节日餐桌、火鸡和家人之间的互动建立节庆氛围；地面清洁成为人物彼此照顾的动作，随后进入双盘清洁工具的使用与功能演示。</p></div>
          <div class="tvc-work-player" id="video-drive-editions">
            <iframe loading="lazy" title="播放感恩节主题 TVC 作品片段" src="https://drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/preview" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
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
            <iframe loading="lazy" title="播放圣诞节主题 TVC 作品片段" src="https://drive.google.com/file/d/15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/preview" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
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
        <header><small>CAMPAIGN → STORY → CHANNEL</small><h3>从节庆主题，到可用于渠道传播的创意内容</h3><p>节庆影片的任务是情绪联结与产品价值沟通；短视频与商品内容进一步解释使用方式。Campaign 中的素材分工围绕同一产品信息展开。</p></header>
        <div class="tvc-campaign-bridge-grid">
          <article><span>BRAND / TVC</span><h4>情绪与记忆</h4><p>感恩节围绕感谢与相聚，圣诞节围绕日常关怀。让人物和产品动作在故事中发生联系。</p></article>
          <article><span>SOCIAL / PAID CREATIVE</span><h4>节奏与创意适配</h4><p>从完整故事中选取场景、人物和产品镜头，分别适配 Feed、Reels、视频广告等渠道的信息顺序。</p></article>
          <article><span>KOL / CREATOR</span><h4>使用体验与产品教育</h4><p>楼梯清洁审核吸头接触与行进路径，客厅介绍审核人物讲解、产品识别与握持展示；不同版本按平台和任务分别剪辑。</p></article>
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
        <header><small>CREATOR / KOL-STYLE SHORT VIDEO</small><h3>Creator 产品演示与短视频内容</h3><p>案例选取的 Creator 竖屏片段分别展示楼梯清洁和客厅产品介绍：前者展示动作与接触面，后者由人物面对镜头介绍产品。不同的空间和镜头任务放在一起，便于看出内容策略差异。</p></header>
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
        <h3>不同视频形式对应不同的传播任务</h3>
        <div class="g-video-decision-grid">
          <article><small>感恩节 / TVC</small><h4>从团聚进入产品价值</h4><p>火鸡餐桌、生活问题、家人照料与双盘清洁演示组合成情绪和功能都能被理解的品牌内容。</p></article>
          <article><small>圣诞节 / TVC</small><h4>用清洁动作讲关怀</h4><p>圣诞家庭布置、年长者整理地面和家人团聚形成完整叙事，产品是人物关系中的行动。</p></article>
          <article><small>KOL / Creator</small><h4>让用户看见具体怎么用</h4><p>楼梯演示看实际吸头路径，客厅介绍看人物展示和产品认知。两种不同内容场景分别对应操作教育与新品介绍。</p></article>
        </div>
      </div>
      <section class="g-story-note" id="creative-production-scope">
        <h3>视频与社媒创意的实际工作范围</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>CAMPAIGN CREATIVE</small><h4>节庆与日常主题创意</h4><p>结合用户清洁任务、节日情境和品牌主张确定创意主题，组织故事提案、场景选择和视觉风格，不以目前上传的样片数量代表所有项目。</p></article>
          <article><small>VIDEO BRIEF</small><h4>脚本、分镜与产品演示</h4><p>拆解视频开场、冲突、解决过程和结尾信息；明确产品需要拍到的接触表面、握持、移动方向及连续动作，逐项审核脚本和成片。</p></article>
          <article><small>SOCIAL FORMAT</small><h4>社媒短片与视觉表达</h4><p>根据 Feed、Reels、Story 的阅读方式调整 Hook、字幕、画幅和剪辑节奏；组合 POV、Before/After、产品特写和场景教育内容。</p></article>
          <article><small>CREATOR REVIEW</small><h4>创作者内容与素材验收</h4><p>在合作 Brief 中说明受众、演示任务、产品事实和披露要求，审阅初稿、修改版本及素材使用范围。</p></article>
        </div>
      </section>
      <div class="g-story-note" id="video-management">
        <h3>我的创意参与与项目交付</h3>
        <p>依据 Campaign 目标和受众场景提出创意方向，完成脚本修改、镜头要求及内容审核；制作过程中核对产品结构、真实操作、字幕与画幅，分别准备不同平台的发布版本。</p>
        <p>当前影片与 Creator 片段只作案例节选，不代表历年视频产量。工作内容还包括 Campaign 创意主题、社媒短视频选题、内容 Hook、分镜脚本、人物与产品动作审核、成片修改及不同平台的内容适配。</p>
        <p><a href="#/case/creative/video-strategy">查看视频创意判断 ↗</a> · <a href="#/case/gtm/campaign-architecture">查看 Campaign 协同 ↗</a></p>
      </div>`, "video-projects");
  }

  function expo() {
    return section("海外展会｜展位策划与现场营销", "储能行业海外展会 · 展位规划、物料准备、现场接待与客户跟进", `
      <div class="expo-scope-banner actual" id="expo-real-work"><span>OVERSEAS B2B / EXHIBITION PROJECT</span><h3>海外储能行业展会</h3></div>
      <div class="expo-cover" id="expo-cover">
        <figure>${image("exhibition-booth-overview-redacted","海外储能展会展位实景，品牌信息已匿名化","jpg")}<figcaption>海外储能行业展会现场 · 已匿名化</figcaption></figure>
        <div class="expo-cover-story">
          <small>EXHIBITION MARKETING / B2B</small>
          <h3>展位策划、物料准备与现场客户沟通</h3>
          <p>工作覆盖展位规划、展示内容、展墙与产品资料、物料制作协调、现场客户接待和展后需求跟进。展墙、产品陈列与技术资料围绕储能系统组成和实际应用组织，方便销售与技术同事向客户介绍方案。</p>
          <div class="expo-cover-tags"><span>展位策划</span><span>展会物料</span><span>现场执行</span><span>客户需求</span></div>
          <p><a href="#/case/b2b/expo-visitor-route">查看参展项目工作 ↗</a></p>
        </div>
      </div>
      <section class="expo-story" id="expo-visitor-route" aria-labelledby="expo-visitor-title">
        <header><small>PROJECT RESPONSIBILITIES</small><h3 id="expo-visitor-title">展前筹备、现场执行与会后跟进</h3><p>参与展前策划、展位物料准备与布展协调，并负责现场客户需求沟通与后续跟进。</p></header>
        <div class="expo-visitor-map">
          <article><span>01 / 展前</span><h4>展位策划</h4><p>参与展区规划、展示主题与产品陈列安排，整理展墙信息、主视觉和现场展示需求。</p></article>
          <article><span>02 / 物料</span><h4>视觉与产品资料</h4><p>准备画册、产品介绍、系统图及现场宣传内容，和产品同事核对专业信息，跟进制作及到场安排。</p></article>
          <article><span>03 / 展中</span><h4>客户接待与需求沟通</h4><p>围绕客户行业、应用场景、采购需求与合作方式介绍产品；技术细节交由专业人员确认。</p></article>
          <article><span>04 / 展后</span><h4>商机记录与跟进</h4><p>整理客户关注的配置、采购计划、报价和交付问题，与销售对接后续商务沟通。</p></article>
        </div>
      </section>
      <div class="g-product-gallery expo-gallery" aria-label="海外展会现场照片">
        <figure>${image("exhibition-booth-angle-redacted","展会现场展墙与展品陈列，已匿名化","jpg")}<figcaption><b>展位与视觉</b><span>展墙内容、入口及设备陈列</span></figcaption></figure>
        <figure>${image("exhibition-product-display-redacted","现场储能设备与系统展示，已匿名化","jpg")}<figcaption><b>产品与方案介绍</b><span>实物展示、系统组成与产品资料</span></figcaption></figure>
      </div>
      <section class="expo-brand-system" id="expo-brand-activation">
        <div class="expo-system-header"><small>BOOTH / BRANDING</small><h3>展位规划与现场品牌呈现</h3><p>从实际展品、客户需求和会场条件确定展示内容，展墙与印刷品使用一致的品牌识别和产品说法。</p></div>
        <div class="expo-workstream" aria-label="展位策划工作内容">
          <article><span>01</span><b>空间与展品</b><small>入口、展示区、设备陈列与接待区</small></article>
          <article><span>02</span><b>品牌视觉</b><small>展墙、主画面、导视与信息层级</small></article>
          <article><span>03</span><b>物料制作</b><small>画册、产品页、系统图与展示资料</small></article>
          <article><span>04</span><b>现场安排</b><small>接待、产品讲解、物料与问题记录</small></article>
        </div>
        <section class="expo-identity-editorial" id="expo-visual-language">
          <header><small>COLLATERAL / BRAND COMMUNICATION</small><h4>展会品牌物料与沟通内容</h4><p>围绕系统方案与采购问题准备材料，兼顾现场观看和客户带走后的阅读。</p></header>
          <div class="expo-identity-grid">
            <article class="expo-identity-hierarchy"><small>BOOTH GRAPHICS</small><h4>展墙与品牌画面</h4><p>品牌名称、业务领域、主要产品线与应用场景；主视觉突出行业识别，展示内容与实际展品一致。</p></article>
            <article class="expo-identity-collateral"><small>PRODUCT MATERIALS</small><h4>画册与产品资料</h4><p>Brochure、产品型录、系统组成图和技术参数页；型号、接口与适用范围由产品团队核实。</p></article>
            <article class="expo-identity-collateral"><small>EVENT COMMUNICATION</small><h4>展前与展后传播</h4><p>展前邀请、展会信息、现场活动照片与后续资料邮件；与客户沟通使用适合的版本。</p>
              <div class="expo-brand-touch"><div><b>BEFORE</b><span>邀请与展会信息</span></div><div><b>ONSITE</b><span>讲解与资料取用</span></div><div><b>AFTER</b><span>跟进与产品介绍</span></div></div>
            </article>
          </div>
        </section>
      </section>
      <section class="expo-asset-studio" id="expo-asset-manifest">
        <header><small>EXHIBITION MATERIALS</small><h3>展会物料准备</h3><p>按现场使用位置整理物料，提前核对内容、印刷尺寸与交付时间；不以未核实的数量或尺寸代替实际工作。</p></header>
        <div class="expo-asset-grid">
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>BRANDING</small><h4>背景墙与品牌画面</h4><p>品牌识别、主营业务、产品与应用主题。</p></div></article>
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>CATALOGUE</small><h4>产品画册与宣传页</h4><p>产品系列、用途、图片及核心信息。</p></div></article>
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>TECHNICAL</small><h4>系统图与参数资料</h4><p>技术同事确认设备组成及专业表述。</p></div></article>
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>ONSITE</small><h4>展品与展示说明</h4><p>样品、演示资料、展签与现场放置。</p></div></article>
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>OUTREACH</small><h4>展前邀请与活动信息</h4><p>面向客户的沟通内容和展会时间地点信息。</p></div></article>
          <article class="expo-asset-card"><div class="expo-asset-meta"><small>FOLLOW-UP</small><h4>客户资料与跟进内容</h4><p>产品方案、问题记录与商务联系资料。</p></div></article>
        </div>
      </section>
      <section class="expo-activation-lab" id="expo-activation-program">
        <header><small>ON-SITE EXECUTION</small><h3>现场工作与客户沟通</h3><p>销售、市场和产品人员围绕同一套展品资料进行客户沟通。</p></header>
        <div class="expo-activation-grid">
          <article><span>01 / SETUP</span><h4>现场布置与物料检查</h4><p>核对展品、展墙信息、画册、导视及现场可用资料，跟进临时调整。</p><strong>展位图 · 物料清单 · 现场照片</strong></article>
          <article><span>02 / CUSTOMER</span><h4>客户需求记录</h4><p>记录应用场景、采购数量、合作类型、交付时间等关键信息，后续由商务核实。</p><strong>需求记录 · 商务跟进</strong></article>
          <article><span>03 / CONTENT</span><h4>展会内容整理</h4><p>在允许的范围内整理现场展示照片、产品介绍与客户高频问题，用于后续品牌和销售内容。</p><strong>现场素材 · 常见问题 · 产品资料</strong></article>
        </div>
        <div class="expo-activation-rhythm">
          <div><small>展前策划</small><b>展位规划、主视觉、展品与目标客户</b></div>
          <div><small>展前准备</small><b>画册资料、制作排期、印刷和物流确认</b></div>
          <div><small>展会现场</small><b>布置检查、接待与产品说明</b></div>
          <div><small>展后工作</small><b>线索整理、需求跟进与资料更新</b></div>
        </div>
      </section>
      <section class="expo-program" id="expo-event-plan">
        <header><small>EVENT DELIVERY</small><h3>参展工作排期</h3></header>
        <div class="expo-campaign-flight">
          <article class="expo-flight-card"><span>BEFORE</span><h4>展前</h4><p>确定产品展示重点、展位与物料需求，推进视觉设计、印刷制作、客户邀约和现场准备。</p></article>
          <article class="expo-flight-card"><span>ONSITE</span><h4>展中</h4><p>检查布展、展示资料和人员安排，配合产品介绍、媒体素材记录与客户需求整理。</p></article>
          <article class="expo-flight-card"><span>AFTER</span><h4>展后</h4><p>整理潜在客户的合作类型、应用场景与未解决问题，衔接商务跟进和内容更新。</p></article>
        </div>
      </section>
      <section class="g-story-note" id="expo-material-delivery">
        <h3>展位和物料准备的具体职责</h3>
        <div class="g-project-list g-project-calendar-plan">
          <article><small>BOOTH PLAN</small><h4>展位规划与陈列内容</h4><p>结合参展产品与潜在客户类型安排展区重点，确认品牌展示、产品陈列和现场讲解所需信息。</p></article>
          <article><small>BRAND MATERIALS</small><h4>展墙、画册与系统资料</h4><p>准备展墙内容、品牌视觉、产品介绍、系统示意和现场宣传资料，核对技术信息、设计版本及物料交付。</p></article>
          <article><small>ON-SITE EXECUTION</small><h4>布展检查与现场传播</h4><p>配合现场布置、产品展示、拍摄与介绍材料使用，及时补充客户重点关注的产品说明。</p></article>
          <article><small>LEAD FOLLOW-UP</small><h4>客户需求记录与商务交接</h4><p>记录目标客户的应用场景、采购方向、系统配置疑问和后续资料需求，协同销售与产品同事推进报价和沟通。</p></article>
        </div>
      </section>
      <div class="g-story-note" id="expo-handoff">
        <h3>现场反馈如何用于后续销售资料</h3>
        <p>展会期间收集客户对产品配置、技术适配与合作条件的疑问，反馈给销售与产品团队；后续更新客户所需的产品资料及商务沟通内容。</p>
      </div>
      <section class="g-story-note b2b-compare" id="b2b-scale-comparison">
        <h3>同期海外客户开发与渠道推广</h3>
        <p>任职期间也通过 Google、LinkedIn、Facebook、Instagram 与邮件开展海外客户开发。以下指标为整体渠道工作记录，不单独归因于本次展会。</p>
        <div class="expo-results">
          <article><span>月均潜在客户触达</span><strong>100+</strong><small>海外 B2B 客户开发阶段数据</small></article>
          <article><span>Facebook 账号粉丝规模</span><strong>400+ → 1,900+</strong><small>任职期间渠道账号记录</small></article>
        </div><p><a href="#/data/b2b">查看 B2B 项目结果 ↗</a></p>
      </section>
    `, "expo-project");
  }

  function creator() {
    return section("Creator / KOL｜合作策略、创意制作与素材管理", "创作者筛选、英文邀约、合作谈判、产品演示与授权", `
      <section class="g-story-note" id="creator-assessment"><h3>创作者筛选维度</h3><div class="creator-assessment-grid"><article><small>AUDIENCE</small><h4>受众与市场</h4><p>国家、语言、品类兴趣、粉丝质量与受众相关性</p></article><article><small>CREATIVE</small><h4>内容与演示</h4><p>过往视频结构、讲解能力、产品真实使用与内容稳定度</p></article><article><small>COMMERCIAL</small><h4>合作条件</h4><p>邀约报价、寄样、交付形式、返修与付款条件</p></article><article><small>RIGHTS</small><h4>素材使用</h4><p>自然发布、品牌转发、二次剪辑、广告授权与期限</p></article></div></section><div class="g-project-list g-project-calendar-plan">
        <article><h3>选题和交付先写进 Brief</h3><p>按目标市场、受众和内容风格筛选创作者。Brief 写清产品事实、演示任务、交付形式和审核责任，供内容审核时逐项核对。</p></article>
        <article><h3>报价、交付和付款逐项核对</h3><p>演示邮件将报价、交付、付款放入待确认清单。负责人查原邮件，确认条款后再审核对应回复草稿。</p></article>
        <article><h3>授权用途分开管理</h3><p>合作内容的品牌转发、剪辑和付费广告需要分别明确可使用的平台、地域、期限与用途；内容审核与商业授权同步交接。</p></article>
        <article><h3>交付审核对应具体版本</h3><p>逐条核对产品事实、合作披露和修订意见。通过审核的内容版本与对应授权一起留档，方便后续查找和复用。</p></article>
      </div>
      <section class="g-story-note" id="creator-cooperation-brief">
        <h3>英文合作 Brief｜产品体验内容</h3>
        <div class="operations-brief-sheet">
          <div><span>合作目标</span><strong>产品教育 / 品牌认知 / 真实体验</strong></div>
          <div><span>内容方向</span><strong>家庭场景、产品动作、使用问题和创作者真实表达</strong></div>
          <div><span>审核重点</span><strong>产品结构、适用条件、字幕、品牌信息与商业披露</strong></div>
          <div><span>商业与交付</span><strong>寄样、稿期、修改、付款与取消约定</strong></div>
          <div><span>资产版本</span><strong>原始成片、审核版本、约定可二次使用的素材</strong></div>
          <div><span>权限记录</span><strong>发布平台、剪辑范围、广告使用、地域及期限</strong></div>
        </div>
        <p><a href="#/case/creative/video-projects">查看 Creator 实拍视频案例 ↗</a> · <a href="#/case/gtm/english-brief">英文内容 Brief ↗</a></p>
      </section>
      <section class="g-story-note" id="creator-performance">
        <h3>合作表现与后续合作判断</h3>
        <p>围绕合作任务分别评估受众契合度、内容交付质量、演示清晰度、互动中的真实问题与素材可复用性；带链接的合作另看有效点击、站点行为及订单信息。结合报价、修改和授权条件决定后续是否合作。</p>
      </section>
      <div class="g-story-note" id="partner-handoff">
        <h3>外部创作者从 Brief 到交付</h3>
        <p>合作交付：邀约时确认寄样、脚本初稿与成片日期。首稿审核看开场能否交代使用场景、动作能否支持主张，以及合作披露是否清楚。把返修意见标到对应版本和时间点。</p>
        <p>验收时将成片与书面使用许可一起归档，注明渠道、地域、期限、剪辑与付费使用范围，供后续复用时核查。</p>
        <p><a href="#/case/gtm/english-brief">查看一份英文制作 Brief ↗</a> · <a href="#/case/creative/video-projects">查看接触面与操作路径的镜头样例 ↗</a></p>
      </div>
      <p class="g-chart-note">Creator 合作｜筛选、邀约、议价、寄样、脚本审核、发布与素材授权</p>`, "creator-project");
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
        <h3>Halloween 内容如何连接搜索与站内页面</h3>
        <p>以万圣节节后清洁为选题，按地面污渍、浴室、厨房、宠物毛发与工具比较拆分英文专题。主指南汇总任务，细分文章回答不同搜索问题，FAQ 与商品内容进一步解释使用条件和工具选择；稿件按原有策划目录展示。</p>
        <p><a href="#/case/social/execution">查看节庆主题如何拆成社媒内容 ↗</a> · <a href="#/data/search">查看现有搜索数据口径 ↗</a></p>
      </div>
      <div class="g-project-list g-project-calendar-plan" id="seo-search-optimization">
        <article><small>KEYWORD / INTENT</small><h3>关键词与搜索意图分组</h3><p>按 Halloween 污渍类型、清洁表面、使用场景和产品比较分组关键词，分别识别教程型、选型型需求，避免同类文章重复覆盖同一查询。</p></article>
        <article><small>CONTENT BRIEF / INTERNAL LINKS</small><h3>英文 Brief 与内部链接方案</h3><p>逐篇确定主要搜索问题、页面标题、H2/H3、素材和产品事实检查点；从主指南引向问题专题，再连接 FAQ 和相关产品说明，减少重复内容。</p></article>
        <article><small>GSC / GA4</small><h3>搜索表现评估安排</h3><p>页面发布后使用 GSC Query / Page 检查收录、展示、点击和 CTR，并从 GA4 Landing Page 分析访问与页面承接。</p></article>
      </div>
      <section class="g-story-note" id="seo-method-and-pr">
        <h3>SEO 内容策划与搜索增长能力</h3>
        <div class="seo-method-matrix">
          <article><small>INTENT</small><h4>关键词与意图匹配</h4><p>把信息型、解决问题型、比较型与购买型搜索需求映射到不同页面，不让多个专题重复覆盖同一查询。</p></article>
          <article><small>ARCHITECTURE</small><h4>页面结构与内部链接</h4><p>安排 Pillar、专题、FAQ 和商品页的任务，检查内容重叠、孤立页面及内链关系。</p></article>
          <article><small>TECHNICAL</small><h4>收录与技术基础</h4><p>核对可抓取性、Canonical、Robots、Sitemap、标题和移动端阅读体验，配合站点团队处理。</p></article>
          <article><small>MEASUREMENT</small><h4>GSC、GA4 与转化承接</h4><p>按 Query/Page 检查展示、点击和 CTR，再用 Landing Page 数据分析访问与下一步行为。</p></article>
        </div>
        <p>SEO 面向主动搜索需求；PR 围绕新闻价值、可信产品信息和媒体素材进行对外传播。两者共享已核准的事实，但分别评估搜索表现和新闻稿分发。</p>
        <p><a href="#/case/brand/pr-project">查看 PR 新闻稿案例 ↗</a> · <a href="#/data/search">查看搜索表现 ↗</a></p>
      </section>
      <section class="g-story-note" id="seo-case-workflow">
        <h3>这次 Halloween SEO 策划的内容安排</h3>
        <p>主指南围绕节后清洁的常见任务组织阅读路径；专题分别处理糖浆黏污、化妆残留、厨房、浴室、门廊和宠物毛发等问题，并安排清洁工具比较内容。文章 Brief 对应搜索意图、场景、标题结构、可核对的使用条件及下一步内容。</p>
        <p>主指南、专题目录及内容 Brief 共同构成这次节庆搜索内容的策划成果。</p>
      </section>
      <details class="g-chart-disclosure"><summary>查看十篇英文选题与搜索意图</summary>
        <div class="g-project-list g-project-calendar-plan">${articles.map(([id, title, type, intent]) => `
          <article><small>${esc(id)} · ${esc(type)}</small><h3 lang="en">${esc(title)}</h3><p lang="en">${esc(intent)}</p></article>`).join("")}</div>
      </details>
      `, "seo-cluster");
  }

  function operations() {
    const tabs = [
      ["quarter","PLAN","季度主题","主题、受众与内容支柱"],
      ["month","CALENDAR","月度内容日历","各平台的周度选题与形式"],
      ["brief","CREATIVE","主题与制作 Brief","视频 Hook、镜头及文案要求"],
      ["review","REVIEW","内容质量审核","产品、创意、版位与发布"]
    ];
    return section("社媒团队｜季度规划、内容日历与创意审核", "点击管理模块，可查看对应的策划与制作工作物", `
      <section class="operations-control" id="operations-control">
        <header><span>SOCIAL CONTENT MANAGEMENT</span><h3>季度主题、月度排期和内容质量管理</h3><p>负责 Facebook、Instagram 和 Group 的内容规划、创意评审与制作进度管理。</p></header>
        <div class="operations-role-board" role="tablist" aria-label="社媒工作展示模块">
          ${tabs.map(([id,en,title,desc],i)=>`<button class="${i===0?"is-my-role":""}" role="tab" type="button" id="ops-tab-${id}" data-ops-tab="${id}" aria-controls="ops-panel-${id}" aria-selected="${i===0}"><span>0${i+1} / ${en}</span><h4>${title}</h4><p>${desc}</p><b>点击查看内容</b></button>`).join("")}
        </div>
        <div class="operations-work-views">
          <section class="operations-work-panel" id="ops-panel-quarter" data-ops-panel="quarter" role="tabpanel" aria-labelledby="ops-tab-quarter">
            <h4>季度主题规划</h4>
            <div class="operations-quarter-map">
              <article><small>01 / 场景</small><strong>家庭清洁与季节性问题</strong><p>节庆、日常场景与用户关注问题</p></article>
              <article><small>02 / 栏目</small><strong>产品演示与使用教育</strong><p>真实清洁动作、教程与 FAQ</p></article>
              <article><small>03 / 活动</small><strong>节庆与社群参与</strong><p>Campaign KV、互动、UGC 与 Creator</p></article>
              <article><small>04 / 复盘</small><strong>选题与形式调整</strong><p>按平台表现和用户问题调整下期安排</p></article>
            </div>
          </section>
          <section class="operations-work-panel" id="ops-panel-month" data-ops-panel="month" role="tabpanel" aria-labelledby="ops-tab-month" hidden>
            <h4>月度社媒内容日历</h4>
            <div class="operations-table-scroll"><table class="operations-sample-table"><thead><tr><th>周次</th><th>内容主题</th><th>Facebook</th><th>Instagram</th><th>Group</th><th>素材</th></tr></thead><tbody>
              <tr><td>W1</td><td>生活清洁场景</td><td>场景图文</td><td>Reels</td><td>话题提问</td><td>KV、Hook</td></tr>
              <tr><td>W2</td><td>使用教程</td><td>功能轮播</td><td>操作短片</td><td>FAQ 答疑</td><td>脚本、演示</td></tr>
              <tr><td>W3</td><td>UGC 与互动</td><td>教程内容</td><td>Before/After</td><td>投稿征集</td><td>授权、字幕</td></tr>
              <tr><td>W4</td><td>节庆与活动</td><td>主题 KV</td><td>Story / Reel</td><td>活动规则</td><td>活动素材</td></tr>
            </tbody></table></div>
            <p><a href="#/case/social/fathers-day-calendar">查看父亲节内容日历 ↗</a></p>
          </section>
          <section class="operations-work-panel" id="ops-panel-brief" data-ops-panel="brief" role="tabpanel" aria-labelledby="ops-tab-brief" hidden>
            <h4>社媒短视频制作 Brief｜餐后清洁主题</h4>
            <div class="operations-brief-sheet">
              <div><span>内容任务</span><strong>展示家庭清洁场景与真实操作方法</strong></div>
              <div><span>开场 Hook</span><strong>地面黏污特写，先交代清洁问题</strong></div>
              <div><span>镜头要求</span><strong>握持、接触表面、连续推进、转向与清洁结果</strong></div>
              <div><span>文案结构</span><strong>问题 → 操作 → 使用条件 → 下一步</strong></div>
              <div><span>渠道版本</span><strong>Feed、Reels、Story 的画幅与字幕安全区</strong></div>
              <div><span>上线前核对</span><strong>产品事实、字幕、CTA、授权与交付版本</strong></div>
            </div>
            <p><a href="#/case/gtm/english-brief">查看英文制作 Brief ↗</a></p>
          </section>
          <section class="operations-work-panel" id="ops-panel-review" data-ops-panel="review" role="tabpanel" aria-labelledby="ops-tab-review" hidden>
            <h4>创意与发布审核项目</h4>
            <div class="operations-review-grid">
              <article><small>PRODUCT</small><strong>产品事实</strong><p>外观结构、适用表面、操作条件与动作连续性</p></article>
              <article><small>CREATIVE</small><strong>创意内容</strong><p>Hook、镜头、情绪、卖点和真实产品证明</p></article>
              <article><small>FORMAT</small><strong>渠道规格</strong><p>画幅、字幕安全区、封面与落地页信息</p></article>
              <article><small>RELEASE</small><strong>发布准备</strong><p>授权、链接、素材版本与发布计划</p></article>
            </div>
          </section>
        </div>
      </section>
      <section class="operations-calendar-board" id="operations-content-calendar">
        <header><small>MONTHLY SOCIAL / CONTENT PLAN</small><h3>月度内容排期</h3><p>不同账号的内容任务按周安排，并根据节庆节点、素材准备和反馈调整。</p></header>
        <div class="operations-calendar-rows" role="list">
          <article role="listitem"><time>WEEK 01</time><div><strong>清洁场景与问题</strong><span>Facebook 图文 · Instagram 视频</span></div><b>场景 KV · Hook</b></article>
          <article role="listitem"><time>WEEK 02</time><div><strong>产品使用教育</strong><span>Facebook 轮播 · Instagram Reels</span></div><b>操作脚本 · FAQ</b></article>
          <article role="listitem"><time>WEEK 03</time><div><strong>社群内容与 UGC</strong><span>Group 讨论 · 清洁教程</span></div><b>参与规则 · 视觉审核</b></article>
          <article role="listitem"><time>WEEK 04</time><div><strong>节庆活动与复盘</strong><span>品牌主题 · 互动回顾</span></div><b>Campaign KV · 内容报告</b></article>
        </div>
      </section>
      <div class="g-story-note" id="asset-review">
        <h3>内容审核与发布管理</h3>
        <p>把脚本与视觉逐项对照产品事实、画面动作、英文文案和平台规格。设计、视频完成修订后核对成片与发布版本，并根据内容表现调整下一期 Brief。</p>
        <p><a href="#/case/gtm/english-brief">英文制作 Brief ↗</a> · <a href="#/case/creative/video-projects">视频案例 ↗</a></p>
      </div>
      <div class="g-story-note"><h3>父亲节 Campaign｜内容日历</h3>
        <p>围绕家人关怀、清洁场景和产品使用教育安排 Facebook、Instagram 与 Group 的内容主题和英文文案。</p>
        <p><a href="#/case/social/fathers-day-calendar">查看父亲节内容日历 ↗</a></p>
      </div>
    `, "team-delivery");
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
    return section("EDM｜节庆邮件与用户生命周期规划", "节庆邮件策划、用户分组与邮件自动化规则设计案例", `
      <div class="g-story-note" id="crm-campaign-email-plan">
        <h3>母亲节邮件营销内容方案</h3>
        <p>围绕节日送礼场景与活动档期安排邮件主题、英文预览文字、产品卖点、首屏文案、图文结构和 CTA，并配合预热、活动推进与截止提醒，核对社媒、Blog 与商品页信息一致性。</p>
      </div>
      <div class="g-project-list g-project-calendar-plan" id="crm-email-content">
        <article><small>BRIEF</small><h3>活动目标与受众名单</h3><p>确认主推产品、阶段受众、节庆主题和购买疑问；新订阅、已浏览及已购客户使用不同内容和排除规则。</p></article>
        <article><small>CONTENT</small><h3>英文文案与版式 Brief</h3><p>编写 Subject、Preheader、Hero、产品利益、证明点和主要 CTA；审核移动端阅读顺序及邮件承诺与落地页的一致性。</p></article>
        <article><small>SEND PLAN</small><h3>活动节奏与发送限制</h3><p>针对预热、重点产品和活动收尾分别安排邮件任务；排除退订、已购买或已进入更高意向流程的用户，避免重复发送。</p></article>
        <article><small>REVIEW</small><h3>衡量点击与站内后续行为</h3><p>设计送达、有效点击、退订和站内转化的观察口径，实际发送后的结果另经平台核验；不以打开率独立推断转化。</p></article>
      </div>
      <div class="g-story-note" id="crm-customer-state">
        <h3>用户购物状态决定邮件内容</h3>
        <p>订阅后先说明品牌和产品选择；浏览用户需要适用场景和常见问题；加购、结账用户应核实购物状态；购买后改为上手指导、保养及 FAQ。每条自动化邮件都写明触发事件、用户资格、退出条件和优先级，订单完成后停止旧购物车提醒。</p>
      </div>
      <div class="g-project-list g-project-calendar-plan" id="crm-lifecycle-flow">
        <article><small>WELCOME</small><h3>新订阅欢迎邮件</h3><p>介绍品牌、产品分类和使用场景，承接订阅入口承诺。</p></article>
        <article><small>BROWSE / CART</small><h3>浏览与加购提醒</h3><p>以近期兴趣和有效购物状态选择内容；开始结账或完成购买后退出过时提醒。</p></article>
        <article><small>POST-PURCHASE</small><h3>购后使用教育</h3><p>结合商品类别提供上手指南、清洁保养和 FAQ，营销信息尊重订阅许可及售后状态。</p></article>
        <article><small>WINBACK / LOYALTY</small><h3>复访与会员沟通</h3><p>根据顾客实际使用与购买周期讨论内容，积分和优惠规则须与店铺最终配置一致。</p></article>
      </div>
      <div class="g-story-note" id="crm-platform-handoff">
        <h3>邮件流程与 Shopify 用户数据如何配合</h3>
        <p>方案以 Shopify 的客户、订单、结账和邮件许可作为购物状态依据；Omnisend 负责获客订阅环节，Klaviyo 为规划中的生命周期执行端，会员系统提供积分和权益信息。对同一用户的浏览、加购、结账与购买事件设置流程优先级和退出条件，检查频控、退订和重复发送。</p>
        <p>我的职责是营销内容、邮件 Brief、用户分组、发送计划和跨渠道信息核对。系统启用、邮件发送、会员权益和商业优惠须经各平台负责人验证；邮件内容、受众规则与流程规划是此项目的核心工作物。</p>
      </div>
      <p class="g-chart-note">母亲节英文邮件方案 · 用户分组 · 生命周期触达流程</p>
    `, "crm-handoff");
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
      "季度主题与月度内容日历",
      "负责社媒季度主题与月度内容规划，按 Facebook、Instagram 和 Group 的内容任务安排产品演示、场景话题、互动活动及节庆专题。审核文案、视觉和视频版本，并根据内容表现调整后续排期。",
      "工作覆盖主题规划、日历制作、内容 Brief、素材审核和周月复盘；相关栏目展示实际职责与已有排期工作物。",
    ],
    community: [
      "把成员的使用问题带回内容和产品",
      "规划教程、投票和讨论时，优先选择成员能描述具体场景的问题，例如用在什么表面、哪一步卡住。运营汇总共性问题，产品确认用法，内容组更新 FAQ 或演示。",
      "成员快照说明社群规模，查看和发帖评论说明各自窗口内的行为。评估单场活动还需要参与记录、反馈和素材授权。",
    ],
    b2b: [
      "从展位策划到现场客户沟通",
      "参展前准备展区展示方案、品牌视觉、产品资料与客户邀约；现场结合展品介绍系统应用并记录采购问题，会后跟进产品资料、报价需求和合作条件。",
      "现有照片展示参展现场与产品陈列。同期 B2B 客户开发指标另作展示，不单独归因于展会。",
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
      "将母亲节等 Campaign 的英文邮件内容与产品卖点、社媒主题和站内页面对齐；按订阅、浏览、加购、已购等状态规划对应邮件内容和名单排除。",
      "负责邮件主题、文案结构、受众与发送节奏的营销方案；触发与退出规则作为实施时的配置要求。",
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
    brand: { strategy: brand, execution: () => seasonalCreative() + promotionCreative() + pr() + brandCampaign() },
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
    if (id === "brand") {
      const ratios=[...main.querySelectorAll("#promotion-kv-gallery [data-promo-ratio]")];
      const artboards=main.querySelector("#promotion-kv-gallery .promotion-kv-grid");
      if (artboards && ratios.length === 3) for (const button of ratios) {
        button.addEventListener("click", () => {
          const ratio=button.dataset.promoRatio;
          if (!["feed","story","hero"].includes(ratio)) return;
          artboards.dataset.promoLayout=ratio;
          for (const item of ratios) item.setAttribute("aria-pressed",String(item===button));
        });
      }
    }
    if (id === "operations") {
      const tabs=[...main.querySelectorAll("[data-ops-tab]")];
      const panels=[...main.querySelectorAll("[data-ops-panel]")];
      for (const tab of tabs) tab.addEventListener("click", () => {
        const selected=tab.dataset.opsTab;
        for (const item of tabs) {
          const active=item===tab;
          item.classList.toggle("is-my-role",active);
          item.setAttribute("aria-selected",String(active));
        }
        for (const panel of panels) panel.hidden=panel.dataset.opsPanel!==selected;
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
