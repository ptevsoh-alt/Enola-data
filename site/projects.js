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
        <p>五月社媒传播计划覆盖 Brief、视觉与视频制作、内容审核、发布安排及复盘，并同步 Paid、PR、Creator 与 EDM 所需素材和时间节点。</p>
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
  <header class="pmm-board-head pmm-board-lead">
    <small>PRODUCT POSITIONING / COMMERCIAL MESSAGE / M3</small>
    <h3 id="pmm-decision-heading">从餐后清洁任务，确定 M3 值得被选择的理由</h3>
    <p>M3 上市策划从具体的清洁任务出发：餐后什么时候需要整理地面？双盘拖地与常见方式有什么差别？什么样的演示和商品信息能支持选择？<em>Make Room for What Matters</em> 将这些产品价值放进一个有生活感的家庭故事。</p>
  </header>
  <div class="pmm-positioning-bridge" aria-label="品牌主张、产品定位和Campaign主题的关系">
    <article><small>BRAND / 长期价值</small><strong>Power Every Move</strong><p>围绕不同家庭清洁任务，用清晰的产品功能与实际操作体验支持日常生活。</p></article>
    <article class="is-product"><small>PMM / 本次选择理由</small><strong>可看懂的双盘拖地方式</strong><p>针对日常硬地清洁，让消费者先理解双盘动作、握持与地面适用条件，再判断是否值得选购。</p></article>
    <article><small>IMC / 上市传播主题</small><strong>Make Room for What Matters</strong><p>用“餐后还有地面要整理”建立生活关联，再以真实操作让情绪落回产品价值。</p></article>
  </div>
  <div class="pmm-target-frame">
    <div><small>TARGET × JOB TO BE DONE</small><h4>谁、在什么任务中、考虑用什么来替代？</h4><p>本次以美国市场的家庭日常硬地清洁为沟通情境，优先展示餐后地面整理。考虑对象不是泛泛的“所有家庭”：而是正在比较手动拖地、电动拖地等方式，并希望确认操作、适用表面与维护要求的潜在购买者。</p><p class="pmm-frame-boundary">餐后硬地整理是本次上市沟通的优先场景；其他家庭清洁任务按地面条件、操作需求与产品线分别安排。</p></div>
    <aside><small>POSITIONING STATEMENT</small><strong>面向需要定期整理家中硬地、正在比较拖地方式的消费者，M3 是一款双盘旋转拖把。通过清晰可见的双盘操作、握持方式与使用说明，让用户在购买前判断这种清洁方式是否适合自己的家庭任务。</strong></aside>
  </div>
  <div class="pmm-decision-layout">
    <div class="pmm-decision-process" aria-label="用户任务、竞争参照、核心利益与证明的决策链">
      <article><span>01 / CUSTOMER TASK</span><h4>餐后地面整理</h4><p>用具体家庭时刻带出清洁任务，避免一开始就向不熟悉电动拖地的用户罗列参数。</p><strong>先回答：我为什么需要了解它？</strong></article>
      <article><span>02 / REFERENCE FRAME</span><h4>替代方案，而非空泛竞品</h4><p>手动拖把强调熟悉与简便；洗吸设备可能覆盖不同污物；同类电动工具则需要比较实际操作与条件。</p><strong>再回答：它与我现在的方式有何区别？</strong></article>
      <article><span>03 / VALUE PROPOSITION</span><h4>双盘动作可见，选型更清楚</h4><p>把结构、握持与使用路径组织成可以理解的产品故事，而不是把转速直接等同于清洁效果。</p><strong>让卖点与选购问题对应</strong></article>
      <article><span>04 / PROOF &amp; RTB</span><h4>有证据，再谈利益</h4><p>产品图说明外观；连贯的真实演示说明动作；适用表面、保养与售后由当地型号资料确认。</p><strong>区分已展示事实与待核验效果</strong></article>
    </div>
    <figure class="pmm-decision-photo"><img src="assets/projects/mop-kv-detail.webp" alt="M3 双盘拖把产品结构细节，用于说明外观而非性能测试" loading="lazy" decoding="async"><figcaption><small>PRODUCT TRUTH / M3</small><b>用结构与操作建立信任</b><span>外观识别 → 真实演示 → 适用条件</span></figcaption></figure>
  </div>
  <section class="pmm-competitive-frame" aria-labelledby="pmm-competitive-title">
    <div class="pmm-mini-heading"><small>COMPETITIVE VALUE / 选择参照</small><h4 id="pmm-competitive-title">决定比较维度，而不是宣称全面领先</h4></div>
    <div class="pmm-competitive-grid">
      <article><small>手动平板拖把</small><h5>熟悉、购入门槛直观</h5><p>消费者已经理解基本操作。M3 需要展示双盘运动方式及实际使用步骤，才能让“换一种方式”有具体意义。</p><b>决策问题：操作差异值不值得？</b></article>
      <article><small>洗吸一体设备</small><h5>任务覆盖范围不同</h5><p>有些购买者还在比较干湿污物的处理方式。M3 应明确它是拖地工具，不以虚构吸污能力赢得比较。</p><b>决策问题：我需要的是拖地还是吸洗？</b></article>
      <article><small>其他电动拖地工具</small><h5>需要同条件证明的同类选择</h5><p>比较要落在具体型号、地面、操作、配件、价格与维护上。缺少可比实测时，不写“更强、更快、第一”。</p><b>决策问题：凭什么选择这一款？</b></article>
    </div>
  </section>
  <section class="pmm-ksp-system" aria-labelledby="pmm-ksp-title">
    <div class="pmm-mini-heading"><small>KSP / VALUE PROPOSITION / FABE</small><h4 id="pmm-ksp-title">把产品事实转化为用户听得懂的价值</h4><p>主价值只保留一个：<b>让用户看清 M3 怎样参与日常硬地清洁，并能据此判断适配性。</b> 卖点按用户疑问排序，参数只在需要解释机制和型号差异时出现。</p></div>
    <div class="pmm-fabe-grid" aria-label="M3产品特征、机制优势、用户利益与证明的FABE映射">
      <article><div><small>KSP 01 / CORE MECHANISM</small><h5>双盘旋转底座</h5></div><dl><div><dt>F / 产品事实</dt><dd>可见的两片圆形拖布与双盘结构。</dd></div><div><dt>A / 机制差异</dt><dd>相较手动往复拖动，产品采用电动双盘旋转的工作形式。</dd></div><div><dt>B / 任务利益</dt><dd>便于消费者通过画面理解拖地动作与地面接触方式；不推导省时比例。</dd></div><div><dt>E / RTB</dt><dd>产品细节图证明外观；旋转、接地与效果要用原始连续实拍分别支持。</dd></div></dl></article>
      <article><div><small>KSP 02 / USE EXPERIENCE</small><h5>站姿握持与推进</h5></div><dl><div><dt>F / 产品事实</dt><dd>手柄、杆体与底座构成完整操作结构。</dd></div><div><dt>A / 操作方式</dt><dd>可在同一镜头内展示握持、转向及地面移动路径。</dd></div><div><dt>B / 任务利益</dt><dd>降低首次了解产品时的操作理解成本；不直接宣称省力或人体工学优势。</dd></div><div><dt>E / RTB</dt><dd>结构主视觉 + 可复核的实际操作镜头；主观体验需进一步证据。</dd></div></dl></article>
      <article><div><small>KSP 03 / OWNERSHIP FIT</small><h5>组件、地面与维护</h5></div><dl><div><dt>F / 产品事实</dt><dd>产品电池等组件可展示；具体型号及配件以销售资料为准。</dd></div><div><dt>A / 决策信息</dt><dd>把适用地面、维护、使用限制与套装配置列成选购 FAQ。</dd></div><div><dt>B / 任务利益</dt><dd>帮助消费者排除不适合的使用情境，降低买错型号的风险。</dd></div><div><dt>E / RTB</dt><dd>当地说明书、实际配件清单及获准的售后政策；不可只用产品图证明兼容或续航。</dd></div></dl></article>
    </div>
    <div class="pmm-proof-boundary"><b>信息取舍</b><span>主推：场景问题、双盘工作方式、真实操作。</span><span>按需补充：型号规格、续航、适用地面、价格与售后。</span><span>不直接承诺：未经核验的清洁提升、省时、省力与所有地面通用。</span></div>
  </section>
  <section class="pmm-commercial-messages" aria-labelledby="pmm-commercial-title">
    <div class="pmm-mini-heading"><small>BUYER AWARENESS / COMMERCIAL MESSAGE</small><h4 id="pmm-commercial-title">同一主张，面对不同认知阶段说不同的话</h4><p>按用户提出的问题设计信息深度，而不是把“认知、比较、购买”都塞进同一张海报。针对不同的信息需求，分别安排场景内容、操作演示、选型 FAQ 与购买说明。</p></div>
    <div class="pmm-awareness-grid">
      <article><small>01 / PROBLEM AWARE</small><h5>先认出餐后待处理的地面</h5><blockquote lang="en">Dinner's done. The floor isn't.</blockquote><p>展示餐后真实情境，让用户知道这条内容与自己的任务有关。</p><b>Social / 情境短片 · CTA：了解清洁方式</b></article>
      <article><small>02 / SOLUTION AWARE</small><h5>理解双盘拖地与其他方式的差别</h5><blockquote lang="en">See dual-spin mopping in action.</blockquote><p>用连续动作、握持与地面接触说明机制，避免只看“神奇前后对比”。</p><b>Reels / Creator · CTA：观看完整演示</b></article>
      <article><small>03 / PRODUCT AWARE</small><h5>判断 M3 是否适合自己的家</h5><blockquote lang="en">Is M3 right for your floors?</blockquote><p>提供适用表面、配件、操作限制及选型比较，回应具体疑虑。</p><b>Product FAQ / PR · CTA：查看使用条件</b></article>
      <article><small>04 / READY TO CHOOSE</small><h5>商业信息齐全后，才推动购买</h5><blockquote lang="en">Check the details before you choose.</blockquote><p>按当前销售版本核对 SKU、套装、价格、库存、配送、保修和退货条件。</p><b>PDP / CRM / Paid · CTA：查看获准购买信息</b></article>
    </div>
    <div class="pmm-commercial-gate"><div><small>GTM / CONVERSION READINESS</small><strong>购买理由必须在商品信息中兑现</strong><p>广告说明的产品机制、视频中的具体型号、页面上的权益和售后条件应一致。未确认的销售承诺只做信息准备，不进入购买导向传播。</p></div><a href="#/case/gtm/campaign-architecture">继续看 Big Idea 与整合 Campaign ↗</a></div>
  </section>
  <div class="pmm-bigidea-bridge" aria-label="从产品价值到Make Room for What Matters的形成逻辑">
    <small>WHY THIS BIG IDEA / 从产品价值到传播主题</small><h4>Make Room for What Matters</h4><p>餐后需要清洁，家人也期待生活继续。M3 的双盘动作能够在这一情境中成为可看见的解决方式，因此创意从“还有地面待整理”转向“整理之后，生活继续”。<b>主题承担情绪记忆，产品机制承担选择理由。</b> 情绪表达与产品选择理由各有任务，由可复核的操作演示与适用说明负责支撑具体利益。</p>
    <div><span>场景：餐后硬地</span><span>选择理由：双盘操作可理解</span><span>证明：连续实拍与型号信息</span><span>表达：Make Room for What Matters</span></div>
  </div>
  <div class="pmm-tradeoff"><strong>MY STRATEGIC CHOICE</strong><p><b>放弃</b> 参数优先与无依据的效率竞赛；不将 Campaign 主题当成产品卖点。</p><p><b>选择</b> 场景开场、机制证明、分层沟通与可核验的购买承接。</p></div>
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
        <h3 id="campaign-architecture-title">从品牌定位，到一句能被记住的上市主张</h3>
        <p>我先梳理 M3 在日常硬地清洁中的产品角色、替代方案与选购问题，再将双盘结构和实际操作转化为能支撑上市的核心信息。<i>Make Room for What Matters</i> 是这套产品信息之上的 Campaign 表达：它负责让人记住家庭场景，具体卖点则由演示、FAQ 和商业信息承担。我参与场景取舍、内容主张、创意 Brief、跨渠道素材和审核协同。</p>
        <div class="campaign-strategy-spine" aria-label="M3 品牌与上市传播的四项策略判断">
          <article><span>01 / BUSINESS CONTEXT</span><h4>上市要解决的问题</h4><p>四条清洁产品线承担不同家庭任务。M3 首发需要一个容易看懂、能够衔接产品演示和购买信息的传播入口，而不是让新品成为参数集合。</p></article>
          <article><span>02 / AUDIENCE TENSION</span><h4>生活已进入下一幕，清洁还没结束</h4><p>以美国家庭餐后硬地整理为创意切口：做完饭、吃完饭，地面仍需要处理。这是传播选取的场景张力，不冒充消费者调研结论。</p></article>
          <article><span>03 / PRODUCT ROLE</span><h4>让工具在真实动作中出现</h4><p>M3 的双盘结构、站姿握持和推进动作承担产品解释；主视觉负责识别，连续演示负责回答如何使用，FAQ 负责回答适用限制。</p></article>
          <article><span>04 / STRATEGIC CHOICE</span><h4>场景先行，证明随后</h4><p>优先让人看见“餐后还要清理地面”的问题，再展示产品操作。品牌情绪负责记忆，产品事实负责可信度；不将省时幅度或清洁效果写成未验证承诺。</p></article>
        </div>
        <section class="m3-positioning" id="m3-product-positioning" aria-labelledby="m3-positioning-title">
          <div class="m3-section-intro"><span>PRODUCT MARKETING / M3 市场定位</span><h4 id="m3-positioning-title">先决定 M3 为哪项清洁任务提供价值，再谈创意</h4><p>在美国市场的上市沟通中，我将 M3 置于家庭日常硬地清洁的选择情境。用户需要的不只是“一个电动工具”，而是判断它是否适合自己家的地面、是否看得懂操作，以及为什么值得进一步了解。</p></div>
          <div class="m3-positioning-statement"><small>PRODUCT POSITIONING / 本项目的沟通定位</small><p>对于需要处理日常硬地清洁、正考虑从手动拖地转向电动清洁方式的家庭，<b>M3 是一款双盘旋转拖把</b>。传播重点是把站姿握持、双盘接地与推进动作展示清楚，帮助用户判断它是否适合自己的清洁习惯与地面条件。</p><span>差异表达聚焦“可观察的操作方式”，不声称清洁效率、价格或性能全面优于替代方案。</span></div>
          <div class="m3-choice-head"><b>选择与竞争参照</b><p>不把所有清洁工具都当成同一类竞品；比较的是用户当前要完成的任务。</p></div>
          <div class="m3-alternatives" aria-label="M3 与日常硬地清洁替代方式的决策比较">
            <article><small>手动平板拖把</small><h5>用户熟悉，使用方式直观</h5><p>属于需要手动往复操作的基础方案。M3 要回答的不是“手动一定不好”，而是电动双盘如何操作，为什么这种方式适合某类任务。</p><strong>M3 需要证明：动作机制与使用门槛</strong></article>
            <article><small>洗吸一体设备</small><h5>解决的任务可能更复杂</h5><p>不同产品对干湿污物、清理流程和维护要求有不同定位。M3 不承诺替代吸污功能，避免以“全能清洁”模糊选型边界。</p><strong>M3 需要说明：适用情境与不适用任务</strong></article>
            <article><small>其他电动拖地工具</small><h5>真正的比较发生在使用细节</h5><p>同类电动产品的转速、操控、配件与价格必须按具体型号和相同条件比较。未完成同条件测试前，传播只展示 M3 自身的结构和操作。</p><strong>M3 需要补强：可复核演示与决策 FAQ</strong></article>
          </div>
        </section>
<div class="campaign-proof-gallery" id="campaign-proof-gallery" aria-label="M3 上市的产品与视觉素材">
 <figure><img src="assets/projects/m3-yellow-main.webp" alt="M3 产品主体主视觉" loading="lazy" decoding="async"><figcaption><b>01 / 产品识别</b><span>KV · 外观与品牌信息</span></figcaption></figure>
 <figure><img src="assets/projects/mop-kv-detail.webp" alt="M3 双盘拖把结构细节" loading="lazy" decoding="async"><figcaption><b>02 / 机制展示</b><span>操作镜头 Brief · 结构细节</span></figcaption></figure>
 <figure><img src="assets/projects/m3-yellow-battery.webp" alt="M3 电池部件外观图" loading="lazy" decoding="async"><figcaption><b>03 / 产品教育</b><span>FAQ · 产品细节与信息承接</span></figcaption></figure>
</div>
<div class="campaign-house" aria-label="M3 Campaign 品牌屋式策略与渠道架构">
          <div class="campaign-house-roof"><span>BRAND IDEA / 长期品牌主张</span><h4>Power Every Move</h4><p>清洁工具支持人的日常行动，而不是让人围着工具转。</p></div>
          <div class="campaign-brand-thesis" aria-label="品牌定位的受众、角色与价值">
            <article><small>AUDIENCE / 受众任务</small><h5>需要打理不同家庭空间的人</h5><p>餐区硬地、浴室边角与局部清洁具有不同操作任务；传播按场景帮助用户识别适合的产品线。</p></article>
            <article><small>BRAND ROLE / 品牌角色</small><h5>让清洁方式更容易理解和选择</h5><p>用清楚的场景、产品结构和可核实的使用说明，降低用户理解工具及比较方案时的负担。</p></article>
            <article><small>REASON TO BELIEVE / 支撑依据</small><h5>产品事实与真实操作相互印证</h5><p>可见的产品结构、连续的使用动作、官方适用说明和售后信息共同支撑品牌表达，不用情绪画面代替性能证明。</p></article>
          </div>
          <section class="m3-product-message-house" id="m3-product-value" aria-labelledby="m3-product-value-title">
            <header><span>PRODUCT MESSAGE HOUSE / 核心卖点与证明</span><h5 id="m3-product-value-title">先让用户理解产品，再让主题产生意义</h5><p>这不是品牌屋的另一套口号。产品主张回答“为什么看 M3”，四条支撑信息分别解释操作、体验、选型和使用边界。</p></header>
            <div class="m3-product-roof"><small>PRIMARY VALUE PROPOSITION / 主价值</small><strong>把日常硬地清洁的操作方式讲清楚，让用户看得见双盘如何参与地面整理，再决定它是否适合自己。</strong></div>
            <div class="m3-product-pillars">
              <article><small>01 / FUNCTIONAL PROOF</small><h6>双盘旋转，动作可见</h6><p>先展示双盘结构，再用不跳切的操作镜头说明接地、转动和推进，而不是只报转速数字。</p><b>证据：产品结构图 + 经核实的真实演示</b></article>
              <article><small>02 / EXPERIENCE</small><h6>用完整过程解释怎么使用</h6><p>让握持位置、站姿、转向与清洁路径出现在同一使用情境中，降低首次理解的门槛。</p><b>证据：握持与连续移动实拍</b></article>
              <article><small>03 / DECISION VALUE</small><h6>帮助比较，而非强行宣称更好</h6><p>对照手动拖地、洗吸一体与其他电动工具的任务差异，重点解释 M3 的使用方式和选择条件。</p><b>证据：型号资料、同条件比较和 FAQ</b></article>
              <article><small>04 / FIT & LIMITS</small><h6>说清楚适合什么地面</h6><p>按当地说明书确认可用表面、液体使用、维护与清洁限制；不将餐后场景泛化为所有污物皆可处理。</p><b>证据：官方适用说明与产品核验</b></article>
            </div>
            <details class="m3-fabe-detail"><summary>查看核心卖点如何从产品事实转化为 FABE 与 RTB</summary>
              <div class="g-proof-table"><table>
                <thead><tr><th>Product Truth / Feature</th><th>Advantage / Benefit</th><th>Evidence / RTB</th></tr></thead>
                <tbody>
                  <tr><th>双盘旋转底座</th><td>区别于手动往复拖动的工作方式；主要传播利益是让操作机制直观可见，不承诺未经测试的效率优势。</td><td>现有产品主视觉能支持外观识别；持续转动、接地及清洁效果需要真实连贯演示分别核验。</td></tr>
                  <tr><th>握把与操控结构</th><td>围绕站姿握持、前进与转向组织使用教育。用户是否觉得更省力应由实际体验验证。</td><td>结构图展示外形与握持位置；行动便利性与人体工学结果不能由静态图推出。</td></tr>
                  <tr><th>产品电池组件</th><td>回答电源安装、维护与使用连续性问题，而非用电池外观推导续航。</td><td>现有电池部件图支持外观说明；续航、拆装与使用限制需型号资料及演示。</td></tr>
                  <tr><th>具体适用地面</th><td>减少“我家地面能否使用”的购买疑虑，帮助判断是否进入下一步比较。</td><td>按美国销售型号说明书、真实场景和客服信息核验；缺确认时不发布通用兼容承诺。</td></tr>
                </tbody>
              </table></div>
            </details>
          </section>
          <div class="campaign-house-message"><span>CAMPAIGN BIG IDEA / M3 上市主题</span><h4>Make Room for What Matters</h4><p class="campaign-big-idea-lead">晚饭结束，家里的下一段生活正在发生；地面清洁却还没完成。这个主题不是承诺“省下多少分钟”，而是把常被忽略的家务动作放回家庭故事：<b>生活是主角，M3 是参与完成清洁的工具。</b></p>
            <p class="m3-big-idea-distinction">选择这句主题，是因为它能同时容纳两种表达：用真实的双盘动作解释产品，用餐后人物与空间的变化延展品牌情绪；两者共享同一个清洁任务，而不依赖虚构清洁效果。</p>
            <div class="campaign-idea-logic">
              <div><small>HUMAN TENSION / 生活张力</small><b>饭后仍要整理地面，但人的注意力已经回到家人和日常生活。</b></div>
              <div><small>PRODUCT BRIDGE / 产品连接</small><b>M3 通过可见的双盘、握持与推进动作，承担“怎么完成地面任务”的解释。</b></div>
              <div><small>CREATIVE MECHANISM / 故事机制</small><b>餐桌已结束 → 视线落到地面 → M3 进入真实操作 → 画面回到生活。</b></div>
              <div><small>MEMORY / 核心信息</small><b>清洁是生活的一部分，不必成为全部；选择工具前，先看清它如何工作。</b></div>
              <div><small>PROOF / 可信条件</small><b>产品主体、持续操作、适用地面与 FAQ 各自承担证明，不用情绪镜头充当性能证据。</b></div>
              <div><small>ACTION / 下一步</small><b>感兴趣就看完整操作；准备选购则核对地面适配、维护与获批的价格供货信息。</b></div>
            </div>
          </div>
          <div class="campaign-house-insight"><span>CREATIVE PATH / 统一叙事顺序</span><div><b>餐后未完的地面</b><b>任务冲突</b><b>M3 自然出场</b><b>双盘连续演示</b><b>回到家庭生活</b></div><p>情绪画面负责建立关联；真实操作和使用说明负责解释产品，不用虚构清洁成果制造反差。</p></div>
          <div class="campaign-territory-set" id="campaign-creative-territories" aria-label="由一个 Big Idea 延展出的三条差异化创意方向">
            <div class="campaign-territory-heading"><span>CREATIVE TERRITORIES</span><h5>同一主题，三种不同的创意任务</h5></div>
            <div class="campaign-territory-grid">
              <article><small>01 / SCENE CONTRAST</small><h6>Dinner's Done. The Floor Isn't.</h6><p>从餐桌与地面的状态反差切入：饭后场景把清洁任务带出来，产品顺着人物行动进入画面。</p><strong>优先用于：Hero KV、短视频开场、Paid Hook</strong></article>
              <article><small>02 / MECHANISM REVEAL</small><h6>See the Move</h6><p>把注意力从“强大参数”转向“怎样握持、双盘如何接地、如何连续推进”，用实拍解答操作疑问。</p><strong>优先用于：Reels、Creator Brief、结构轮播</strong></article>
              <article><small>03 / LIFE AFTER THE TASK</small><h6>Make Room for Moments</h6><p>让人物关系成为情绪主线，产品承担生活中的辅助角色。家庭故事可以延展，但不暗示未经验证的节省时间。</p><strong>优先用于：品牌短片、节庆延展、社群故事</strong></article>
            </div>
            <p class="campaign-territory-decision"><b>选择依据：</b>上市首轮用场景反差建立相关性；用户开始了解产品时加强动作证明；品牌情绪在故事型内容中延伸。三者不是换背景颜色的同一张海报。</p>
          </div>
          <section class="m3-message-states" id="m3-commercial-message" aria-labelledby="m3-message-states-title">
            <div class="m3-section-intro"><span>COMMERCIAL MESSAGE / 认知状态与信息深度</span><h5 id="m3-message-states-title">不同了解程度，回答不同问题</h5><p>用户不会因为看过一张情绪海报就准备购买。以下是内容承接的设计，而不是把观众未经验证地划分成已识别的人群标签。</p></div>
            <div class="m3-message-state-grid">
              <article><small>场景认知</small><h6>“饭后地面怎么处理？”</h6><p>先让人认出熟悉的日常任务，以餐后地面和人物行动建立相关性。</p><b>社媒 Hero / 短视频 Hook</b><em>下一步：了解这一类解决方式</em></article>
              <article><small>方案理解</small><h6>“双盘拖把到底怎么用？”</h6><p>介绍手动拖地与电动双盘的操作差别，让完整动作和结构细节回答问题。</p><b>Reels / Creator / 产品轮播</b><em>下一步：观看真实操作</em></article>
              <article><small>产品比较</small><h6>“适合我家、值得选吗？”</h6><p>按地面、维护、产品规格及有依据的竞品比较回答疑虑；证据缺口不靠话术填补。</p><b>FAQ / 产品内容 / 搜索</b><em>下一步：核对具体型号与条件</em></article>
              <article><small>行动准备</small><h6>“价格、供货和保障是什么？”</h6><p>只有当地型号、Offer、可售、售后与归因条件获得核准后，才在对应触点提供购买型信息。</p><b>商品页 / 合规邮件 / 获批广告</b><em>下一步：根据真实条件作决定</em></article>
            </div>
          </section>
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
          <div class="campaign-integration-guardrails" aria-label="Campaign 管理与跨渠道交付">
            <div class="campaign-integration-heading"><span>CAMPAIGN MANAGEMENT / 协同与审核</span><h5>一份主张，三处关键交接</h5><p>传播策划不代替各渠道负责人决策；我负责把产品事实、素材需求、审核意见和日历节点对齐。</p></div>
            <div class="campaign-integration-grid">
              <article><b>内容与版本</b><p>先确认主视觉、产品实拍、FAQ 和英文 Brief 的源版本，再适配各平台开场、画幅、CTA 与信息密度。</p></article>
              <article><b>放行与责任</b><p>产品核对功能与适用条件；视觉/视频核对真实结构；渠道 Owner 分别负责发布、预算、授权、优惠和页面可售状态。</p></article>
              <article><b>复盘与调整</b><p>按创意方向对照观看、互动、有效访问和高频疑问；商业表现只采用订单与数据负责人的同口径核验结果。</p></article>
            </div>
          </div>
        <div class="campaign-assets-showcase" id="campaign-paid-email-assets" aria-label="广告和邮件沟通创意样例">
          <div class="campaign-assets-heading"><small>CREATIVE ADAPTATION / 内容策略到创意版本</small><h4>保留同一 Big Idea，改变每个渠道的叙事方式</h4><p>Hero 负责让人记住“餐后还有一件清洁小事”；短视频让动作可信；社群负责征集问题；PR 和产品内容负责核实。不是把同一张 KV 缩放成不同尺寸。</p></div>
          <div class="campaign-assets-pair">
            <article class="campaign-ad-visual"><span>PAID / DISCOVERY CREATIVE</span><h5 lang="en">Dinner's done.<br>The floor isn't.</h5><p>首屏呈现餐后待清理的地面；随后以产品出场和连续操作兑现开场提出的问题。</p><div class="campaign-asset-tags"><small>A · 餐后场景冲突</small><small>B · 双盘动作揭示</small><small>C · 握持操作细节</small></div><p class="campaign-asset-caption">三条 Hook 对应不同理解障碍，非同一视频换字幕；具体测试、预算和购买型 CTA 须由 Paid Owner 核准。</p></article>
            <article class="campaign-email-visual"><span>EDM / LIFECYCLE</span><div class="campaign-email-head"><b>New arrival</b><small>US / EN</small></div><h5 lang="en">Meet M3. Made for everyday floor care.</h5><p>预热先讲日常地面任务，上市期重点回答产品怎么用、是否适合自己的地面；购后以操作说明和维护 FAQ 延续体验。</p><div class="campaign-asset-tags"><small>订阅认知</small><small>产品考虑</small><small>已购教育</small></div><p class="campaign-asset-caption">不同阶段提供不同的信息深度；许可、触发、排除与发送由 CRM Owner 确认。</p></article>
          </div>
          <div class="campaign-adaptation-grid" aria-label="跨渠道创意表达与内容任务">
            <article><small>HERO / KV</small><h5>一眼看懂主题</h5><p>以餐桌到地面的视觉关系建立反差，M3 产品主体清晰可识别；品牌主题不遮挡双盘结构。</p><b>检验：品牌、产品与任务是否同屏可读</b></article>
            <article><small>REELS / CREATOR</small><h5>让产品动作说话</h5><p>从任务切入，连续拍到握持、接地和推进。创作者保持真实体验与必要披露，不用无依据的结果字幕。</p><b>检验：动作完整、事实准确、复用获授权</b></article>
            <article><small>FACEBOOK / GROUP</small><h5>把场景变成问题</h5><p>从“饭后地面最难处理什么”发起讨论，评论与社群 FAQ 反过来为下一轮短视频补充题目。</p><b>检验：问题具体、互动门槛低、反馈可归类</b></article>
            <article><small>PR / SEARCH</small><h5>把兴趣变成可核信息</h5><p>用品牌背景、产品结构、适用场景及官方 FAQ 支撑理解；媒体和搜索内容不借情绪概念夸大功能。</p><b>检验：新闻角度、事实和适用限制一致</b></article>
          </div>
          <div class="campaign-asset-links"><a href="#/case/crm/crm-handoff">查看 CRM 触达与排除逻辑 ↗</a><a href="#/case/creative/video-strategy">查看视频创意与开场设计 ↗</a></div>
        </div>
          
        </section>
        <section class="v-campaign-logic" id="campaign-decision-logic" aria-label="Campaign 策略决策路径">
          <header><small>THE STRATEGY IN ONE VIEW</small><h4>从产品的选择理由，走到一条有生活感的传播主题</h4></header>
          <div class="v-campaign-logic-steps">
            <article><span>CONTEXT</span><strong>餐后硬地清洁</strong><small>用户真正面对的日常任务</small></article>
            <article><span>INSIGHT</span><strong>晚餐结束，地面仍待整理</strong><small>首发选定的生活张力，而非问卷统计结论</small></article>
            <article class="is-idea"><span>BIG IDEA</span><strong>Make Room for What Matters</strong><small>以生活中断与恢复的故事，承接产品动作</small></article>
            <article><span>PROOF / RTB</span><strong>双盘结构 × 完整操作 × 适配条件</strong><small>证明可观察的过程，不虚构省时和性能优势</small></article>
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
              <tr><th>场景问题</th><td>餐后仍需处理的地面清洁任务</td><td>FB / IG Feed、Story 与短视频建立相关性</td><td>Review / VOC 与家庭清洁场景</td></tr>
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
  <header><small>IMC CHANNEL PLAN / PAID × EARNED</small><h3 id="gtm-media-plan-heading">Paid、PR 与 Creator 的传播任务</h3><p>Paid 负责受众与素材测试；PR / Creator 负责合作内容与可信表达。内容侧提供一致的产品事实、创意 Brief 和版本管理。</p></header>
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
          <article><small>INSTAGRAM / 情境与可观察动作</small><h3>由节庆情绪进入产品演示</h3><p>Stories 和 Reels 分别承担主题传播与动作教育。长柄刷强调边角接触，双盘拖把展示餐后硬地推进，分别呈现产品操作与适用场景。</p></article>
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
        <h3>新闻稿分发</h3>
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
    return section("节庆 Campaign｜创意原稿与内容策划", "Black Friday · Mother's Day · Father's Day", `
      <section class="promotion-campaign-editorial" id="promotion-kv-gallery" aria-labelledby="promotion-kv-heading">
        <header class="promotion-kv-header">
          <div><small>SEASONAL CREATIVE / MARKETING KV</small><h3 id="promotion-kv-heading">节庆促销视觉设计</h3>
          <p>黑五聚焦节日采购与家居焕新；母亲节以日常关怀进入礼赠场景；父亲节结合家人关系与产品使用。视觉取自项目既有产品和生活场景素材。</p></div>
          <span class="promo-visual-status">CAMPAIGN CREATIVE</span>
        </header>
        <section class="promotion-original-work" id="promotion-original-work" aria-labelledby="promotion-original-title">
          <header><small>ORIGINAL CAMPAIGN ARTWORK</small><h4 id="promotion-original-title">黑五与父亲节创意原稿</h4><p>黑五组合产品促销与父亲节 BBQ 场景创意原稿。</p></header>
          <div class="promotion-original-grid">
            <figure class="promotion-original-card" id="promotion-original-black">
              <a href="assets/projects/black-friday-suite-concept.jpg" target="_blank" rel="noopener noreferrer" aria-label="放大查看黑五促销原稿">
                <img src="assets/projects/black-friday-suite-concept.jpg" width="2752" height="1536" alt="黑五原创意 KV：黑金 BLACK FRIDAY、清洁产品组合、限时促销文案" loading="lazy" decoding="async">
                <span>放大原图 ↗</span>
              </a><figcaption><small>BLACK FRIDAY / VISUAL STUDY</small><h5>黑五｜组合清洁工具促销</h5><p>黑金配色、产品组合陈列与 35% OFF 促销提案。</p></figcaption>
            </figure>
            <figure class="promotion-original-card" id="promotion-original-father">
              <a href="assets/projects/fathers-day-bbq-concept.jpg" target="_blank" rel="noopener noreferrer" aria-label="放大查看父亲节促销原稿">
                <img src="assets/projects/fathers-day-bbq-concept.jpg" width="2752" height="1536" alt="父亲节原创意 KV：父亲在户外烧烤区使用黄色电动烤架清洁工具" loading="lazy" decoding="async">
                <span>放大原图 ↗</span>
              </a><figcaption><small>FATHER'S DAY / VISUAL STUDY</small><h5>父亲节｜BBQ 场景礼赠</h5><p>以父亲与家庭聚会场景切入，突出烧烤清洁动作、节庆情绪及礼赠诉求。</p></figcaption>
            </figure>
          </div>
          <div class="g-story-note" id="promotion-original-mother"><h4>母亲节｜礼赠内容策划</h4><p>以家庭关怀与礼赠需求组织产品内容、英文邮件主题与活动节奏。</p><p><a href="#/case/crm/crm-campaign-email-plan">查看母亲节 EDM 策划 ↗</a></p></div>
        </section>
      </section>
      <span id="promotion-kv-black"></span><span id="promotion-kv-mother"></span><span id="promotion-kv-father"></span><span id="promotion-channel-adaptations"></span>
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
          <li><strong>后续优化：</strong>分别观察完整观看、动作片段观看和用户问题，调整剪辑、产品解释或 FAQ。</li>
        </ul>
        <p><a href="#/case/creative/video-projects">查看节庆品牌片与 Creator 内容案例 ↗</a> · <a href="#/case/gtm/campaign-architecture">查看 IMC / Campaign 渠道角色 ↗</a></p>
      </div>`, "video-strategy");
  }

  function creative() {
    return section("视频创意与 Campaign 内容案例", "节庆品牌影片、产品演示与 Creator 内容的创意方向、脚本、镜头审核及渠道适配。", `
      <section class="tvc-creative-intro" id="video-campaign-showcase">
        <span>SEASONAL CAMPAIGN / TVC & CREATOR CONTENT</span>
        <h3>节庆品牌叙事与产品演示</h3>
        <p>感恩节关注团聚之后的照料与陪伴，圣诞节关注家人之间默默付出的日常行动。节庆影片将产品作用融入人物关系和家庭情境。KOL / Creator 内容分别展示楼梯踏面清洁与客厅中的产品介绍。</p>
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
          <article><small>CAMPAIGN CREATIVE</small><h4>节庆与日常主题创意</h4><p>结合用户清洁任务、节日情境和品牌主张确定创意主题，组织故事提案、场景选择和视觉风格。</p></article>
          <article><small>VIDEO BRIEF</small><h4>脚本、分镜与产品演示</h4><p>拆解视频开场、冲突、解决过程和结尾信息；明确产品需要拍到的接触表面、握持、移动方向及连续动作，逐项审核脚本和成片。</p></article>
          <article><small>SOCIAL FORMAT</small><h4>社媒短片与视觉表达</h4><p>根据 Feed、Reels、Story 的阅读方式调整 Hook、字幕、画幅和剪辑节奏；组合 POV、Before/After、产品特写和场景教育内容。</p></article>
          <article><small>CREATOR REVIEW</small><h4>创作者内容与素材验收</h4><p>在合作 Brief 中说明受众、演示任务、产品事实和披露要求，审阅初稿、修改版本及素材使用范围。</p></article>
        </div>
      </section>
      <div class="g-story-note" id="video-management">
        <h3>我的创意参与与项目交付</h3>
        <p>依据 Campaign 目标和受众场景提出创意方向，完成脚本修改、镜头要求及内容审核；制作过程中核对产品结构、真实操作、字幕与画幅，分别准备不同平台的发布版本。</p>
        <p>负责 Campaign 创意主题、社媒短视频选题、内容 Hook、分镜脚本、人物与产品动作审核、成片修改及不同平台的内容适配。</p>
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
        <header><small>EXHIBITION MATERIALS</small><h3>展会物料准备</h3><p>按现场使用位置整理物料，提前核对内容、印刷尺寸与交付时间。</p></header>
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
    return section("搜索增长与品牌内容传播", "SEO / Content Marketing / PR · 北美家居消费品", `
      <section class="seo-case-opening" id="seo-case-overview">
        <div class="seo-case-eyebrow"><span>SEARCH GROWTH / CONTENT / PR</span></div>
        <h3>从用户搜索问题出发，组织内容主题与品牌传播</h3>
        <p>我的工作涉及搜索主题与内容架构规划、产品内容协同，以及品牌新闻稿传播。搜索内容解决具体问题，产品内容回答选型顾虑，PR 则将产品价值放入适合媒体传播的家庭生活场景。</p>
        <div class="seo-owner-grid" id="seo-owner-boundaries">
          <article><small>SEO</small><h4>搜索内容规划</h4><p>关键词主题、搜索意图、主题集群、页面结构与内链。</p></article>
          <article><small>CONTENT MARKETING</small><h4>内容营销策划</h4><p>内容支柱、产品教育、节庆内容及渠道协同。</p></article>
          <article><small>PR / MEDIA</small><h4>品牌传播协同</h4><p>新闻主题、产品价值表达、媒体素材和新闻稿分发。</p></article>
        </div>
      </section>
      <span id="seo-search-optimization"></span>
      <section class="seo-content-section" id="seo-topic-cluster-map">
        <header><small>01 / SEARCH &amp; CONTENT ARCHITECTURE</small><h3>搜索需求与内容主题架构</h3><p>按用户的了解、解决问题与产品比较需求选择页面类型，避免多个页面反复回答同一个问题。</p></header>
        <div class="seo-pillar-node"><div><small>CORE TOPIC / PILLAR</small><h4>Home Cleaning &amp; Product Education</h4><p>以家庭清洁任务为核心，连接问题指南、使用教程、工具比较与季节性内容。</p></div><span>HUB</span></div>
        <div class="seo-topic-clusters">
          <article class="seo-topic-card"><small>INFORMATIONAL</small><h4>问题解决</h4><p>地面、浴室、厨房及不同表面污渍；以 How-to 与清洁指南回答实际问题。</p></article>
          <article class="seo-topic-card"><small>PRODUCT EDUCATION</small><h4>使用教育</h4><p>刷头选择、操作方式、适用表面与常见问题；由产品事实支持说明。</p></article>
          <article class="seo-topic-card"><small>COMMERCIAL</small><h4>产品比较与选型</h4><p>按清洁任务比较工具，关联 FAQ、产品页与使用条件。</p></article>
          <article class="seo-topic-card"><small>SEASONAL</small><h4>节庆与家庭场景</h4><p>结合季节需求组织家庭聚会、礼赠、节后清洁与宠物场景。</p></article>
        </div>
      </section>
      <section class="seo-content-section" id="seo-page-architecture">
        <header><small>02 / PAGE MAP</small><h3>页面分工与内部链接</h3></header>
        <div class="seo-link-flow"><article><small>HUB</small><b>主题指南</b><span>组织核心问题</span></article><i>↔</i><article><small>SPOKES</small><b>细分内容</b><span>解答独立搜索需求</span></article><i>→</i><article><small>DESTINATION</small><b>FAQ / PDP</b><span>使用条件与商品选择</span></article></div>
      </section>
      <span id="seo-case-workflow"></span>
      <section class="seo-content-section" id="seo-content-calendar">
        <header><small>03 / CONTENT PLANNING</small><h3>内容主题与渠道策划</h3><p>按用户问题、产品教育、工具比较和节庆传播分别安排内容形式与渠道。</p></header>
        <div class="seo-intent-table-wrap"><table class="seo-intent-table"><thead><tr><th>内容主题</th><th>用户需求</th><th>内容形式</th><th>渠道承接</th></tr></thead><tbody>
          <tr><td>家庭清洁问题</td><td>解决污渍与操作疑问</td><td>指南、教程、FAQ</td><td>Blog / Social</td></tr>
          <tr><td>产品使用教育</td><td>理解结构、动作与适用条件</td><td>使用说明、操作演示</td><td>Blog / PDP / Video</td></tr>
          <tr><td>工具比较与选择</td><td>根据清洁任务选工具</td><td>比较文章、产品说明</td><td>Blog / FAQ / PDP</td></tr>
          <tr><td>节庆与礼赠</td><td>节日家庭场景与产品需求</td><td>主题内容、活动邮件、社媒</td><td>Campaign / EDM / Social</td></tr>
        </tbody></table></div>
        <p><a href="#/case/social/fathers-day-calendar">父亲节内容日历 ↗</a> · <a href="#/case/crm/crm-campaign-email-plan">母亲节邮件策划 ↗</a></p>
      </section>

      <section class="seo-content-section" id="seo-keyword-intent-map">
        <header><small>04 / SEASONAL CONTENT PLANNING</small><h3>节庆主题集群与内容排期</h3><p>围绕节后家庭清洁任务，规划一篇主题指南、九个细分专题，衔接 FAQ、产品使用教育及后续渠道传播。</p></header>
        <div class="seo-pillar-node"><div><small>CONTENT HUB / PILLAR</small><h4>节后家庭清洁主题指南</h4><p>作为专题入口，先帮助读者识别清洁任务，再分流至具体表面、家庭场景与工具选择内容。</p></div><span>1 篇主指南规划</span></div>
        <div class="seo-topic-clusters">
          <article class="seo-topic-card"><small>TOPIC GROUP 01</small><h4>污渍与表面清洁</h4><p>围绕不同表面、污渍残留与清洁处理方式建立五个细分内容方向。</p><p><strong>5 个专题规划</strong> · 问题解决 / How-to</p></article>
          <article class="seo-topic-card"><small>TOPIC GROUP 02</small><h4>家庭聚会后快速整理</h4><p>把清洁优先级、动线与快速整理检查清单组织为独立的任务内容。</p><p><strong>1 个专题规划</strong> · Checklist</p></article>
          <article class="seo-topic-card"><small>TOPIC GROUP 03</small><h4>产品使用与工具选型</h4><p>区分吸尘、刷洗、拖地的适用任务与操作条件，对接产品教育和比较信息。</p><p><strong>2 个专题规划</strong> · Product Education / Comparison</p></article>
          <article class="seo-topic-card"><small>TOPIC GROUP 04</small><h4>宠物与全屋清洁</h4><p>延伸节日后的家庭卫生场景，结合实际使用问题规划指导性内容。</p><p><strong>1 个专题规划</strong> · Lifestyle / Hygiene</p></article>
        </div>
        <details class="seo-article-details" id="seo-article-briefs">
          <summary>内容 Brief 与页面承接要求</summary>
          
          <p>内容 Brief 按用户任务、核心问题、回答结构、产品事实、H2/H3、素材与 ALT、FAQ、内部链接、CTA、审核责任和复盘指标进行整理。</p>
        </details>
        <div class="seo-calendar-list" aria-label="节庆内容排期">
          <article><div class="seo-calendar-phase">T−7 至 T−1</div><div><h4>发布准备</h4><p>完成主题、搜索意图、事实依据、内容 Brief、页面分工及产品审核。</p></div></article>
          <article><div class="seo-calendar-phase">T0 至 T+1</div><div><h4>主题指南与清洁清单</h4><p>以用户最先面临的节后整理任务组织主指南和快速清洁内容。</p></div></article>
          <article><div class="seo-calendar-phase">T+1 至 T+3</div><div><h4>污渍与表面专题</h4><p>根据独立问题分批安排专题内容；需要时关联具体 FAQ。</p></div></article>
          <article><div class="seo-calendar-phase">T+3 至 T+7</div><div><h4>工具选择与家庭场景</h4><p>连接已核实的产品使用说明、工具比较、宠物家庭场景及社媒内容。</p></div></article>
          <article><div class="seo-calendar-phase">发布后复盘</div><div><h4>查询、页面与传播表现</h4><p>根据真实查询和页面表现更新主题、内链、内容格式与下一期策划。</p></div></article>
        </div>
        <p class="seo-data-note">以节庆节点安排内容制作、发布审核与效果复盘，具体发布时间依照物料与渠道准备情况调整。</p>
      </section>
      <span id="seo-method-and-pr"></span>
      <section class="seo-content-section" id="seo-pr-extension">
        <header><small>05 / PUBLIC RELATIONS</small><h3>PR 传播主题与媒体内容</h3><p>以新闻价值与受众相关性组织传播主题，把品牌定位、家庭使用场景与产品信息转为媒体可理解的内容。</p></header>
        <div class="seo-pr-angle-grid"><article><small>BRAND STORY</small><h4>品牌与家庭生活</h4><p>以北美家庭清洁任务为入口，说明品牌服务的生活需求。</p></article><article><small>PRODUCT COMMUNICATION</small><h4>产品与场景教育</h4><p>围绕地面、浴室、厨房、宠物和烧烤清洁建立产品分工，配合使用场景与产品素材。</p></article><article><small>MEDIA DISTRIBUTION</small><h4>新闻稿与媒体分发</h4><p>组织新闻主题、稿件结构和传播素材，区分新闻稿分发与独立编辑报道。</p></article></div>
        <div class="g-project-feature"><figure>${image("pr-home-scene","北美家庭清洁主题新闻稿场景配图")}<figcaption>新闻稿配图</figcaption></figure><div><h4>北美家庭清洁主题新闻稿</h4><p>2026 年 5 月 · King Newswire 分发至 USA Today Press Release 栏目。</p><p>以家庭清洁场景组织四条产品线的产品信息。</p><p><a href="#/case/brand/pr-project">查看新闻稿传播项目 ↗</a></p></div></div>
      </section>
      <section class="seo-content-section" id="seo-cross-channel">
        <header><small>06 / CHANNEL COORDINATION</small><h3>内容在不同渠道的任务</h3></header>
        <div class="seo-channel-grid"><article><small>SEO / BLOG</small><h4>搜索需求</h4><p>回答问题，建立主题内容深度。</p></article><article><small>FAQ / PDP</small><h4>产品选择</h4><p>解释适用场景、购买顾虑及产品信息。</p></article><article><small>PR</small><h4>品牌传播</h4><p>将品牌和产品信息组织成媒体内容。</p></article><article><small>SOCIAL</small><h4>场景触达</h4><p>提炼操作演示、节庆话题与互动内容。</p></article><article><small>EDM</small><h4>用户沟通</h4><p>按节庆与用户阶段安排内容推荐。</p></article></div>
      </section>
      <section class="seo-content-section" id="seo-measurement">
        <header><small>07 / PERFORMANCE REVIEW</small><h3>搜索、内容与媒体表现</h3></header>
        <div class="seo-measure-grid"><article><small>SEO</small><h4>GSC</h4><p>查询、收录、展示、点击和 CTR。</p></article><article><small>CONTENT</small><h4>GA4</h4><p>入口页面、阅读行为与后续行动。</p></article><article><small>PR</small><h4>媒体分发</h4><p>渠道相关性、核心信息表达与引荐。</p></article></div>
        <p><a href="#/data/search">查看历史搜索渠道数据 ↗</a></p>
      </section>
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
        <article><small>REVIEW</small><h3>衡量点击与站内后续行为</h3><p>规划送达率、有效点击、退订率和站内转化等指标，用于评估邮件内容与发送时机。</p></article>
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
      "按家庭清洁场景组织产品线",
      "品牌屋把五款产品放回四条产品线。餐区黏污和浴室边角各有明确的接触表面、操作动作和对应工具，因此可作为品牌传播最先讲清的两个场景。",
      "围绕家庭任务组织品牌屋、新闻稿与联合营销素材，重点统一产品主张、使用场景和视觉信息层级。",
    ],
    social: [
      "内容表现与下期选题调整",
      "同样是数据上涨，浏览、互动与点击回答的问题不同。复盘时先检查内容有没有吸引人停留，再看用户是在讨论场景、追问用法，还是进入下一步。",
      "负责季度主题、月度日历和社媒小组审核；以展示、互动、点击和社群反馈调整内容结构。",
    ],
    operations: [
      "季度主题与月度内容日历",
      "负责社媒季度主题与月度内容规划，按 Facebook、Instagram 和 Group 的内容任务安排产品演示、场景话题、互动活动及节庆专题。审核文案、视觉和视频版本，并根据内容表现调整后续排期。",
      "负责主题规划、月度内容日历、制作 Brief、素材审核及周月复盘。",
    ],
    community: [
      "把成员的使用问题带回内容和产品",
      "规划教程、投票和讨论时，优先选择成员能描述具体场景的问题，例如用在什么表面、哪一步卡住。运营汇总共性问题，产品确认用法，内容组更新 FAQ 或演示。",
      "成员快照说明社群规模，查看和发帖评论说明各自窗口内的行为。评估单场活动还需要参与记录、反馈和素材授权。",
    ],
    b2b: [
      "从展位策划到现场客户沟通",
      "参展前准备展区展示方案、品牌视觉、产品资料与客户邀约；现场结合展品介绍系统应用并记录采购问题，会后跟进产品资料、报价需求和合作条件。",
      "展位策划、展品陈列、品牌物料与客户需求跟进。",
    ],
    seo: [
      "搜索需求与页面分工",
      "搜索内容分别回应用户的使用问题与选型需求。主题指南负责组织场景，FAQ 和商品页进一步说明使用条件及购买考虑。",
      "主题集群策划包括内容结构、页面分工与内部链接，并根据收录、查询和点击表现进行评估。",
    ],
    amazon: [
      "先找出经营瓶颈，再决定投入",
      "流量少时检查搜索词和点击。有浏览却少下单时，检查商品页是否讲清用途和规格。销量起来以后，再核对库存、退换和广告成本能否支撑继续投放。",
      "按商品和统计周期对照流量、广告、库存与订单，确定经营优化重点。",
    ],
    creative: [
      "品牌故事与产品演示的开场设计",
      "节庆短片用聚餐和污渍引出工具，在结尾回到人物。楼梯吸尘片面向操作疑问，开场就给吸头和踏面。两种开场各有需要拍到的动作。",
      "评估故事顺序、构图、操作动作与开场留存，优化脚本及剪辑。",
    ],
    crm: [
      "发送之前先核对用户的真实状态",
      "将母亲节等 Campaign 的英文邮件内容与产品卖点、社媒主题和站内页面对齐；按订阅、浏览、加购、已购等状态规划对应邮件内容和名单排除。",
      "负责邮件主题、文案结构、受众与发送节奏的营销方案；触发与退出规则作为实施时的配置要求。",
    ],
    creator: [
      "Creator 筛选与产品演示审核",
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
