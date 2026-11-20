(() => {
  "use strict";

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]);
  const image = (file, alt, ext = "webp") => `<img src="assets/projects/${file}.${ext}" alt="${alt}" loading="lazy" decoding="async">`;
  const productLines = [
    ["地面清洁", "双盘拖把", "餐区硬地黏污", "中景拍站姿推进与转向，低机位拍双盘接地。"],
    ["电动清洁刷", "长柄电动刷", "浴缸内沿和墙砖接缝", "同一机位看清站位、杆长、刷头角度与接触点。"],
    ["电动清洁刷", "手持清洁刷", "水槽边缘和窄处", "近景拍单手握持，以及刷头如何对准缝隙。"],
    ["无线吸尘", "无线吸尘器", "干屑、宠物毛发与低位灰尘", "低机位拍吸头进入家具下方，再交代拾取结果。"],
    ["烤炉清洁", "烤炉清洁刷", "适用炉篦上的烧烤残渣", "拍清刷头与炉篦的接触位置和操作方式。"],
  ];
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
          <p><a href="#/case/brand/brand-collaboration">查看联合抽奖海报 ↗</a> · <a href="#/case/brand/pr-project">查看北美新闻稿分发 ↗</a></p>
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
      <p class="g-chart-note">品牌屋中的竞品参照属于功能与任务层面的定性比较；现有材料没有市场规模、竞品份额或价格调查数据。</p>`, "brand-positioning");
  }

  function launchDelivery() {
    const milestones = [
      ["4/28 · 立项", "GTM／IMC", "立项说明、市场与型号、主目标、待确认事项", "确认谁对整体上市决策负责。"],
      ["5/1–10 · 定位与 Brief", "产品／产品营销、IMC", "产品事实、主推场景、卖点与拍摄 Brief", "产品签核可公开的事实，社媒组据此拆解内容。"],
      ["5/15–21 · 物料与商业预检", "IMC 协调；设计、视频、供应链及电商分工", "KV、轮播、真实演示、FAQ、素材权限与链接", "逐项检查素材；库存、配送、支付与客服就绪后才开放购买。"],
      ["5/22–25 · 计划发布与首销", "IMC／渠道；商业团队核可售条件", "计划发布 KV、演示及 FAQ；跟进创作者、PR 或许可邮件的放行", "按素材与渠道准备情况放行。缺演示则引导了解产品。"],
      ["5/26–31 · 复盘与交接", "IMC／渠道、数据及客服", "观看、商品页访问、净履约订单；常见问题与素材权利归档", "用同一窗口检查表现，分派需要修正的物料和承接问题。"],
    ];
    return `
      <div class="g-story-note g-launch-delivery" id="launch-delivery">
        <h3>上市交付表</h3>
        <p>2026 年 5 月工作样例。我的职责是社媒策略与内容团队交付；商业放行和产品事实分别由相应职能确认。</p>
        <ol class="g-milestone-list">
          ${milestones.map(([date, owner, input, approval]) => `
            <li><h4>${esc(date)}</h4><div><b>${esc(owner)}</b><p>${esc(input)}</p></div><p>${esc(approval)}</p></li>`).join("")}
        </ol>
        <p><a href="#/case/gtm/english-brief">查看交给创意与制作团队的英文 Brief ↗</a> · <a href="#/case/creative/video-strategy">查看品牌片与演示片的渠道分工 ↗</a></p>
      </div>`;
  }

  function englishBrief() {
    return `
      <div class="g-story-note g-english-brief" id="english-brief">
        <h3>英文制作 Brief</h3>
        <p>根据美英本地化与产品演示方案改写的公开工作样例。</p>
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
    return section("M3 上市策略与执行取舍", "从主推场景、团队交付到美国上市节奏与美英本地化。", `
      <div class="g-project-list g-project-calendar-plan" id="launch-decisions">
        <article><small>市场与产品</small><h3>把主推场景收敛到餐后硬地</h3><p>2026 年 5 月，美国市场上市规划。以餐区和厨房的日常清洁为入口，用 M3 的双圆盘与 D 形握把解释产品；浴室边角交给长柄电动刷。餐后场景为优先验证的受众假设。</p><p><a href="#/case/brand/brand-positioning">查看品牌定位依据 ↗</a></p></article>
        <article><small>我的职责</small><h3>负责社媒策略与内容团队交付</h3><p>参与用户研究、差异化定位和卖点分层，负责把传播策略拆成社媒排期、素材要求和验收项。产品 / 研发核验卖点，商业与供应链确认可售条件，客服接收常见问题。</p><p><a href="#/case/gtm/management">查看协作与验收 ↗</a></p></article>
      </div>
      <div class="g-project-list g-project-calendar-plan">
        <article><small>内容与渠道</small><h3>从餐后话题到发布承接</h3><p>预热用 Feed 和 Story 询问用户先清洁哪一处；考虑阶段用轮播展示双圆盘和握把，并将地面适用性等问题交给产品、客服核验。美国执行表以 5 月 22 日为计划发布节点，PR 用可公开的产品资料，CRM 按许可触达，Paid 在发布后验证开场。</p></article>
        <article><small>上线与复盘</small><h3>按证据和商业就绪度切换 CTA</h3><p>商品资料可用时引导了解产品，目的页有连续实拍时才引导观看演示；当地价格、库存、支付与履约确认后开放购买。财务对账后的净履约订单是主结果，净贡献决定是否扩大投入；有效观看、商品页访问用来定位问题。</p></article>
      </div>
      ${launchDelivery()}
      <div class="g-story-note">
        <h3>购买前的三个问题，怎样让内容回答</h3>
        <p>这是上市规划中的验证问题。社群与客服后续可用真实反馈校正优先级。</p>
        <div class="g-proof-table">
          <table>
            <thead><tr><th scope="col">用户会问</th><th scope="col">用什么回答</th><th scope="col">交付到哪里</th></tr></thead>
            <tbody>
              <tr><th scope="row">双盘怎样接触地面？</th><td>连续实拍展示双盘运行、接地与推进路径。</td><td>演示短片、创作者拍摄 Brief</td></tr>
              <tr><th scope="row">要怎么握持和转向？</th><td>产品原图说明握把结构，操作镜头展示握持与转向。</td><td>结构轮播、操作演示</td></tr>
              <tr><th scope="row">我的地面适用吗？</th><td>产品与客服按当地型号核对说明书和适用条件。</td><td>FAQ、客服答复</td></tr>
            </tbody>
          </table>
        </div>
        <p><a href="#/case/gtm/market-adaptation">看同一卖点如何改写成美国与英国的 Story 文案 ↗</a></p>
      </div>
      ${englishBrief()}
      <p class="g-chart-note">23 个社媒内容与运营槽位、15 条 IMC 协同链路是总体规划交付。5 月 22 日为计划节点；本案例没有可核验的 M3 发布、投放、订单或 ROI 记录。</p>
      <section class="g-module g-project" id="market-adaptation" aria-labelledby="market-adaptation-heading">
        <header><h2 id="market-adaptation-heading">M3 美英本地化工作样例</h2><p>沿用美国上市规划的产品与传播主线，另做两地可用的文案和素材适配。以下样例来自 R12 创意指南和双市场文案表。</p></header>
        <div class="g-project-list">
          <article><small>共享主视觉</small><h3 lang="en">From grip to floor.</h3><p>整机亮相用同一产品原图与版式。进入餐后场景时，两地沿用 <span lang="en">Dinner’s done. Floor’s next.</span>，把焦点放在日常清洁。</p></article>
        </div>
        <div class="g-project-list g-project-calendar-plan" aria-label="Story 投票美英对照">
          <article><small>美国 · en-US</small><h3 lang="en-US">Kitchen or entryway?</h3><p lang="en-US">After-dinner cleanup · Mom’s favorite moments</p></article>
          <article><small>英国 · en-GB</small><h3 lang="en-GB">Kitchen or hallway?</h3><p lang="en-GB">After-dinner clean-up · Mum’s favourite moments</p></article>
        </div>
        <p>两地分别核对节日档期、页面与供货。美国和英国各自比较「餐后场景」与「产品结构」开场；市场内固定正文、受众、版位和落地页，再比较当地数据。</p>
        <div class="g-project-list g-project-calendar-plan">
          <article><h3>产品图核对可见结构</h3><p>用原图核对双圆盘、握把与侧置电池安装位。性能参数、适用地面与配件兼容性由产品团队按当地 SKU、说明书与测试条件签核。</p></article>
          <article><h3>演示和创作者内容先确认素材</h3><p>8 秒脚本安排双盘近景接连续实拍。缺少运行素材时，用结构图配 <span lang="en">Explore M3</span>。<span lang="en">See M3 in action</span> 需链接到真实演示；创作者内容另行确认披露与商用权限。</p></article>
        </div>
        <p class="g-chart-note">R12 本地化工作包含每个市场 25 条文案、17 份共享及分区静态文件、6 组视频与创作者脚本。以上为交付物数量。英国样例的上线与测试状态未核实。</p>
      </section>

      <details class="g-chart-disclosure"><summary>展开五种创意方向与所需证据</summary>
      <div class="g-project-list g-project-calendar-plan" id="campaign-mechanism-mapping">
        <article><small>MECHANISM 01 / PAIN-POINT EMERGENCE</small><h3>The After-Dinner Reset</h3><p>主机制：问题显化。用餐后地面黏污作为具体任务入口；辅助机制：连续过程证明。后续必须展示真实产品操作和相同条件的清洁过程，不能用夸张污渍或单次画面推导普遍性能。</p></article>
        <article><small>MECHANISM 02 / MECHANISM REVEAL</small><h3>See the Motion</h3><p>主机制：机制揭示。通过真实双头运行、接地和移动路径解释产品如何工作；辅助机制：微距细节证明。静态 KV、生成画面或渲染不能代替真实运行视频。</p></article>
        <article><small>MECHANISM 03 / ROLE-VALUE TRANSFER</small><h3>Make Room for What Matters</h3><p>主机制：关系价值转移。把产品动作放进家庭共同生活的情境；辅助机制：人物动作叙事。情绪收束不等于量化省时承诺，人物、音乐和场景素材仍需授权。</p></article>
        <article><small>MECHANISM 04 / MICRO-DETAIL PROOF</small><h3>A Closer Look at M3</h3><p>主机制：细节证明。通过整机、双头底座、手柄控制区和电池安装位置降低理解成本；每项功能说明必须对应官方源图、说明书或产品负责人确认。</p></article>
        <article><small>MECHANISM 05 / USER-EXPERIENCE PROOF</small><h3>Real Home, Real Reset</h3><p>主机制：真实体验证明。Creator 内容补充家庭场景中的实际操作；受众适配、披露、肖像、内容版权、剪辑权和 Paid Usage Rights 分别确认。</p></article>
      </div>
      <p class="g-chart-note">机制映射是依据现有 M3 创意方向与 Campaign 方法整理的策略重构，不表示五条内容均已发布或测试胜出。每个方向只设一个主机制；Hook 必须由后续信息兑现，视觉隐喻不能替代产品性能证据。</p>
      </details>
      <details class="g-chart-disclosure"><summary>查看四条产品线与官方产品图</summary>
      <div class="g-project-feature g-project-product"><div class="g-project-list">${productLines.map(([line, product, task, demo]) => `
        <article><small>${line}</small><h3>${product}</h3><p>${task}。${demo}</p></article>`).join("")}</div>
        <figure>${image("m3-yellow-main", "双盘拖把黄色款整机外观，展示双圆拖布头、黄色机身与手柄结构")}<figcaption><b>双盘拖把 · 整机外观</b><span>采用黄色款真实产品原图，保留整机比例、双盘底座与手柄结构</span></figcaption></figure>
      </div>
      <div class="g-product-gallery" aria-label="双盘拖把产品外观细节">
        <figure>${image("m3-yellow-battery", "双盘拖把黄色款主机背部与外置电池安装位置")}<figcaption><b>Battery Detail / 电池安装</b><span>使用原始产品图展示电池安装位置，不以示意图替代真实结构</span></figcaption></figure>
      </div>
      </details>
`, "product-portfolio");
  }

  function calendarDays() {
    return `<div class="g-calendar-days">${calendar.map(([day, stream, channel, en, zh, bodyEn, bodyZh]) => `
      <details class="g-calendar-day" data-calendar-day="${day}"><summary><span>Day ${String(day).padStart(2, "0")} · ${esc(stream)}</span><b>${esc(zh)}</b></summary>
      <div><small>${esc(channel)}</small><p lang="en"><strong>${esc(en)}</strong></p><p lang="en">${esc(bodyEn)}</p><p>${esc(bodyZh)}</p></div></details>`).join("")}</div>`;
  }

  function social() {
    return section("父亲节 30 天内容与项目日历", "For the Hands That Always Help · 节庆营销概念方案", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>主题与主推产品</h3><p>以父亲为家人做过的小事发起互动。长柄电动刷负责浴室边角演示，黄色双盘拖把负责餐后硬地清洁。</p></article>
        <article><h3>平台与内容形式</h3><p>Facebook 和 Instagram 用轮播解释场景与选购问题，用 Reels 演示完整操作；Facebook Group 以家人教过的清洁习惯和生活故事发起讨论。</p></article>
        <article><h3>内容与交付节奏</h3><p>日历按相对顺序编排内容。28 个节点面向用户发布，最后 2 个节点用于内部素材验收与活动复盘；不是实际发布日期或发布记录。</p></article>
      </div>
      <p><a href="#/case/creative/video-strategy">查看节庆故事、产品教育与社群反馈各承担什么 ↗</a></p>
      <details class="g-chart-disclosure"><summary>展开 30 天双语内容与项目日历</summary><p class="g-chart-note">Day 01–28 为对外内容概念；Day 29–30 为内部验收与复盘节点。全部为相对内容顺序，不代表真实发布日历或已执行 Campaign。</p>${calendarDays()}</details>`, "fathers-day-calendar");
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
        <p class="g-chart-note">页面标题日期为 May 15, 2026，侧栏日期为 May 14, 2026；公开展示只保留 2026 年 5 月，具体发布日期待核。当前没有可核验的转载量、阅读量、媒体触达或 Share of Voice 数据。</p>
      </div></div>`, "pr-project");
  }

  function brandCampaign() {
    return section("家居品牌联合抽奖", "将家庭种植与日常清洁放进同一个家居场景。", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${image("joint-giveaway", "脱敏的联合抽奖海报，展示家庭种植设备、电动清洁刷和海报日期")}<figcaption>联合活动主视觉 · 海报标示 4 月 18–28 日，年份待核</figcaption></figure>
        <div class="g-project-list">
          <article><h3>用共同场景连接两类产品</h3><p>家庭种植设备和电动清洁刷同框。画面先让用户看懂两类奖品及其使用场景，再用活动名称和日期交代参与窗口。</p></article>
          <article><h3>合作执行需要双方确认的事项</h3><p>在活动管理方案中，由牵头方统一资格、活动时区与规则。合作双方分别确认发布窗口、素材使用和奖品履约。复盘按各渠道发布记录、有效参与、奖品发放分开核对。</p></article>
          <article><h3>现有交付证据</h3><p>海报可核对联合主题、奖品组合及画面标示时间。双方实际分工、发布链接、有效参与和发奖记录待补。</p></article>
        </div>
      </div>`, "brand-collaboration");
  }

  function creativeStrategy() {
    return section("为什么节庆故事与功能演示要分开做", "家庭片让观众识别品牌和场景，产品短片回答一个具体使用问题。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>把餐后清洁放进家庭故事</h3><p>我参与的创意策划从节庆聚餐出发。食物滴落让清洁任务自然出现，握持和推进说明工具如何进入场景，结尾回到家庭氛围。这条片的优先任务是品牌记忆，产品出现要服务故事的转折。</p></article>
        <article><h3>换一个内容入口，讲清吸头怎么走</h3><p>楼梯清洁的疑问是吸头接触哪一面、怎样转向。用于短视频教育时，优先选画面已进入动作的楼梯版本。室内持机开场可用于认识产品，楼梯动作镜头更适合回答操作问题。</p></article>
      </div>
      <div class="g-story-note" id="video-channel-plan">
        <h3>同一产品故事，渠道各做一件事</h3>
        <ul>
          <li><strong>品牌叙事</strong> 规划用 YouTube 横版讲完整起承转合，Facebook 和 Instagram 用餐后问题开场的短版建立场景识别。</li>
          <li><strong>产品教育</strong> 规划给 Reels、TikTok 和 Shorts 单切接触、推进或转向画面；产品细节和适用条件交给轮播与 FAQ。</li>
          <li><strong>反馈与复盘</strong> 先按版本、渠道与同一观察窗口看有效观看和演示段留存。评论在问怎么用时，补操作镜头或 FAQ；需要评估访问与成交时，再核对链接、站点事件和订单。</li>
        </ul>
        <p>以上为内容分工与复盘方案。节庆片段、吸尘素材和五月上市脚本各有对应的工作样例。</p>
        <p><a href="#/case/creative/video-projects">播放三个视频样例 ↗</a> · <a href="#/case/gtm/english-brief">查看 M3 上市英文 Brief ↗</a></p>
      </div>`, "video-strategy");
  }

  function creative() {
    return section("节庆叙事与产品演示", "三段静音视频分别展示家庭叙事、连续操作，以及两种开场如何承担不同传播任务。", `
      <div class="g-video-gallery">
        <figure>
          <video controls playsinline preload="metadata" poster="assets/projects/holiday-scene-1.webp" aria-label="播放节庆家庭短片节选" aria-describedby="holiday-video-note">
            <source src="assets/video/holiday-story.mp4" type="video/mp4">
            <a href="assets/video/holiday-story.mp4">打开节庆短片 MP4</a>
          </video>
          <figcaption id="holiday-video-note"><h3>节庆家庭短片</h3><p>15 秒静音剪辑节选。聚餐和滴落的酱汁引出清洁，手柄与双盘镜头交代工具，结尾回到节庆家庭场景。</p><p class="g-chart-note">创意样片，展示叙事与镜头设计。</p></figcaption>
        </figure>
        <figure class="g-video-demo">
          <video controls playsinline preload="metadata" poster="assets/projects/stairs-video-frame.webp" aria-label="播放楼梯吸尘演示节选" aria-describedby="stairs-video-note">
            <source src="assets/video/stair-demo.mp4" type="video/mp4">
            <a href="assets/video/stair-demo.mp4">打开楼梯演示 MP4</a>
          </video>
          <figcaption id="stairs-video-note"><h3>楼梯吸尘动作</h3><p>约 4 秒静音裁切。保留吸头、踏面和移动路径，便于观察构图和操作表达。该片使用无线吸尘器，横版节庆样片中的产品为双盘拖把。</p></figcaption>
        </figure>
      </div>
      <div class="g-opening-comparison" id="video-opening-comparison">
        <figure>
          <video controls playsinline preload="metadata" aria-label="播放客厅产品亮相和楼梯动作开场对照" aria-describedby="opening-video-note">
            <source src="assets/video/product-opening.mp4" type="video/mp4">
            <a href="assets/video/product-opening.mp4">打开开场对照 MP4</a>
          </video>
          <figcaption id="opening-video-note">约 6 秒静音素材对照，约 3 秒切换场景。</figcaption>
        </figure>
        <div>
          <h3>无线吸尘器的两种开场</h3>
          <dl>
            <div><dt>0–3 秒 · 客厅亮相</dt><dd>先看到产品、握持和家居环境，适合主打认识产品的内容。</dd></div>
            <div><dt>约 3–6 秒 · 楼梯上手</dt><dd>吸头立刻接触踏面，优先回答怎么用。做产品教育时，从这个动作开始。</dd></div>
          </dl>
          <p>这是两个源镜头的剪辑对照。若要判断哪种开场更有效，发布测试时保持受众、正文、时长与下一步一致，再看开场留存和演示段观看。</p>
        </div>
      </div>
      <div class="g-story-note" id="video-management">
        <h3>从创意方向到可验收的交付</h3>
        <p>我参与创意策划、脚本与画面审核。内容团队先定每条片要回答的问题，产品团队核对型号和可公开卖点，制作团队按镜头清单提交横竖版本。审核时看产品结构、接触点、动作连续性和平台安全区，运营按渠道与素材权限排期。</p>
        <p>画面可以说明握持、行进方向和接触位置。清洁效果和性能主张需要真实产品素材、同条件前后对照及产品签核。当前可展示结果为视频节选与相应的策略和审核样例，发布与投放数据待核。</p>
        <p><a href="#/case/creative/video-strategy">查看创意选择与渠道分工 ↗</a> · <a href="#/case/operations/asset-review">查看一次物料如何返工 ↗</a></p>
      </div>`, "video-projects");
  }

  function expo() {
    return section("瑞音博｜海外 B2B 展会项目参与", "任职期间参与的海外展会项目 · 展位视觉、产品系统陈列与现场展示", `
      <div class="g-project-feature g-project-wide-image">
        <figure>${image("exhibition-booth-overview-redacted", "瑞音博任职期间参与的海外展会展位全景，第三方品牌标识已脱敏", "jpg")}<figcaption>展位全景 · 第三方品牌标识已脱敏</figcaption></figure>
        <div class="g-project-list">
          <article><small>PROJECT PARTICIPATION</small><h3>海外展会项目参与</h3><p>该组照片来自本人确认参与的瑞音博任职期间海外展会项目。页面以现场照片呈现展位空间、展示结构与产品陈列，不将项目参与扩大表述为独立主导整场展会。</p></article>
          <article><small>EXHIBITION PRESENCE</small><h3>展位空间与现场展示</h3><p>从展台结构、主视觉、空间层次和展示动线观察现场呈现方式，保留真实展会环境，展示海外 B2B 展会的品牌接触场景。</p></article>
          <article><small>PRODUCT SYSTEM</small><h3>产品系统陈列</h3><p>展示墙将光伏、逆变器、储能电池、柴油发电机与家庭用电负载放在同一系统关系中，便于参观者从组件和应用场景理解产品组合。此处仅描述照片中可见的展示内容，不延伸为产品技术方案设计责任。</p></article>
        </div>
      </div>
      <div class="g-product-gallery" aria-label="瑞音博任职期间参与的海外展会现场与产品展示照片">
        <figure>${image("exhibition-booth-angle-redacted", "海外展会展台侧面视角，第三方品牌标识已脱敏", "jpg")}<figcaption><b>Booth & Messaging</b><span>展台侧面与展示信息 · 品牌标识已脱敏</span></figcaption></figure>
        <figure>${image("exhibition-product-display-redacted", "储能产品系统展示墙与设备陈列，设备品牌标识已脱敏", "jpg")}<figcaption><b>Product Display</b><span>系统展示墙与设备陈列 · 设备品牌标识已脱敏</span></figcaption></figure>
      </div>
      <details class="g-chart-disclosure" id="expo-handoff">
        <summary>查看从展位物料到客户问题的交接样例</summary>
        <div class="g-story-note">
          <p>按照片可见的产品系统陈列设计。展前由产品和商务核对系统示意与产品说明；现场按客户应用场景记录配置、交付或售后问题；展后由商务确认跟进人，把重复问题交回产品和市场用于更新 FAQ。会前物料、现场记录和会后跟进各有负责人。</p>
          <p class="g-chart-note">这是基于现场展示整理的工作样例。照片支持展会参与和现场陈列。</p>
        </div>
      </details>
      <p class="g-chart-note">公开展示版本对展位标识、设备品牌字样、可识别型号及编号进行脱敏；原始照片保持不变。当前证据支持项目参与及现场展示，不包含可核验的个人具体职责、展会名称与日期、客户线索量或成交结果，因此不展示未经证实的管理范围和量化业绩。</p>`, "expo-project");
  }

  function creator() {
    return section("Creator Desk 创作者合作审核", "工作台原型 · 从来信提取候选事项，由负责人确认合作承诺及素材权利。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题和交付先写进 Brief</h3><p>按目标市场、受众和内容风格筛选创作者。Brief 写清产品事实、演示任务、交付形式和审核责任，供内容审核时逐项核对。</p></article>
        <article><h3>报价、交付和付款逐项核对</h3><p>演示邮件将报价、交付、付款放入待确认清单。负责人查原邮件，确认条款后再审核对应回复草稿。</p></article>
        <article><h3>来信提及授权，进入待核验</h3><p>若对方提出授权，先核对是否已有书面许可，再登记允许的平台、地域、期限及用途。品牌转发、剪辑和付费使用分别核对。</p></article>
        <article><h3>交付审核对应具体版本</h3><p>逐条核对产品事实、合作披露和修订意见。通过审核的内容版本与对应授权一起留档，方便后续查找和复用。</p></article>
      </div>
      <div class="g-story-note" id="partner-handoff">
        <h3>外部创作者从 Brief 到交付</h3>
        <p>工作样例。交接时先确认首稿与最终交付节点，首稿核对开场、产品证据和披露，修订意见标注版本和时间点。最终验收同时记录成片、允许渠道、地域、期限，以及可否剪辑或付费使用。条款和素材审核分别由对应负责人确认。</p>
        <p><a href="#/case/gtm/english-brief">查看一份英文制作 Brief ↗</a> · <a href="#/case/creative/video-projects">查看接触面与操作路径的镜头样例 ↗</a></p>
      </div>
      <p class="g-chart-note">页面依据 Creator Desk 演示界面的可见流程整理。原型使用演示记录，截图所示阶段的外部连接与邮件实际发送处于关闭状态。</p>`, "creator-project");
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
      <p class="g-chart-note">以上为选题与内容规划。实际发布、索引状态和 GSC 表现待核。</p>`, "seo-cluster");
  }

  function operations() {
    return section("一次活动如何排期和验收", "社媒小组的项目分工与审核清单", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>选题与排期</h3><p>我从季度主推主题选定产品和场景，给 Facebook、Instagram 和 Group 分配内容任务，并确认每条内容的负责人和交付时间。</p></article>
        <article><h3>产品与素材确认</h3><p>产品同事核对功能、参数和适用条件。社媒小组确认拍摄清单、素材权限和链接后，将 Brief 交给设计和视频同事。</p></article>
        <article><h3>创意与发布审核</h3><p>脚本审用户问题和演示顺序，画面审产品结构与操作，发布前检查文案、字幕、链接和平台版本。</p></article>
        <article><h3>复盘与下月安排</h3><p>按平台看浏览、互动和反馈。把反复出现的产品问题补进 FAQ，把返工项写回审核清单和下一轮 Brief。</p></article>
      </div>
      <div class="g-story-note" id="asset-review">
        <h3>一次真实的物料返工：首图看不到双盘</h3>
        <ul>
          <li><strong>发现</strong> 4:5 版主视觉底部 CTA 框遮挡并裁切了双盘。静态首图的任务是让人看懂产品结构，这一版需要返工。</li>
          <li><strong>修改与复核</strong> 制作样例保留产品原图，调整版式和 CTA 区域。后续版本的产品外观已复核，最终品牌与产品签核待确认。</li>
          <li><strong>写回交付清单</strong> Feed 和 Story 分别查裁切、安全区和关键结构。涉及运行的表达回到连续实拍，由产品团队核对对应说明。</li>
        </ul>
        <p class="g-chart-note">依据 M3 视觉样稿的审核和修订记录。该记录对应物料工作样例。</p>
        <a class="featured-detail" href="#/case/gtm/english-brief">查看对应英文 Brief ↗</a>
      </div>
      <div class="g-story-note">
        <h3>用父亲节日历演示一次项目交接</h3>
        <p>这份规划把长柄刷交给浴室边角演示，把双盘拖把交给餐后硬地内容。社媒小组先确定平台、负责人和素材需求，产品同事确认结构及使用条件，设计与视频分别完成轮播和操作镜头。Day 29 核对文案、画面、字幕、链接和各平台版本，Day 30 汇总待处理问题，作为下一轮 Brief 的输入。</p>
        <p class="g-chart-note">30 个相对排期节点含 28 个对外内容概念和 2 个内部节点。该日历是交付工作样例。</p>
        <a class="featured-detail" href="#/case/social/fathers-day-calendar">查看双语日历与验收节点 ↗</a>
      </div>`, "team-delivery");
  }

  function amazonPriority() {
    return section("店铺先解决哪一段问题", "经营判断样例 · 用商品、流量和履约信息决定行动。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>有浏览，详情页解释不清</h3><p>先检查点击进入的人在看什么词，以及主图、A+ 和商品页有没有回答用途、规格和适用条件。把买家重复提问交给商品与设计改信息。</p></article>
        <article><h3>有转化，供货和售后出现压力</h3><p>广告和促销节奏要与库存、配送和退换预期一起核。补齐承接后，再评估是否增加流量投入。</p></article>
      </div>
      <p>任职期销售、转化和利润指标见经营数据。若要验证具体改动的贡献，需要同商品、同窗口的广告、售价、库存和订单记录。</p>
      <p><a href="#/data/commerce">查看店铺经营记录 ↗</a></p>`, "amazon-priority");
  }

  function crmHandoff() {
    return section("谁可以收到邮件，谁要先排除", "旅程规划样例 · 从事件、许可和售后状态判断。", `
      <div class="g-project-list g-project-calendar-plan">
        <article><h3>浏览或加购后，先检查状态</h3><p>有有效许可、符合等待窗口且尚未购买，才进入对应提醒。已经下单时，退出催购，进入购后信息流程。</p></article>
        <article><h3>退款或服务问题，先交客服</h3><p>出现退款、退订或待解决的服务问题时，暂停相应营销触发。运营与电商对齐状态来源，测试频控、退出和重复进入。</p></article>
      </div>
      <p>工作物包括用户旅程、规则与频控规划。实际发送、留存和复购需系统记录。</p>`, "crm-handoff");
  }

  const extras = {
    brand: { strategy: brand, execution: () => pr() + brandCampaign() },
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
    if (page !== "case" || !Object.hasOwn(extras, id)) return;
    for (const [chapter, render] of Object.entries(extras[id])) {
      const content = main.querySelector(`#${chapter}>div:last-child`);
      if (!content) continue;
      if (chapter === "strategy") {
        for (const legacy of content.querySelectorAll(".brand-house, .channel-grid")) legacy.hidden = true;
      }
      const introduction = content.querySelector("h2 + p");
      if (introduction) introduction.insertAdjacentHTML("afterend", render());
      else content.querySelector("h2")?.insertAdjacentHTML("afterend", render());
    }
  };
})();
